"use client";

import { TProduct } from "@/types/product";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { generateProductSlug } from "@/lib/slugify";

interface ProductCarouselNetflixProps {
  products: TProduct[];
}

export default function ProductCarouselNetflix({ products }: ProductCarouselNetflixProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!products || products.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });

      // Update scroll indicators
      setTimeout(() => {
        if (scrollContainerRef.current) {
          setCanScrollLeft(scrollContainerRef.current.scrollLeft > 0);
          setCanScrollRight(
            scrollContainerRef.current.scrollLeft <
            scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
          );
        }
      }, 300);
    }
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-charcoal-blue to-charcoal-blue/90 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Productos Destacados
              </h2>
              <p className="text-sm md:text-base text-white/70">Los más vendidos</p>
            </div>
          </div>

          {/* Navigation buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  : "bg-white/5 cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  : "bg-white/5 cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => {
            const productSlug = product.slug || generateProductSlug(product.name, product.id);
            const displayPrice = product.hasVariants && product.variants.length > 0
              ? product.variants[0].price
              : product.price;
            const mainImage = product.imageUrls && product.imageUrls.length > 0
              ? product.imageUrls[0]
              : null;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] group"
              >
                <Link href={`/tienda/${productSlug}`}>
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    {/* Image */}
                    <div className="relative h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden bg-gradient-to-br from-brand-bg-secondary to-brand-bg-tertiary pt-6">
                      {mainImage ? (
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

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5">
                      {/* Name */}
                      <h3 className="text-base md:text-lg font-bold text-brand-text-primary mb-2 line-clamp-2 group-hover:text-sky-reflection-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Description */}
                      {product.description && (
                        <p className="text-xs md:text-sm text-brand-text-secondary mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          {product.hasVariants && product.variants.length > 1 && (
                            <p className="text-xs text-brand-text-secondary mb-1">Desde:</p>
                          )}
                          <p className="text-xl md:text-2xl font-bold text-sky-reflection-600">
                            ${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-AR') : displayPrice}
                          </p>
                        </div>

                        {/* CTA icon */}
                        <div className="w-10 h-10 rounded-full bg-sky-reflection flex items-center justify-center group-hover:bg-sky-reflection-600 transition-all shadow-md">
                          <ChevronRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile scroll indicator */}
        <div className="md:hidden flex justify-center mt-4 space-x-1">
          {products.map((_, index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-white/30"
            />
          ))}
        </div>
      </div>

      {/* Custom scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
