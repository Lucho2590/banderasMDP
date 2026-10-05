"use client";

import { Truck, ShieldCheck, Factory, Award } from "lucide-react";
import { motion } from "framer-motion";
import { YEARS_EXPERIENCE } from "@/lib/contact";

/**
 * Franja de beneficios sobre fondo celeste claro.
 * Reemplaza a la vieja `TrustBar` (5 ítems, otra posición en la home).
 */
const items = [
  { icon: Truck, label: "Envíos a todo el país" },
  { icon: ShieldCheck, label: "Compra segura" },
  { icon: Factory, label: "Fabricación propia" },
  { icon: Award, label: `Más de ${YEARS_EXPERIENCE} años de experiencia` },
];

/**
 * Divisores: 2x2 en mobile (derecha en la columna izquierda, abajo en la fila
 * de arriba) y una sola fila de 4 en desktop (derecha salvo el último).
 */
const dividers = [
  "border-r border-b lg:border-b-0",
  "border-b lg:border-b-0 lg:border-r",
  "border-r",
  "",
];

export default function Benefits() {
  return (
    <section className="bg-brand-bg-tertiary">
      <div className="container mx-auto px-4 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 lg:py-10">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`flex flex-col items-center gap-2.5 border-brand-border-dark px-3 py-6 text-center lg:px-6 lg:py-2 ${dividers[index]}`}
              >
                <Icon className="h-7 w-7 text-sky-reflection-600" strokeWidth={1.5} />
                <span className="text-sm font-bold leading-snug text-brand-text-primary">
                  {item.label}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
