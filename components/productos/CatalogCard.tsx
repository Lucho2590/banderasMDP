"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CatalogProduct } from "@/data/productCategories";

type Props = {
  product: CatalogProduct;
  onSelect: (product: CatalogProduct) => void;
  index: number;
};

export default function CatalogCard({ product, onSelect, index }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(product)}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.03 }}
      className="group flex flex-col text-left bg-brand-bg-primary rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-reflection-400/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-reflection-500"
    >
      <div className="relative aspect-[4/3] bg-brand-bg-secondary overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-brand-text-tertiary text-xs">
            Sin imagen
          </div>
        )}
        <span className="absolute top-2.5 left-2.5 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-sky-reflection-700 backdrop-blur-sm shadow-sm">
          {product.categoryName}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm md:text-base font-bold text-brand-text-primary leading-tight line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1.5 text-xs md:text-sm text-brand-text-secondary leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        <span className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-bg-secondary px-3 py-2 text-sm font-semibold text-sky-reflection-700 group-hover:bg-sky-reflection group-hover:text-white transition-colors">
          Ver detalle
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}
