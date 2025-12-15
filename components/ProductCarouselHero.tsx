"use client";

import { TProduct } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { generateProductSlug } from "@/lib/slugify";

interface ProductCarouselHeroProps {
  products: TProduct[];
}

export default function ProductCarouselHero({ products }: ProductCarouselHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play del carrousel cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!products || products.length === 0) return null;

  const currentProduct = products[currentIndex];
  const productSlug = currentProduct.slug || generateProductSlug(currentProduct.name, currentProduct.id);
  const displayPrice = currentProduct.hasVariants && currentProduct.variants.length > 0
    ? currentProduct.variants[0].price
    : currentProduct.price;
  const mainImage = currentProduct.imageUrls && currentProduct.imageUrls.length > 0
    ? currentProduct.imageUrls[0]
    : null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-charcoal-blue">
      {/* Título de sección arriba */}
      <div className="absolute top-6 left-0 right-0 z-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-sol/90 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full shadow-2xl"
        >
          <TrendingUp className="h-4 md:h-5 w-4 md:w-5 text-white" />
          <span className="text-white font-bold text-sm md:text-base">Productos Destacados</span>
        </motion.div>
      </div>

      {/* Imagen de fondo con animación */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          {mainImage ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${mainImage})` }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-bg-secondary to-brand-bg-tertiary">
              <div className="text-9xl text-sky-reflection/20">🏴</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay degradado oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-blue via-charcoal-blue/70 to-charcoal-blue/30 z-10"></div>

      {/* Contenido del producto */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              {/* Badge TOP */}
              <div className="inline-flex items-center space-x-2 bg-sol text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg mb-3 md:mb-4">
                <Star className="h-3 md:h-4 w-3 md:w-4 fill-white" />
                <span>TOP {currentIndex + 1}</span>
              </div>

              {/* Nombre del producto */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl">
                {currentProduct.name}
              </h2>

              {/* Descripción */}
              {currentProduct.description && (
                <p className="text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6 line-clamp-2 drop-shadow-lg">
                  {currentProduct.description}
                </p>
              )}

              {/* Precio y CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Precio */}
                <div>
                  {currentProduct.hasVariants && currentProduct.variants.length > 1 && (
                    <p className="text-xs md:text-sm text-white/70 mb-1">Desde:</p>
                  )}
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl">
                    ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                  </p>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/tienda/${productSlug}`}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-sky-reflection text-white rounded-xl hover:bg-sky-reflection-600 transition-all shadow-2xl hover:shadow-sky-reflection/50 font-bold text-sm md:text-base group"
                >
                  <span>Ver Producto</span>
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <ChevronLeft className="h-5 md:h-6 w-5 md:w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <ChevronRight className="h-5 md:h-6 w-5 md:w-6 text-white" />
      </button>

      {/* Dots de navegación */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? "w-8 h-2 bg-white rounded-full"
                : "w-2 h-2 bg-white/40 rounded-full hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
