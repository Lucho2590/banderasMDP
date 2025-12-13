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

Tu base de datos tiene 3 colecciones principales:

### 1. **`productos`**
```typescript
{
  id: string,
  nombre: string,
  descripcion: string,
  precio: number,
  imagenes: string[],  // URLs de Firebase Storage
  categoria: string,
  destacado: boolean,
  createdAt: Timestamp
}
```

### 2. **`clientes`** (logos)
```typescript
{
  id: string,
  nombre: string,
  logo: string,  // URL de Firebase Storage
  orden: number  // Para el orden en el carousel
}
```

### 3. **`promociones`**
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

---

## 🎯 **Cómo Usar Firebase**

### **1. Leer Datos (Hooks)**

```tsx
"use client";

import { useProductos, useClientes, usePromociones } from "@/lib/useFirestore";

export default function MiComponente() {
  // Obtener todos los productos
  const { productos, loading, error } = useProductos();

  // Obtener solo productos destacados
  const { productos: destacados } = useProductos(true);

  // Obtener logos de clientes
  const { clientes } = useClientes();

  // Obtener promociones activas
  const { promociones } = usePromociones();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {productos.map((producto) => (
        <div key={producto.id}>
          <h3>{producto.nombre}</h3>
          <p>${producto.precio}</p>
          <img src={producto.imagenes[0]} alt={producto.nombre} />
        </div>
      ))}
    </div>
  );
}
```

---

### **2. Agregar Datos (CRUD)**

```tsx
import { addProducto, addCliente, addPromocion } from "@/lib/firestoreHelpers";
import { uploadImage } from "@/lib/firebaseStorage";

// Agregar un producto
async function crearProducto() {
  // 1. Primero sube la imagen
  const imageURL = await uploadImage(file, "productos/mi-bandera.jpg");

  // 2. Luego crea el producto
  const id = await addProducto({
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
  updateProducto,
  deleteProducto,
  updateCliente,
  deleteCliente,
} from "@/lib/firestoreHelpers";

// Actualizar un producto
await updateProducto("producto-id-123", {
  precio: 18000,
  destacado: false,
});

// Eliminar un producto
await deleteProducto("producto-id-123");

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
   - Crea 3 colecciones: `productos`, `clientes`, `promociones`

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
    match /productos/{productId} {
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
