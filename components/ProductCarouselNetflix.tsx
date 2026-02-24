"use client";

import { TProduct } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import ProductCard from "@/components/ProductCard";

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
      const scrollAmount = 320;
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

        {/* Scroll container - usando ProductCard unificado */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 md:space-x-5 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
            >
              <ProductCard
                product={product}
                featured={true}
                index={index}
              />
            </div>
          ))}
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
