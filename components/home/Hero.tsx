"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Hero principal de la homepage.
 *
 * NOTA DE IMAGEN: el fondo usa una imagen de producto como PLACEHOLDER.
 * Reemplazar `/productos/banderas-flameo.jpg` por una FOTO REAL de instalación
 * (banderas colocadas en una empresa, municipio, hotel, escuela o evento).
 * Idealmente una foto apaisada de alta resolución (mínimo 1920px de ancho).
 */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[78vh] flex items-center overflow-hidden">
      {/* Fondo - PLACEHOLDER (reemplazar por foto real de instalación) */}
      <div className="absolute inset-0">
        <Image
          src="/productos/banderas-flameo.jpg"
          alt="Instalación de banderas"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay azul corporativo sobrio para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-baltic-blue-700/95 via-baltic-blue-600/85 to-sky-reflection-700/60" />
      </div>

      {/* Marcador de placeholder (quitar al cargar foto real) */}
      <span className="absolute top-4 right-4 z-20 rounded-md bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
        Imagen de muestra · reemplazar por foto real
      </span>

      {/* Contenido */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white"
          >
            Banderas institucionales y corporativas para empresas, municipios y eventos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-white/90 font-light"
          >
            Fabricación propia · Envíos a todo el país · Presupuestos en 24 horas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/productos"
              className="group inline-flex items-center justify-center px-7 py-3.5 bg-white text-sky-reflection-700 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:bg-brand-bg-secondary transition-all"
            >
              Ver catálogo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center px-7 py-3.5 bg-sky-reflection text-white rounded-xl font-semibold text-base shadow-lg hover:bg-sky-reflection-hover transition-all border border-white/20"
            >
              <FileText className="mr-2 h-5 w-5" />
              Solicitar presupuesto
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
