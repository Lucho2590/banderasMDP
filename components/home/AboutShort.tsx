"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { YEARS_EXPERIENCE } from "@/lib/contact";

/**
 * Bloque "Nosotros": imagen a la izquierda + copy a la derecha.
 *
 * NOTA DE IMAGEN: PLACEHOLDER de baja resolución. Reemplazar por una foto real
 * de detalle de confección/costura de una bandera argentina y quitar el marcador.
 */
export default function AboutShort() {
  return (
    <section id="nosotros" className="bg-brand-bg-primary pb-4 pt-16 scroll-mt-24 lg:pt-[86px]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid overflow-hidden rounded-[20px] bg-[#F3F9FC] lg:grid-cols-2"
        >
          {/* Imagen - PLACEHOLDER */}
          <div className="relative min-h-[240px] lg:min-h-[390px]">
            <Image
              src="/productos/ceremonia/argentina-bonaerense.jpg"
              alt="Confección de banderas en el taller de Banderas MDP"
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute right-3 top-3 rounded-md bg-brand-text-primary/45 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
              Imagen de muestra · reemplazar por foto real
            </span>
          </div>

          {/* Copy */}
          <div className="px-6 py-9 lg:p-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky-reflection-600">
              Somos Banderas MDP
            </p>
            <h2 className="mt-4 font-sans text-[clamp(1.875rem,3.4vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-brand-text-primary">
              Más de {YEARS_EXPERIENCE} años fabricando banderas
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-text-secondary">
              Atención personalizada y productos pensados para instituciones, empresas,
              clubes, colegios, comercios y particulares.
            </p>
            <Link
              href="/contacto"
              className="group mt-7 inline-flex items-center justify-center rounded-full border-[1.5px] border-sky-reflection-600 bg-white px-7 py-3.5 text-[15px] font-extrabold text-sky-reflection-600 transition-colors hover:bg-sky-reflection-50"
            >
              Conocé más
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
