# 🔥 Firebase - Guía de Uso - Banderas MDP

Firebase ya está completamente configurado en tu proyecto. Aquí te explico cómo usarlo.

---

## 📦 **Estructura de Firebase**

```
lib/
├── firebase.ts              # Configuración principal de Firebase
├── firebaseStorage.ts       # Utilidades para subir/obtener imágenes
├── useFirestore.ts          # Hooks para leer datos (productos, clientes, promociones)
└── firestoreHelpers.ts      # Funciones CRUD (crear, actualizar, eliminar)
```

---

## 🗄️ **Colecciones en Firestore**

> ⚠️ El proyecto Firebase (`publimartools`) está **compartido con el CRM/backoffice**.
> En Firestore vas a ver también colecciones que no pertenecen a este sitio
> (`auditLog`, `quotes`, `sales`, `clients`, `orders`, `notes`). No las toques desde acá.

Colecciones que usa este sitio:

### 1. **`products`**

La forma completa está en `types/product.ts` (`TProduct`) — esa es la fuente de verdad.
Campos relevantes para la web pública:

```typescript
{
  id: string,
  name: string,
  slug?: string,          // URL amigable para SEO
  description?: string,
  price: number | string,
  imageUrls: string[],    // URLs de Firebase Storage
  categories: string[],   // IDs de docs de la colección `categories`
  variants: TProductVariant[],
  hasVariants: boolean,
  stock: number | string,
  salesCount: number,     // usado para ordenar "más vendidos"
  ecommerce?: boolean,    // TRUE = se muestra en la web pública
  createdAt?: Date
}
```

**Importante:** todas las queries públicas filtran por `ecommerce == true`.

### 2. **`categories`**
```typescript
{ id: string, name: string, description?: string, createdAt: Date, updatedAt: Date }
```

### 3. **`clientes`** (logos)
```typescript
{
  id: string,
  nombre: string,
  logo: string,  // URL de Firebase Storage
  orden: number  // Para el orden en el carousel
}
```

### 4. **`promociones`**
```typescript
{
  id: string,
  titulo: string,
  descripcion: string,
  descuento: number,
  imagen: string,  // URL de Firebase Storage
  activa: boolean,
  fechaInicio: Timestamp,
  fechaFin: Timestamp
}
```

Además el sitio escribe en `ecommerceOrders`, `abandonedCarts`, `contactSubmissions`,
`productAnalytics`, `productViewEvents`, `searchQueries` y `conversionFunnels`.

---

## 🔑 **Índices de Firestore**

Las queries que combinan un `where` con un `orderBy` sobre otro campo necesitan un
**índice compuesto**. Sin él la query no devuelve nada y tira
`FirebaseError: The query requires an index` — la página queda rota en producción.

Los índices están **versionados en `firestore.indexes.json`**, junto con `firebase.json`
y `.firebaserc`. Para deployarlos:

```bash
firebase deploy --only firestore:indexes --project publimartools
```

### ⚠️ Antes de deployar, leé esto

El deploy de índices es **declarativo**: todo índice que exista en Firestore pero **no**
esté en `firestore.indexes.json` se marca para borrado. Como el proyecto es compartido
con el CRM, `firestore.indexes.json` incluye también **los índices del CRM**.

Reglas de oro:

1. **Nunca** deployar con `--force`. Usá `--non-interactive` (aborta si hay borrados
   pendientes) o leé el prompt antes de confirmar.
2. Antes de editar el archivo, sincronizalo con el estado real y recién ahí agregá lo tuyo:
   ```bash
   firebase firestore:indexes --project publimartools > firestore.indexes.json
   ```
3. Si el output del deploy menciona borrar índices de `auditLog`, `quotes`, `sales`,
   `clients`, `orders` o `notes` → **abortá**, el archivo quedó desactualizado.

### Índices que usa este sitio

| Colección | Campos | Query |
|---|---|---|
| `products` | `ecommerce ASC`, `createdAt DESC` | `useProducts()` — `lib/useFirestore.ts` |
| `products` | `ecommerce ASC`, `salesCount DESC` | `useTopProducts()` — carrousel "más vendidos" |
| `products` | `ecommerce ASC`, `categories CONTAINS`, `createdAt DESC` | `useProducts(categoria)` — filtro por categoría en servidor |
| `promociones` | `activa ASC`, `fechaInicio DESC` | `usePromociones()` |

Si agregás una query nueva con `where` + `orderBy`, agregá el índice acá **antes** de mergear.
Los índices tardan unos minutos en construirse; hasta que pasan a `Enabled` la query sigue fallando.

---

## 🎯 **Cómo Usar Firebase**

### **1. Leer Datos (Hooks)**

```tsx
"use client";

import {
  useProducts,
  useTopProducts,
  useClientes,
  usePromociones,
} from "@/lib/useFirestore";

export default function MiComponente() {
  // Todos los productos con ecommerce = true (ordenados por createdAt desc)
  const { products, loading, error } = useProducts();

  // Filtrado por categoría (se pasa el ID del doc de `categories`)
  const { products: banderas } = useProducts("id-de-la-categoria");

  // Top 5 más vendidos (ordenados por salesCount desc)
  const { topProducts } = useTopProducts(5);

  // Logos de clientes
  const { clientes } = useClientes();

  // Promociones activas
  const { promociones } = usePromociones();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <img src={product.imageUrls[0]} alt={product.name} />
        </div>
      ))}
    </div>
  );
}
```

---

### **2. Agregar Datos (CRUD)**

> ⚠️ Los ejemplos de abajo quedaron con los nombres de campo viejos (en español).
> Para `products` la forma real es `TProduct` en `types/product.ts`
> (`name`, `price`, `imageUrls`, `categories`, `ecommerce`, …).
> En la práctica los productos se cargan desde el CRM, no desde este sitio.

```tsx
import { addProduct, addCliente, addPromocion } from "@/lib/firestoreHelpers";
import { uploadImage } from "@/lib/firebaseStorage";

// Agregar un producto
async function crearProducto() {
  // 1. Primero sube la imagen
  const imageURL = await uploadImage(file, "productos/mi-bandera.jpg");

  // 2. Luego crea el producto
  const id = await addProduct({
    nombre: "Bandera Argentina",
    descripcion: "Bandera oficial de Argentina 150x90cm",
    precio: 15000,
    imagenes: [imageURL],
    categoria: "Banderas Nacionales",
    destacado: true,
  });

  console.log("Producto creado con ID:", id);
}

// Agregar un cliente (logo)
async function agregarCliente() {
  const logoURL = await uploadImage(file, "clientes/cliente-1.png");

  await addCliente({
    nombre: "Empresa ABC",
    logo: logoURL,
    orden: 1,
  });
}

// Agregar una promoción
async function crearPromocion() {
  const imagenURL = await uploadImage(file, "promociones/20-off.jpg");

  await addPromocion({
    titulo: "20% OFF",
    descripcion: "En banderas personalizadas este mes",
    descuento: 20,
    imagen: imagenURL,
    activa: true,
    fechaInicio: new Date(),
    fechaFin: new Date("2024-12-31"),
  });
}
```

---

### **3. Subir Imágenes**

```tsx
import { uploadImage, uploadMultipleImages } from "@/lib/firebaseStorage";

// Subir una imagen
async function handleUpload(file: File) {
  const url = await uploadImage(file, "productos/bandera.jpg");
  console.log("Imagen subida:", url);
}

// Subir múltiples imágenes
async function handleMultipleUpload(files: File[]) {
  const urls = await uploadMultipleImages(files, "productos");
  console.log("Imágenes subidas:", urls);
}
```

---

### **4. Actualizar y Eliminar Datos**

```tsx
import {
  updateProduct,
  deleteProduct,
  updateCliente,
  deleteCliente,
} from "@/lib/firestoreHelpers";

// Actualizar un producto
await updateProduct("producto-id-123", {
  precio: 18000,
  destacado: false,
});

// Eliminar un producto
await deleteProduct("producto-id-123");

// Actualizar un cliente
await updateCliente("cliente-id-456", {
  orden: 2,
});

// Eliminar un cliente
await deleteCliente("cliente-id-456");
```

---

## 🚀 **Próximos Pasos**

### **En la Consola de Firebase:**

1. **Crear colecciones:**
   - Ve a Firestore Database
   - Colecciones del sitio: `products`, `categories`, `clientes`, `promociones`

2. **Configurar Storage:**
   - Ve a Storage
   - Configura las reglas de seguridad (para permitir lectura pública):
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. **Agregar datos de ejemplo:**
   - Agrega algunos productos manualmente desde la consola
   - O usa los helpers desde el código

---

## ⚙️ **Reglas de Firestore (Seguridad)**

Para tu proyecto, recomiendo estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Productos: lectura pública, escritura solo autenticados
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Clientes: lectura pública, escritura solo autenticados
    match /clientes/{clienteId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Promociones: lectura pública, escritura solo autenticados
    match /promociones/{promoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📝 **Variables de Entorno**

Las credenciales están en `.env.local` (ya configurado y protegido en `.gitignore`).

**IMPORTANTE:** Nunca subas `.env.local` a Git. Ya está protegido automáticamente.

---

## 🎨 **Ejemplo Completo: Carousel de Clientes**

```tsx
"use client";

import { useClientes } from "@/lib/useFirestore";
import { motion } from "framer-motion";

export default function ClientesCarousel() {
  const { clientes, loading } = useClientes();

  if (loading) return <div>Cargando clientes...</div>;

  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-12"
      >
        {clientes.map((cliente) => (
          <div key={cliente.id} className="flex-shrink-0 w-48 h-32">
            <img
              src={cliente.logo}
              alt={cliente.nombre}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
```

---

¿Necesitás ayuda con algo específico de Firebase? ¡Avisame! 🚀
