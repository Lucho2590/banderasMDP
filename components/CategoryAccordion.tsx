"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Ruler, Tag } from "lucide-react";
import type { ProductCategory } from "@/data/productCategories";

const WHATSAPP_PHONE = "542235416600";

function buildWhatsAppLink(categoryName: string, itemName: string) {
  const text = `Hola! Quería consultar por ${itemName} (${categoryName}).`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

type Props = {
  category: ProductCategory;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  id?: string;
};

export default function CategoryAccordion({ category, isOpen, onToggle, index, id }: Props) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative scroll-mt-24"
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-2xl blur-xl transition-opacity duration-500 ${
          isOpen ? "opacity-25" : "opacity-0 group-hover:opacity-15"
        }`}
      />

      <div className="relative bg-brand-bg-primary border border-brand-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow">
        {/* Header (clickable) */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full text-left flex flex-col sm:flex-row sm:items-stretch focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-reflection-500"
        >
          {/* Image */}
          <div className={`relative w-full sm:w-72 aspect-[16/10] sm:aspect-auto sm:min-h-[180px] flex-shrink-0 bg-gradient-to-br ${category.gradient} overflow-hidden`}>
            <Image
              src={category.heroImage}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, 288px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>

          {/* Title + tagline + chevron */}
          <div className="flex-1 p-6 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-2 group-hover:text-sky-reflection-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-brand-text-secondary text-sm md:text-base">{category.tagline}</p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-sky-reflection-600">
                <span className="px-2.5 py-1 rounded-full bg-sky-reflection-500/10 border border-sky-reflection-500/20">
                  {category.items.length} {category.items.length === 1 ? "producto" : "productos"}
                </span>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-reflection-500/10 border border-sky-reflection-500/20 flex items-center justify-center"
            >
              <ChevronDown className="h-5 w-5 text-sky-reflection-600" />
            </motion.div>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden border-t border-brand-border"
            >
              <div className="p-4 md:p-8 bg-brand-bg-secondary/40">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  {category.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="group/item flex flex-col bg-brand-bg-primary rounded-xl border border-brand-border overflow-hidden hover:border-sky-reflection-500/40 hover:shadow-lg transition-all"
                    >
                      {item.imageUrl && (
                        <div className="relative aspect-[4/3] bg-brand-bg-secondary overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                          />
                        </div>
                      )}

                      <div className="p-3 md:p-4 flex flex-col flex-1">
                        <h4 className="text-sm md:text-base font-bold text-brand-text-primary mb-1.5 leading-tight">
                          {item.name}
                        </h4>

                        {item.description && (
                          <p className="text-xs md:text-sm text-brand-text-secondary leading-relaxed mb-3">
                            {item.description}
                          </p>
                        )}

                        {item.variants && item.variants.length > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-secondary mb-1.5">
                              <Tag className="h-3.5 w-3.5" />
                              Variantes
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.variants.map((v) => (
                                <span
                                  key={v}
                                  className="px-2 py-0.5 text-xs rounded-md bg-sky-reflection-500/10 text-sky-reflection-700 border border-sky-reflection-500/20"
                                >
                                  {v}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.sizes && item.sizes.length > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-secondary mb-1.5">
                              <Ruler className="h-3.5 w-3.5" />
                              Medidas
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.sizes.map((s) => (
                                <span
                                  key={s}
                                  className="px-2 py-0.5 text-xs rounded-md bg-amber-500/10 text-amber-700 border border-amber-500/20"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.notes && (
                          <p className="text-xs text-brand-text-secondary italic mb-3">
                            {item.notes}
                          </p>
                        )}

                        <a
                          href={buildWhatsAppLink(category.name, item.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex items-center justify-center gap-1.5 px-2.5 py-2 bg-sky-reflection text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-sky-reflection-600 hover:shadow-md transition-all"
                        >
                          <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          Consultar
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
