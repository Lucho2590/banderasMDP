"use client";

import { useParams, useRouter } from "next/navigation";
import { useProductBySlug } from "@/lib/useFirestore";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Check, Star, TrendingUp, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { product, loading, error } = useProductBySlug(slug);
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    const variant = product.hasVariants && product.variants.length > 0
      ? product.variants[selectedVariant]
      : undefined;

    addToCart(product, quantity, variant);
    setAddedToCart(true);

    // Reset después de 2 segundos
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg-secondary">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-sky-reflection border-t-transparent mb-4"></div>
          <p className="text-brand-text-secondary text-lg">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg-secondary">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-brand-text-primary mb-4">Producto no encontrado</h1>
          <p className="text-brand-text-secondary mb-8">
            Lo sentimos, el producto que buscás no existe o ya no está disponible.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-sky-reflection text-white rounded-xl hover:bg-sky-reflection-600 transition-all font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver a Productos</span>
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = product.hasVariants && product.variants.length > 0
    ? product.variants[selectedVariant].price
    : product.price;

  const displayStock = product.hasVariants && product.variants.length > 0
    ? product.variants[selectedVariant].stock
    : product.stock;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-bg-primary to-brand-bg-secondary">
      {/* Breadcrumb */}
      <div className="bg-brand-bg-secondary border-b border-brand-border">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-brand-text-secondary">
            <Link href="/" className="hover:text-sky-reflection-600 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/tienda" className="hover:text-sky-reflection-600 transition-colors">
              Tienda
            </Link>
            <span>/</span>
            <span className="text-brand-text-primary font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-brand-text-secondary hover:text-sky-reflection-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden border border-brand-border shadow-lg mb-4 aspect-square relative">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <img
                  src={product.imageUrls[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-bg-secondary to-brand-bg-tertiary">
                  <div className="text-9xl text-sky-reflection/20">🏴</div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.salesCount > 10 && (
                  <div className="bg-sol text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <TrendingUp className="h-3 w-3" />
                    <span>Popular</span>
                  </div>
                )}
                {/* {product.lowStock && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Pocas unidades
                  </div>
                )} */}
              </div>
            </div>

            {/* Thumbnails */}
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-sky-reflection shadow-md scale-105"
                        : "border-brand-border hover:border-sky-reflection/50"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Categories */}
            {/* {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-sky-reflection/10 text-sky-reflection-700 rounded-full font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )} */}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4">
              {product.name}
            </h1>

            {/* SKU & Sales */}
            {/* <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-brand-text-secondary">
                SKU: <span className="font-mono font-semibold">{product.sku}</span>
              </span>
              {product.salesCount > 0 && (
                <div className="flex items-center space-x-1 text-sm text-brand-text-secondary">
                  <Star className="h-4 w-4 text-sol fill-sol" />
                  <span className="font-semibold">{product.salesCount} vendidos</span>
                </div>
              )}
            </div> */}

            {/* Description */}
            {product.description && (
              <p className="text-lg text-brand-text-secondary leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Variants Selector */}
            {product.hasVariants && product.variants.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-text-primary mb-3">
                  Medidas:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all ${
                        selectedVariant === index
                          ? "border-sky-reflection bg-sky-reflection text-white shadow-md"
                          : "border-brand-border text-brand-text-secondary hover:border-sky-reflection/50"
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="bg-white rounded-2xl border border-brand-border p-6 mb-6 shadow-md">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm text-brand-text-secondary">Precio:</span>
                {product.hasVariants && product.variants.length > 1 && (
                  <span className="text-xs text-brand-text-tertiary">
                    {product.variants[selectedVariant].size}
                  </span>
                )}
              </div>
              <div className="text-4xl font-bold text-sky-reflection-600">
                ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
              </div>
              {typeof displayStock === 'number' && displayStock > 0 && (
                <div className="mt-3 flex items-center space-x-2 text-sm">
                  <Package className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-semibold">Stock disponible</span>
                </div>
              )}
            </div>

            {/* Renderizado condicional según stock */}
            {typeof displayStock === 'number' && displayStock === 0 ? (
              /* Sin Stock - Botón de notificación */
              <div>
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 font-semibold text-center">Sin stock disponible</p>
                </div>
                <a
                  href={`https://wa.me/5492235416600?text=${encodeURIComponent(
                    `¡Hola! Me gustaría que me avisen cuando tengan stock nuevamente del siguiente producto:\n\n` +
                    `Producto: ${product.name}\n` +
                    (product.hasVariants && product.variants.length > 0
                      ? `Tamaño: ${product.variants[selectedVariant].size}\n`
                      : '') +
                    `\n¡Gracias!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Avisarme cuando haya stock</span>
                </a>
              </div>
            ) : (
              /* Con Stock - Botones normales */
              <>
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brand-text-primary mb-3">
                    Cantidad:
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl border-2 border-brand-border hover:border-sky-reflection transition-colors font-bold text-xl"
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold text-brand-text-primary w-16 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-xl border-2 border-brand-border hover:border-sky-reflection transition-colors font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  whileHover={{ scale: addedToCart ? 1 : 1.02 }}
                  whileTap={{ scale: addedToCart ? 1 : 0.98 }}
                  className={`w-full py-4 ${
                    addedToCart ? "bg-green-600" : "bg-sky-reflection hover:bg-sky-reflection-600"
                  } text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 mb-4`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-6 w-6" />
                      <span>¡Agregado al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6" />
                      <span>Agregar al Carrito</span>
                    </>
                  )}
                </motion.button>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/5492235416600?text=${encodeURIComponent(
                    `¡Hola! Me interesa el siguiente producto:\n\n` +
                    `Producto: ${product.name}\n` +
                    (product.hasVariants && product.variants.length > 0
                      ? `Tamaño: ${product.variants[selectedVariant].size}\n`
                      : '') +
                    `Cantidad: ${quantity}\n` +
                    `Precio: $${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}\n\n` +
                    `¿Podrían confirmarme disponibilidad y tiempos de entrega?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Consultar por WhatsApp</span>
                </a>
              </>
            )}

            {/* Features */}
            <div className="mt-8 space-y-3">
              {[
                "Envío a todo el país",
                "Materiales de primera calidad",
                "Garantía de satisfacción",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-brand-text-secondary">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
