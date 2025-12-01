# Banderas MDP - Sitio Web

Sitio web moderno para Banderas Mar del Plata, construido con Next.js, React y shadCN UI.

## 🚀 Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **shadCN UI** - Componentes UI (configurado)
- **Lucide React** - Iconos
- **Google Fonts** - Inter y Playfair Display

## 📁 Estructura del Proyecto

```
BanderasMDP/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── globals.css        # Estilos globales
│   ├── productos/         # Página de productos
│   ├── clientes/          # Página de clientes
│   ├── promociones/       # Página de promociones
│   └── contacto/          # Página de contacto
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Header con navegación
│   ├── Footer.tsx         # Footer
│   └── Carousel.tsx       # Componente de carousel
└── lib/                   # Utilidades
    └── utils.ts           # Funciones helper (cn para shadCN)
```

## 🎨 Características

- ✅ Diseño responsive y moderno con gradientes animados
- ✅ Navegación con menú móvil mejorado
- ✅ Páginas: Inicio, Productos, Clientes, Promociones, Contacto
- ✅ Carousel para promociones
- ✅ Formulario de contacto con validación
- ✅ Integración con WhatsApp
- ✅ Preparado para futuro e-commerce
- ✅ Optimizado para SEO

## 🛠️ Instalación y Uso

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
npm run build
npm start
```

## 🚀 Deploy en Vercel

El proyecto está configurado para deploy automático en Vercel.

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Subí el código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repositorio-github>
   git push -u origin main
   ```

2. **Conectá tu repositorio en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importá tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js
   - Click en "Deploy"

3. **Configuración automática:**
   - Framework: Next.js (detectado automáticamente)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Opción 2: Deploy con Vercel CLI

1. **Instalá Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Para producción:**
   ```bash
   vercel --prod
   ```

### Variables de Entorno (si las necesitás)

Si en el futuro necesitás variables de entorno (por ejemplo, para el formulario de contacto), agregalas en:
- Vercel Dashboard → Tu Proyecto → Settings → Environment Variables

## 📝 Próximos Pasos

- [ ] Agregar imágenes reales (productos, promociones, logos de clientes)
- [ ] Implementar carrito de compras
- [ ] Integrar sistema de e-commerce
- [ ] Conectar formulario de contacto con backend/email service
- [ ] Agregar más componentes de shadCN UI según necesidad
- [ ] Optimizar imágenes con next/image
- [ ] Agregar analytics (Google Analytics, Vercel Analytics)

## 📞 Información de Contacto

- **Dirección**: San Lorenzo 3145, Mar del Plata
- **Teléfono**: 223-473 9600
- **WhatsApp**: 223-541 6600
- **Email**: info@banderasmardelplata.com.ar

---

Diseñado por OG comunicación y diseño

