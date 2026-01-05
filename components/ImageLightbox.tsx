"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
  productName = "Producto",
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sincronizar currentIndex con initialIndex cuando cambie
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Navegación con teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Contenedor del lightbox */}
          <div
            className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con título y botón cerrar */}
            <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-10">
              <div className="flex items-center space-x-3">
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  {productName}
                </h3>
                {images.length > 1 && (
                  <span className="text-white/70 text-sm">
                    {currentIndex + 1} / {images.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Imagen principal */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            >
              <img
                src={images[currentIndex]}
                alt={`${productName} ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Navegación - Solo si hay múltiples imágenes */}
            {images.length > 1 && (
              <>
                {/* Botón Anterior */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>

                {/* Botón Siguiente */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                {/* Indicadores de puntos */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-white w-8"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Instrucciones para desktop */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm hidden md:block">
              {images.length > 1 && (
                <span>Usa las flechas ← → del teclado para navegar | </span>
              )}
              <span>Presiona ESC para cerrar</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
