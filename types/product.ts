// Types de Product - Sincronizados con publimarTools

export enum EProductCategory {
  NATIONAL_FLAG = "Bandera Nacional",
  CUSTOM_FLAG = "Bandera Personalizada",
  ACCESSORY = "Accesorio",
}

export enum EProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type TProductCategory = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface TProductVariant {
  id: string;
  size: string;
  price: number | string;
  stock: number | string;
  sku?: string;
}

/**
 * Especificaciones técnicas del producto.
 * Se administran desde el backoffice. Todos los campos son opcionales:
 * la ficha solo muestra los que tengan valor.
 */
export interface TProductSpecs {
  material?: string;
  terminacion?: string;
  usoRecomendado?: string;
  garantia?: string;
}

/** Pregunta frecuente asociada a un producto. */
export interface TProductFaq {
  question: string;
  answer: string;
}

export interface TProduct {
  lowStock: boolean;
  salesCount: number;
  totalSales: number;
  id: string;
  name: string;
  slug?: string; // URL amigable para SEO (ej: "bandera-argentina-ceremonia")
  description?: string;
  variants: TProductVariant[];
  categories: string[];
  taxRate?: number; // Opcional para compatibilidad con productos existentes
  price: number | string;
  stock: number | string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  imageUrls: string[]; // Cambiado de never[] a string[]
  hasVariants: boolean;
  sku: string;
  ecommerce?: boolean; // Campo para mostrar en web pública
  // Contenido editable desde el backoffice (todos opcionales)
  specs?: TProductSpecs; // Especificaciones técnicas
  advantages?: string[]; // Ventajas / beneficios destacados
  faqs?: TProductFaq[]; // Preguntas frecuentes
}
