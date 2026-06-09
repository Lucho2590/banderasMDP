"use client";

import { Factory, Truck, Headset, ReceiptText, Award } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Barra de confianza.
 * EDITAR: ajustar `YEARS_EXPERIENCE` al número real de años de la empresa.
 */
const YEARS_EXPERIENCE = 40;

const items = [
  { icon: Award, label: `+${YEARS_EXPERIENCE} años de experiencia` },
  { icon: Factory, label: "Fabricación propia" },
  { icon: Truck, label: "Envíos a todo Argentina" },
  { icon: Headset, label: "Atención personalizada" },
  { icon: ReceiptText, label: "Factura A" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-brand-border bg-brand-bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 py-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-bg-tertiary text-sky-reflection-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-brand-text-primary leading-tight">
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
