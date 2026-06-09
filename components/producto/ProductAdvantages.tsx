"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  items: string[];
};

export default function ProductAdvantages({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-6">Ventajas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-bg-primary p-5 shadow-sm"
          >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
              <Check className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-brand-text-primary leading-snug">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
