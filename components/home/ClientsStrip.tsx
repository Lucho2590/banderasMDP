"use client";

import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Tira "Confían en nosotros" — carrusel infinito de logos.
 *
 * NOTA: los logos son PLACEHOLDERS. Reemplazar cada celda por el logo real del
 * cliente (municipio, colegio, club o empresa), por ejemplo con <Image />.
 */
const PLACEHOLDER_COUNT = 12;
const logos = Array.from({ length: PLACEHOLDER_COUNT });

function LogoCard({ index }: { index: number }) {
  return (
    <div className="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-sm flex items-center justify-center border border-brand-border hover:shadow-lg transition-shadow group">
      <div className="text-center">
        <div className="w-32 h-20 bg-brand-bg-secondary rounded-lg flex items-center justify-center mb-2 group-hover:bg-brand-bg-tertiary transition-colors">
          <Building2 className="h-9 w-9 text-sky-reflection-500" />
        </div>
        <span className="text-xs text-brand-text-secondary font-medium">
          Cliente {index + 1}
        </span>
      </div>
    </div>
  );
}

export default function ClientsStrip() {
  return (
    <section id="clientes" className="py-20 lg:py-24 bg-brand-bg-primary overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text-primary">
            Confían en nosotros
          </h2>
          <p className="mt-3 text-lg text-brand-text-secondary max-w-2xl mx-auto">
            Municipios, colegios, clubes y empresas que eligen nuestra calidad.
          </p>
        </motion.div>
      </div>

      {/* Carrusel infinito */}
      <div className="relative">
        {/* Fades laterales */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-brand-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-brand-bg-primary to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 md:gap-12 w-max"
        >
          {logos.map((_, index) => (
            <LogoCard key={`logo-a-${index}`} index={index} />
          ))}
          {/* Copia duplicada para loop continuo */}
          {logos.map((_, index) => (
            <LogoCard key={`logo-b-${index}`} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
