"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Hammer,
  ShieldCheck,
  Pencil,
  Heart,
  Sparkles,
} from "lucide-react";
import { productCategories } from "@/data/productCategories";
import CategoryAccordion from "@/components/CategoryAccordion";

const WHATSAPP_PHONE = "542235416600";

const trustItems = [
  { icon: Hammer, label: "Fabricación propia" },
  { icon: ShieldCheck, label: "Banderas reglamentarias" },
  { icon: Pencil, label: "Diseños a medida" },
  { icon: Heart, label: "Atención personalizada" },
];

export default function ProductosPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(productCategories[0]?.slug ?? null);

  const handleToggle = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  const scrollToCategory = (slug: string) => {
    setOpenSlug(slug);
    setTimeout(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-14 md:pt-20 md:pb-16 bg-gradient-to-br from-sky-reflection/10 via-sky-reflection/5 to-brand-bg-secondary overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        {/* Floating blobs */}
        <motion.div
          aria-hidden
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-sky-reflection-500/20 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl"
          animate={{ y: [0, -25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-reflection-500/10 border border-sky-reflection-500/20 text-sky-reflection-700 text-xs font-bold tracking-wider mb-5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              CATÁLOGO COMPLETO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-brand-text-primary"
            >
              Nuestros Productos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-brand-text-secondary max-w-2xl mx-auto"
            >
              Banderas, mástiles, estandartes y accesorios. Fabricación propia con calidad reglamentaria.
            </motion.p>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 md:mt-10 max-w-3xl mx-auto">
              {trustItems.map((trust, i) => {
                const Icon = trust.icon;
                return (
                  <motion.div
                    key={trust.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="glass-effect rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 text-center"
                  >
                    <div className="w-9 h-9 rounded-lg bg-sky-reflection-500/15 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-sky-reflection-700" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-brand-text-primary leading-tight">
                      {trust.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick-nav chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 md:mt-10"
            >
              <div className="text-xs uppercase tracking-wider text-brand-text-secondary font-semibold mb-3">
                Ir a categoría
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {productCategories.map((category) => {
                  const isActive = openSlug === category.slug;
                  return (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => scrollToCategory(category.slug)}
                      className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold border transition-all ${
                        isActive
                          ? "bg-sky-reflection text-white border-sky-reflection shadow-md shadow-sky-reflection-500/30"
                          : "bg-white/80 text-brand-text-primary border-sky-reflection-500/30 hover:bg-sky-reflection-500/10 hover:border-sky-reflection-500/50"
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accordion list */}
      <section className="py-16 md:py-20 bg-brand-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {productCategories.map((category, index) => (
              <CategoryAccordion
                key={category.slug}
                id={category.slug}
                category={category}
                isOpen={openSlug === category.slug}
                onToggle={() => handleToggle(category.slug)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <p className="text-lg md:text-xl text-brand-text-primary font-semibold mb-3">
            ¿No encontrás lo que buscás?
          </p>
          <p className="text-brand-text-secondary mb-8">
            Trabajamos también productos a medida y diseños personalizados. Escribinos y te asesoramos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hola! Quería consultar por un producto personalizado.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:scale-105 transition-all font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sky-reflection text-white rounded-xl hover:bg-sky-reflection-600 hover:shadow-lg hover:scale-105 transition-all font-semibold"
            >
              Pedir presupuesto
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
