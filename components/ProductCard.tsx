"use client";

import { TProduct } from "@/types/product";
import { motion } from "framer-motion";
import { ShoppingCart, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { generateProductSlug } from "@/lib/slugify";

interface ProductCardProps {
  product: TProduct;
  featured?: boolean;
  index?: number;
}

export default function ProductCard({ product, featured = false, index = 0 }: ProductCardProps) {
  // Generar slug si no existe (fallback)
  const productSlug = product.slug || generateProductSlug(product.name, product.id);
  // Precio a mostrar (si tiene variantes, toma el primero, sino el precio base)
  const displayPrice = product.hasVariants && product.variants.length > 0
    ? product.variants[0].price
    : product.price;

  // Imagen principal
  const mainImage = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls[0]
    : "/placeholder-product.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Badge de producto destacado */}
      {featured && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
          className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-20 bg-sol text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1"
        >
          <TrendingUp className="h-2 md:h-3 w-2 md:w-3" />
          <span className="hidden sm:inline">TOP {index + 1}</span>
          <span className="sm:hidden">{index + 1}</span>
        </motion.div>
      )}

      {/* Card Container */}
      <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden border border-brand-border shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-[340px] md:h-[480px] lg:h-[570px] flex flex-col">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-reflection/0 to-sky-reflection/0 group-hover:from-sky-reflection/5 group-hover:to-sky-reflection/10 transition-all duration-500 pointer-events-none rounded-2xl"></div>

        {/* Image Container */}
        <div className="relative h-[180px] md:h-[260px] lg:h-[300px] overflow-hidden bg-gradient-to-br from-brand-bg-secondary to-brand-bg-tertiary flex-shrink-0">
          {mainImage !== "/placeholder-product.jpg" ? (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl text-sky-reflection/20">🏴</div>
            </div>
          )}

          {/* Overlay con info adicional - oculto en mobile */}
          <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-charcoal-blue/80 via-charcoal-blue/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end p-4">
            <div className="text-white text-sm space-y-1">
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold inline-block">
                Consulta la medida que necesitas
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 md:p-5 lg:p-6 relative z-10 flex flex-col flex-1">
          {/* Contenido que puede crecer */}
          <div className="flex-1">
            {/* Product Name */}
            <h3 className="text-xs md:text-base lg:text-lg font-bold text-brand-text-primary mb-1 md:mb-2 line-clamp-2 group-hover:text-sky-reflection-600 transition-colors">
              {product.name}
            </h3>

            {/* Description - ahora visible en mobile también */}
            {product.description && (
              <p className="text-xs md:text-sm text-brand-text-secondary mb-2 md:mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Price & Variants */}
            <div className="mb-2 md:mb-4">
              {product.hasVariants && product.variants.length > 1 ? (
                <div>
                  <p className="text-xs md:text-sm text-brand-text-secondary mb-1 hidden md:block">Desde:</p>
                  <p className="text-sm md:text-xl lg:text-2xl font-bold text-sky-reflection-600">
                    ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                  </p>

                </div>
              ) : (
                <p className="text-sm md:text-xl lg:text-2xl font-bold text-sky-reflection-600">
                  ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                </p>
              )}
            </div>
          </div>

          {/* CTA Button - Siempre al fondo */}
          <Link
            href={`/tienda/${productSlug}`}
            className="w-full inline-flex items-center justify-center px-2 md:px-4 py-1.5 md:py-3 bg-sky-reflection text-white rounded-lg md:rounded-xl hover:bg-sky-reflection-600 transition-all shadow-md hover:shadow-lg font-semibold text-xs md:text-sm"
          >
            <span>Ver Detalles</span>
            {/* <ShoppingCart className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /> */}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
