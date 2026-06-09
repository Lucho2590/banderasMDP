"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, MessageCircle, ArrowRight, PackageSearch } from "lucide-react";
import {
  productCategories,
  catalogProducts,
  type CatalogProduct,
} from "@/data/productCategories";
import CatalogFilters, {
  type FilterGroup,
  type Facets,
  type Selected,
} from "@/components/productos/CatalogFilters";
import CatalogCard from "@/components/productos/CatalogCard";
import ProductDetailModal from "@/components/productos/ProductDetailModal";

const WHATSAPP_PHONE = "542235416600";
const FILTER_GROUPS: FilterGroup[] = ["tipo", "material", "uso", "tamano"];

function emptySelected(): Selected {
  return { tipo: new Set(), material: new Set(), uso: new Set(), tamano: new Set() };
}

export default function ProductosPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selected>(emptySelected);
  const [activeProduct, setActiveProduct] = useState<CatalogProduct | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Deep-link: /productos#<categorySlug> preselecciona el tipo (links de la home)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && productCategories.some((c) => c.slug === hash)) {
      setSelected((prev) => ({ ...prev, tipo: new Set([hash]) }));
    }
  }, []);

  // Construcción de facetas con conteos
  const facets = useMemo<Facets>(() => {
    const countBy = (getValues: (p: CatalogProduct) => string[] | undefined) => {
      const map = new Map<string, number>();
      for (const p of catalogProducts) {
        for (const v of getValues(p) ?? []) {
          map.set(v, (map.get(v) ?? 0) + 1);
        }
      }
      return map;
    };

    const materialCounts = countBy((p) => p.material);
    const usoCounts = countBy((p) => p.uso);
    const tamanoCounts = countBy((p) => p.tamano);

    const sortByCount = (m: Map<string, number>) =>
      [...m.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([value, count]) => ({ value, label: value, count }));

    return {
      tipo: productCategories.map((c) => ({
        value: c.slug,
        label: c.name,
        count: c.items.length,
      })),
      material: sortByCount(materialCounts),
      uso: ["Interior", "Exterior"]
        .filter((v) => usoCounts.has(v))
        .map((v) => ({ value: v, label: v, count: usoCounts.get(v) ?? 0 })),
      tamano: ["Estándar", "A medida"]
        .filter((v) => tamanoCounts.has(v))
        .map((v) => ({ value: v, label: v, count: tamanoCounts.get(v) ?? 0 })),
    };
  }, []);

  const activeCount = FILTER_GROUPS.reduce((sum, g) => sum + selected[g].size, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogProducts.filter((p) => {
      if (q) {
        const haystack = [p.name, p.description, p.categoryName, ...(p.material ?? [])]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (selected.tipo.size && !selected.tipo.has(p.categorySlug)) return false;
      if (selected.material.size && !p.material?.some((m) => selected.material.has(m))) return false;
      if (selected.uso.size && !p.uso?.some((u) => selected.uso.has(u))) return false;
      if (selected.tamano.size && !p.tamano?.some((t) => selected.tamano.has(t))) return false;
      return true;
    });
  }, [query, selected]);

  const handleToggle = useCallback((group: FilterGroup, value: string) => {
    setSelected((prev) => {
      const next = new Set(prev[group]);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return { ...prev, [group]: next };
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelected(emptySelected());
    setQuery("");
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero compacto */}
      <section className="bg-gradient-baltic">
        <div className="container mx-auto px-4 lg:px-8 py-14 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white">Catálogo de productos</h1>
            <p className="mt-3 text-base md:text-lg text-white/80">
              Banderas, mástiles, estandartes y accesorios. Fabricación propia con calidad
              reglamentaria. Buscá y filtrá para encontrar lo que necesitás.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-brand-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar de filtros (desktop) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <CatalogFilters
                  facets={facets}
                  selected={selected}
                  onToggle={handleToggle}
                  onClear={handleClear}
                  activeCount={activeCount}
                />
              </div>
            </aside>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
              {/* Barra de búsqueda + acciones */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-tertiary" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full rounded-xl border border-brand-border bg-white pl-11 pr-4 py-3 text-sm text-brand-text-primary placeholder:text-brand-text-tertiary focus:outline-none focus:ring-2 focus:ring-sky-reflection-500 focus:border-sky-reflection-500 transition-shadow"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-semibold text-brand-text-primary"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  Filtros
                  {activeCount > 0 && (
                    <span className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-reflection text-xs text-white">
                      {activeCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Conteo de resultados */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-brand-text-secondary">
                  <span className="font-bold text-brand-text-primary">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "producto" : "productos"}
                </p>
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-sky-reflection-600 hover:text-sky-reflection-700"
                  >
                    <X className="h-3.5 w-3.5" />
                    Limpiar filtros
                  </button>
                )}
              </div>

              {/* Grilla */}
              {filtered.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((product, index) => (
                      <CatalogCard
                        key={product.id}
                        product={product}
                        onSelect={setActiveProduct}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-brand-border rounded-2xl">
                  <PackageSearch className="h-12 w-12 text-brand-text-tertiary mb-4" />
                  <p className="text-lg font-semibold text-brand-text-primary mb-1">
                    No encontramos productos
                  </p>
                  <p className="text-sm text-brand-text-secondary mb-6 max-w-sm">
                    Probá con otra búsqueda o quitá algunos filtros.
                  </p>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-reflection text-white rounded-xl text-sm font-semibold hover:bg-sky-reflection-hover transition-colors"
                  >
                    Limpiar todo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-brand-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <p className="text-lg md:text-xl text-brand-text-primary font-semibold mb-3">
            ¿No encontrás lo que buscás?
          </p>
          <p className="text-brand-text-secondary mb-8">
            Trabajamos también productos a medida y diseños personalizados. Escribinos y te
            asesoramos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hola! Quería consultar por un producto personalizado.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-success text-white rounded-xl hover:bg-success-hover hover:shadow-lg transition-all font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sky-reflection text-white rounded-xl hover:bg-sky-reflection-hover hover:shadow-lg transition-all font-semibold"
            >
              Pedir presupuesto
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Drawer de filtros (mobile) */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-brand-bg-primary shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-brand-border sticky top-0 bg-brand-bg-primary">
                <span className="font-bold text-brand-text-primary">Filtros</span>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-bg-secondary"
                  aria-label="Cerrar filtros"
                >
                  <X className="h-5 w-5 text-brand-text-secondary" />
                </button>
              </div>
              <div className="p-5">
                <CatalogFilters
                  facets={facets}
                  selected={selected}
                  onToggle={handleToggle}
                  onClear={handleClear}
                  activeCount={activeCount}
                />
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="mt-8 w-full px-5 py-3 bg-sky-reflection text-white rounded-xl font-semibold"
                >
                  Ver {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de detalle */}
      <ProductDetailModal product={activeProduct} onClose={() => setActiveProduct(null)} />
    </div>
  );
}
