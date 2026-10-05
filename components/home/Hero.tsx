"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { waLink } from "@/lib/contact";

/**
 * Hero principal de la homepage: texto a la izquierda + fotografía a la derecha.
 *
 * NOTA DE IMAGEN: el panel derecho usa una foto de producto como PLACEHOLDER de
 * baja resolución (400px de ancho). Reemplazar `/productos/banderas-flameo.jpg`
 * por una FOTO REAL de bandera argentina flameando, apaisada y de alta
 * resolución (mínimo 1920px de ancho), y quitar el marcador de muestra.
 */
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden gradient-hero-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-8 pt-14 md:grid-cols-[0.9fr_1.1fr] md:pt-0 lg:min-h-[560px]">
          {/* Columna de texto */}
          <div className="md:py-12 lg:py-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky-reflection-600"
            >
              Banderas, estandartes y accesorios
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 max-w-[620px] font-sans text-[clamp(2.625rem,5vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-brand-text-primary"
            >
              Fabricación propia en Mar del Plata
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base text-brand-text-secondary md:text-lg"
            >
              Calidad · Variedad · Envíos a todo el país
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Link
                href="/productos"
                className="group inline-flex items-center justify-center rounded-full bg-sky-reflection-600 px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-sky-reflection-700"
              >
                Ver productos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink("Hola, quería hacerles una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-[1.5px] border-sky-reflection-600 bg-white px-7 py-4 text-[15px] font-extrabold text-sky-reflection-600 transition-colors hover:bg-sky-reflection-50"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Consultar por WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Panel de imagen - PLACEHOLDER (reemplazar por foto real en alta) */}
          <div className="relative h-[290px] w-full overflow-hidden rounded-t-[22px] shadow-hero-panel md:h-[380px] md:rounded-l-[28px] md:rounded-tr-none lg:h-[470px]">
            <Image
              src="/productos/banderas-flameo.jpg"
              alt="Bandera argentina flameando"
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-sky-reflection-600/15" />
            {/* Marcador de placeholder (quitar al cargar la foto real) */}
            <span className="absolute right-3 top-3 rounded-md bg-brand-text-primary/45 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
              Imagen de muestra · reemplazar por foto real
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
