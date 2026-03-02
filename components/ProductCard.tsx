"use client";

import { TProduct } from "@/types/product";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Package, ShoppingCart, Check, Eye, Share2, Link as LinkIcon, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  // Cerrar menú de compartir al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

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

  // Manejar compartir producto - mostrar menú
  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  // Obtener URL del producto
  const getProductUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/tienda/${productSlug}`;
    }
    return `/tienda/${productSlug}`;
  };

  // Compartir en WhatsApp
  const shareWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getProductUrl();
    const text = encodeURIComponent(`Mirá este producto: ${product.name} ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShowShareMenu(false);
  };

  // Compartir en Facebook
  const shareFacebook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = encodeURIComponent(getProductUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  // Compartir en Twitter/X
  const shareTwitter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = encodeURIComponent(getProductUrl());
    const text = encodeURIComponent(`Mirá este producto: ${product.name}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  // Compartir en Instagram (copia link y abre Instagram)
  const shareInstagram = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Primero copiamos el link
    await copyToClipboard(getProductUrl());

    // Intentamos abrir Instagram
    // En mobile esto abrirá la app si está instalada
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Intentar abrir la app de Instagram
      window.location.href = 'instagram://';
      // Fallback a la web después de un delay
      setTimeout(() => {
        window.open('https://instagram.com', '_blank');
      }, 500);
    } else {
      window.open('https://instagram.com', '_blank');
    }

    setShowShareMenu(false);
  };

  // Copiar link
  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await copyToClipboard(getProductUrl());
    setShowShareMenu(false);
  };

  // Helper para copiar al clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
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
      {/* Card Container - altura automática, compacto en mobile */}
      <div className="relative bg-white rounded-lg md:rounded-2xl overflow-hidden border border-brand-border shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 min-h-[240px] md:min-h-[420px] flex flex-col">
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
        <div className="p-2 md:p-5 lg:p-6 relative z-10 flex flex-col flex-1">
          {/* Contenido que puede crecer */}
          <div className="flex-1">
            {/* Product Name - tipografía mejorada */}
            <h3 className="text-xs md:text-base lg:text-lg font-bold text-brand-text-primary mb-1 md:mb-2 line-clamp-2 group-hover:text-sky-reflection-600 transition-colors leading-tight">
              {product.name}
            </h3>

            {/* Price - ahora antes de la descripción */}
            <div className="mb-1.5 md:mb-3">
              {product.hasVariants && product.variants.length > 1 ? (
                <div>
                  <p className="text-[9px] md:text-xs text-brand-text-secondary mb-0.5">Desde:</p>
                  <p className="text-base md:text-xl lg:text-2xl font-bold text-sky-reflection-600">
                    ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                  </p>
                </div>
              ) : (
                <p className="text-base md:text-xl lg:text-2xl font-bold text-sky-reflection-600">
                  ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                </p>
              )}
            </div>

            {/* Description - oculta en mobile para cards compactas */}
            {product.description && (
              <p className="hidden md:block text-sm text-brand-text-secondary mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Action Buttons - 3 iconos compactos */}
          <div className="flex items-center justify-center gap-1.5 md:gap-2">
            {/* Botón Agregar al Carrito */}
            {isOutOfStock ? (
              <span className="flex-1 inline-flex items-center justify-center p-2 md:p-3 rounded-md md:rounded-xl bg-gray-400 text-white cursor-not-allowed" title="Sin stock">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            ) : hasMultipleVariants ? (
              <Link
                href={`/tienda/${productSlug}`}
                className="flex-1 inline-flex items-center justify-center p-2 md:p-3 rounded-md md:rounded-xl bg-sky-reflection text-white hover:bg-sky-reflection-600 transition-all shadow-md hover:shadow-lg"
                title="Ver opciones y agregar"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 inline-flex items-center justify-center p-2 md:p-3 rounded-md md:rounded-xl transition-all shadow-md hover:shadow-lg ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-sky-reflection text-white hover:bg-sky-reflection-600'
                }`}
                title={addedToCart ? "Agregado al carrito" : "Agregar al carrito"}
              >
                {addedToCart ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            )}

            {/* Botón Ver Detalles */}
            <Link
              href={`/tienda/${productSlug}`}
              className="flex-1 inline-flex items-center justify-center p-2 md:p-3 rounded-md md:rounded-xl bg-brand-bg-secondary text-brand-text-primary hover:bg-brand-bg-tertiary transition-all shadow-md hover:shadow-lg border border-brand-border"
              title="Ver detalles"
            >
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            </Link>

            {/* Botón Compartir con menú */}
            <div className="relative flex-1" ref={shareMenuRef}>
              <button
                onClick={handleShareClick}
                className={`w-full inline-flex items-center justify-center p-2 md:p-3 rounded-md md:rounded-xl transition-all shadow-md hover:shadow-lg border border-brand-border ${
                  linkCopied
                    ? 'bg-green-500 text-white border-green-500'
                    : showShareMenu
                    ? 'bg-sky-reflection text-white border-sky-reflection'
                    : 'bg-brand-bg-secondary text-brand-text-primary hover:bg-brand-bg-tertiary'
                }`}
                title={linkCopied ? "Link copiado!" : "Compartir producto"}
              >
                {linkCopied ? (
                  <LinkIcon className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>

              {/* Menú de compartir */}
              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-brand-border p-2 min-w-[160px] z-50">
                  {/* Cerrar */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowShareMenu(false); }}
                    className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  <p className="text-[10px] text-brand-text-tertiary px-2 pb-1.5 border-b border-brand-border mb-1.5">Compartir en:</p>

                  {/* WhatsApp */}
                  <button
                    onClick={shareWhatsApp}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-green-50 transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-xs font-medium text-brand-text-primary">WhatsApp</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={shareFacebook}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-blue-50 transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-xs font-medium text-brand-text-primary">Facebook</span>
                  </button>

                  {/* Twitter/X */}
                  <button
                    onClick={shareTwitter}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="text-xs font-medium text-brand-text-primary">X (Twitter)</span>
                  </button>

                  {/* Instagram */}
                  <button
                    onClick={shareInstagram}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-pink-50 transition-colors text-left"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                      <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFDC80" />
                          <stop offset="25%" stopColor="#F77737" />
                          <stop offset="50%" stopColor="#E1306C" />
                          <stop offset="75%" stopColor="#C13584" />
                          <stop offset="100%" stopColor="#833AB4" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-brand-text-primary">Instagram</span>
                      <span className="text-[9px] text-brand-text-tertiary">Link copiado</span>
                    </div>
                  </button>

                  {/* Copiar link */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-brand-bg-secondary transition-colors text-left mt-1 pt-1.5 border-t border-brand-border"
                  >
                    <LinkIcon className="w-4 h-4 text-brand-text-secondary" />
                    <span className="text-xs font-medium text-brand-text-primary">Copiar link</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
