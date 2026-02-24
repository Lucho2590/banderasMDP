"use client";

import { TProduct } from "@/types/product";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Package, ShoppingCart, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { generateProductSlug } from "@/lib/slugify";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: TProduct;
  featured?: boolean;
  index?: number;
}

// Helper para determinar si el producto es nuevo (creado hace menos de 7 días)
function isNewProduct(createdAt?: Date): boolean {
  if (!createdAt) return false;
  const now = new Date();
  const created = createdAt instanceof Date ? createdAt : new Date(createdAt);
  const diffInDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7;
}

// Helper para calcular el stock total (incluyendo variantes)
function getTotalStock(product: TProduct): number {
  if (product.hasVariants && product.variants.length > 0) {
    return product.variants.reduce((total, variant) => {
      const variantStock = typeof variant.stock === 'number' ? variant.stock : parseInt(variant.stock as string) || 0;
      return total + variantStock;
    }, 0);
  }
  return typeof product.stock === 'number' ? product.stock : parseInt(product.stock as string) || 0;
}

export default function ProductCard({ product, featured = false, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Generar slug si no existe (fallback)
  const productSlug = product.slug || generateProductSlug(product.name, product.id);

  // Determinar si el producto tiene múltiples variantes (necesita selección)
  const hasMultipleVariants = product.hasVariants && product.variants.length > 1;

  // Manejar agregar al carrito (solo para productos sin variantes o con una sola variante)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasMultipleVariants) return;

    // Si tiene una sola variante, usarla; si no, undefined
    const variant = product.hasVariants && product.variants.length === 1
      ? product.variants[0]
      : undefined;

    addToCart(product, 1, variant);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  // Precio a mostrar (si tiene variantes, toma el primero, sino el precio base)
  const displayPrice = product.hasVariants && product.variants.length > 0
    ? product.variants[0].price
    : product.price;

  // Imagen principal y secundaria
  const mainImage = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls[0]
    : "/placeholder-product.jpg";
  const secondaryImage = product.imageUrls && product.imageUrls.length > 1
    ? product.imageUrls[1]
    : null;

  // Estados del producto para badges
  const isNew = isNewProduct(product.createdAt);
  const totalStock = getTotalStock(product);
  const isOutOfStock = totalStock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.005 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container - altura automática */}
      <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden border border-brand-border shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 min-h-[320px] md:min-h-[420px] flex flex-col">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-reflection/0 to-sky-reflection/0 group-hover:from-sky-reflection/5 group-hover:to-sky-reflection/10 transition-all duration-500 pointer-events-none rounded-2xl"></div>

        {/* Badge de producto destacado (TOP) */}
        {featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            className="absolute top-2 right-2 md:top-3 md:right-3 z-20 bg-sol text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1"
          >
            <TrendingUp className="h-2 md:h-3 w-2 md:w-3" />
            <span className="hidden sm:inline">TOP {index + 1}</span>
            <span className="sm:hidden">{index + 1}</span>
          </motion.div>
        )}

        {/* Badges de estado */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 z-20 flex flex-col gap-1.5">
          {isOutOfStock && (
            <span className="bg-gray-600 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-md flex items-center gap-1">
              <Package className="h-2.5 w-2.5 md:h-3 md:w-3" />
              SIN STOCK
            </span>
          )}
          {isNew && !isOutOfStock && (
            <span className="bg-green-500 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-md flex items-center gap-1">
              <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />
              NUEVO
            </span>
          )}
        </div>

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-bg-secondary to-brand-bg-tertiary flex-shrink-0">
          {mainImage !== "/placeholder-product.jpg" ? (
            <>
              {/* Imagen principal */}
              <img
                src={mainImage}
                alt={product.name}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  secondaryImage && isHovered ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-105'
                }`}
              />
              {/* Imagen secundaria en hover */}
              {secondaryImage && (
                <img
                  src={secondaryImage}
                  alt={`${product.name} - vista alternativa`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              )}
            </>
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

        {/* Product Info - Reordenado: Nombre → Precio → Descripción → Botón */}
        <div className="p-3 md:p-5 lg:p-6 relative z-10 flex flex-col flex-1">
          {/* Contenido que puede crecer */}
          <div className="flex-1">
            {/* Product Name - tipografía mejorada */}
            <h3 className="text-sm md:text-base lg:text-lg font-bold text-brand-text-primary mb-1.5 md:mb-2 line-clamp-2 group-hover:text-sky-reflection-600 transition-colors leading-tight">
              {product.name}
            </h3>

            {/* Price - ahora antes de la descripción */}
            <div className="mb-2 md:mb-3">
              {product.hasVariants && product.variants.length > 1 ? (
                <div>
                  <p className="text-[10px] md:text-xs text-brand-text-secondary mb-0.5">Desde:</p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-sky-reflection-600">
                    ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                  </p>
                </div>
              ) : (
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-sky-reflection-600">
                  ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                </p>
              )}
            </div>

            {/* Description - ahora después del precio, tipografía ajustada */}
            {product.description && (
              <p className="text-xs md:text-sm text-brand-text-secondary mb-3 md:mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* CTA Button - Siempre al fondo */}
          {isOutOfStock ? (
            <span className="w-full inline-flex items-center justify-center px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl bg-gray-400 text-white font-semibold text-xs md:text-sm cursor-not-allowed">
              Sin stock
            </span>
          ) : hasMultipleVariants ? (
            <Link
              href={`/tienda/${productSlug}`}
              className="w-full inline-flex items-center justify-center px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl bg-sky-reflection text-white hover:bg-sky-reflection-600 transition-all shadow-md hover:shadow-lg font-semibold text-xs md:text-sm"
            >
              Ver opciones
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`w-full inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all shadow-md hover:shadow-lg font-semibold text-xs md:text-sm ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-sky-reflection text-white hover:bg-sky-reflection-600'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Agregado</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Agregar al carrito</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
