"use client";

import { Search, X, ChevronDown, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTopProducts, useProducts, useCategories } from "@/lib/useFirestore";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton, { CarouselSkeleton } from "@/components/ProductCardSkeleton";
import ProductCarouselNetflix from "@/components/ProductCarouselNetflix";
import { useState, useMemo, useEffect } from "react";
import { trackPageView, trackSearch, trackSelectCategory } from "@/lib/analytics";
import { trackSearchQuery } from "@/lib/analyticsHelpers";
import { TProduct } from "@/types/product";

// Opciones de ordenamiento
type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'best_sellers' | 'newest';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'best_sellers', label: 'Más vendidos' },
  { value: 'newest', label: 'Más nuevos' },
];

// Función para obtener el precio numérico de un producto
function getProductPrice(product: TProduct): number {
  if (product.hasVariants && product.variants.length > 0) {
    const price = product.variants[0].price;
    return typeof price === 'number' ? price : parseFloat(price) || 0;
  }
  return typeof product.price === 'number' ? product.price : parseFloat(product.price as string) || 0;
}

export default function TiendaPage() {
  // Traer los top 5 productos más vendidos para el carrousel
  const { topProducts, loading: loadingTop, error: errorTop } = useTopProducts(5);

  // Traer TODOS los productos con ecommerce=true
  const { products: allProducts, loading: loadingAll, error: errorAll } = useProducts();

  // Traer categorías desde Firebase (para matchear IDs con nombres)
  const { categories: firebaseCategories, loading: loadingCategories } = useCategories();

  const loading = loadingTop || loadingAll || loadingCategories;
  const error = errorTop || errorAll;

  // Estados para búsqueda, filtros y ordenamiento
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Calcular cantidad de productos por categoría
  const categoryProductCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };

    firebaseCategories.forEach(category => {
      const count = allProducts.filter(product =>
        product.categories && product.categories.includes(category.id)
      ).length;
      counts[category.name.toLowerCase()] = count;
    });

    return counts;
  }, [allProducts, firebaseCategories]);

  // Botones de categorías con contadores
  const categoryButtons = [
    { name: null, label: "Todas" },
    { name: "Argentinas", label: "Argentinas" },
    { name: "Bonaerenses", label: "Bonaerenses" },
    { name: "Banderas varias", label: "Banderas varias" },
    { name: "Varios", label: "Varios" },
    { name: "Fútbol", label: "Fútbol" },
  ];

  // Helper para obtener el contador de una categoría
  const getCategoryCount = (categoryName: string | null): number => {
    if (categoryName === null) return categoryProductCounts.all || 0;
    return categoryProductCounts[categoryName.toLowerCase()] || 0;
  };

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filtro por categoría
    if (selectedCategoryName && firebaseCategories.length > 0) {
      const selectedCategory = firebaseCategories.find(
        (cat) => cat.name.toLowerCase() === selectedCategoryName.toLowerCase()
      );

      if (selectedCategory) {
        filtered = filtered.filter((product) => {
          if (!product.categories || product.categories.length === 0) {
            return false;
          }
          return product.categories.includes(selectedCategory.id);
        });
      }
    }

    // Filtro por búsqueda
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search) ||
        (product.description && product.description.toLowerCase().includes(search))
      );
    }

    // Ordenamiento
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => getProductPrice(a) - getProductPrice(b));
        break;
      case 'price_desc':
        filtered.sort((a, b) => getProductPrice(b) - getProductPrice(a));
        break;
      case 'best_sellers':
        filtered.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'relevance':
      default:
        // Mantener el orden original (por relevancia/default de Firebase)
        break;
    }

    return filtered;
  }, [allProducts, selectedCategoryName, searchTerm, firebaseCategories, sortBy]);

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategoryName(null);
    setSortBy('relevance');
  };

  // ==========================================
  // ANALYTICS TRACKING
  // ==========================================

  // Track page view al cargar la tienda
  useEffect(() => {
    trackPageView("/tienda", "Tienda - Banderas MDP");
  }, []);

  // Track búsqueda (con debounce de 1 segundo)
  useEffect(() => {
    if (!searchTerm.trim()) return;

    const timer = setTimeout(() => {
      // Firebase Analytics
      trackSearch(searchTerm, filteredProducts.length);

      // Firestore Analytics para dashboard
      trackSearchQuery(searchTerm, filteredProducts.length, "tienda");
    }, 1000); // Esperar 1 segundo después de que el usuario deje de escribir

    return () => clearTimeout(timer);
  }, [searchTerm, filteredProducts.length]);

  // Track selección de categoría
  useEffect(() => {
    if (selectedCategoryName) {
      const selectedCategory = firebaseCategories.find(
        (cat) => cat.name.toLowerCase() === selectedCategoryName.toLowerCase()
      );
      trackSelectCategory(selectedCategoryName, selectedCategory?.id);
    }
  }, [selectedCategoryName, firebaseCategories]);

  return (
    <div className="min-h-screen">
      {/* OPCIÓN 2: Hero con imagen de fondo
      {!loadingTop && topProducts.length > 0 && (
        <>
          <div className="bg-brand-bg-secondary py-3 text-center">
            <p className="text-sm font-semibold text-brand-text-secondary">OPCIÓN 2: Hero con Imagen de Fondo</p>
          </div>
          <ProductCarouselHero products={topProducts} />
        </>
      )} */}

      {/* OPCIÓN 3: Estilo Netflix (scroll horizontal) */}
      {loadingTop ? (
        <section className="py-8 md:py-12 bg-gradient-to-br from-charcoal-blue to-charcoal-blue/90 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center space-x-3 mb-6 md:mb-8">
              <div>
                <div className="h-8 md:h-10 bg-white/20 rounded-lg w-64 mb-2 animate-pulse" />
                <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
              </div>
            </div>
            <CarouselSkeleton count={4} />
          </div>
        </section>
      ) : topProducts.length > 0 ? (
        <ProductCarouselNetflix products={topProducts} />
      ) : null}

      {/* Barra de Búsqueda y Filtros */}
      {!loadingAll && allProducts.length > 0 && (
        <section className="py-8 md:py-12 bg-gradient-to-b from-brand-bg-primary to-brand-bg-secondary">
          <div className="container mx-auto px-3 md:px-4 lg:px-8">
            {/* Barra de búsqueda */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8">
              <div className="relative">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-brand-text-tertiary" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 rounded-xl border-2 border-brand-border focus:border-sky-reflection focus:outline-none text-sm md:text-base text-brand-text-primary placeholder:text-brand-text-tertiary transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-tertiary hover:text-brand-text-primary transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile: Filtros y ordenamiento */}
            <div className="md:hidden space-y-4 mb-6">
              {/* Filtro por categoría */}
              <div>
                <label className="block text-sm font-semibold text-brand-text-secondary mb-2 px-1">
                  Filtrar por categoría
                </label>
                <div className="relative">
                  <select
                    value={selectedCategoryName || ""}
                    onChange={(e) => setSelectedCategoryName(e.target.value || null)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-brand-border focus:border-sky-reflection focus:outline-none text-brand-text-primary bg-white font-semibold shadow-md hover:shadow-lg transition-all appearance-none cursor-pointer text-sm"
                  >
                    {categoryButtons.map((category) => (
                      <option key={category.name || "all"} value={category.name || ""}>
                        {category.label} ({getCategoryCount(category.name)})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-tertiary pointer-events-none" />
                </div>
              </div>

              {/* Ordenamiento móvil */}
              <div>
                <label className="block text-sm font-semibold text-brand-text-secondary mb-2 px-1">
                  Ordenar por
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-brand-border focus:border-sky-reflection focus:outline-none text-brand-text-primary bg-white font-semibold shadow-md hover:shadow-lg transition-all appearance-none cursor-pointer text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-tertiary pointer-events-none" />
                </div>
              </div>

              {/* Indicador de filtros activos (mobile) */}
              {(selectedCategoryName || searchTerm || sortBy !== 'relevance') && (
                <div className="flex flex-wrap gap-2 items-center">
                  {selectedCategoryName && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-reflection/10 text-sky-reflection-600 rounded-full text-xs font-semibold">
                      {selectedCategoryName}
                      <button
                        onClick={() => setSelectedCategoryName(null)}
                        className="hover:bg-sky-reflection/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-reflection/10 text-sky-reflection-600 rounded-full text-xs font-semibold">
                      &quot;{searchTerm}&quot;
                      <button
                        onClick={() => setSearchTerm("")}
                        className="hover:bg-sky-reflection/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}
                  {sortBy !== 'relevance' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-xs font-semibold">
                      {sortOptions.find(o => o.value === sortBy)?.label}
                      <button
                        onClick={() => setSortBy('relevance')}
                        className="hover:bg-amber-500/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-brand-text-tertiary hover:text-brand-text-primary underline transition-colors"
                  >
                    Limpiar todo
                  </button>
                </div>
              )}
            </div>

            {/* Desktop: Botones de categoría con contadores */}
            <div className="hidden md:flex flex-wrap justify-center gap-3 lg:gap-4 mb-6">
              {categoryButtons.map((category) => (
                <motion.button
                  key={category.name || "all"}
                  onClick={() => setSelectedCategoryName(category.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2 ${
                    selectedCategoryName === category.name
                      ? "bg-gradient-to-r from-sky-reflection to-sky-reflection-600 text-white scale-105"
                      : "bg-white text-brand-text-primary hover:bg-gradient-to-br hover:from-brand-bg-secondary hover:to-brand-bg-tertiary border-2 border-brand-border hover:border-sky-reflection/30"
                  }`}
                >
                  <span className="text-sm lg:text-base">{category.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategoryName === category.name
                      ? "bg-white/20 text-white"
                      : "bg-brand-bg-secondary text-brand-text-secondary"
                  }`}>
                    {getCategoryCount(category.name)}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Desktop: Ordenamiento */}
            <div className="hidden md:flex justify-center mb-10">
              <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-brand-border shadow-sm">
                <ArrowUpDown className="w-4 h-4 text-brand-text-tertiary" />
                <span className="text-sm text-brand-text-secondary">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent font-semibold text-brand-text-primary focus:outline-none cursor-pointer text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Header con contador de resultados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-brand-text-primary">
                {selectedCategoryName || "Todos los Productos"}
              </h2>
              <p className="text-base md:text-lg text-brand-text-secondary">
                {filteredProducts.length} {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
              </p>
            </motion.div>

            {/* Products Grid - Responsive: 1 col (<400px), 2 cols (mobile), 3 cols (tablet), 4 cols (desktop) */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    featured={false}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-brand-text-primary mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-brand-text-secondary mb-6">
                  Intenta con otra búsqueda o categoría
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-sky-reflection text-white rounded-xl hover:bg-sky-reflection-600 transition-all font-semibold"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Loading State - Skeleton para grilla de productos */}
      {loadingAll && (
        <section className="py-8 md:py-12 bg-gradient-to-b from-brand-bg-primary to-brand-bg-secondary">
          <div className="container mx-auto px-3 md:px-4 lg:px-8">
            {/* Skeleton de barra de búsqueda */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8">
              <div className="h-12 md:h-14 bg-gray-200 rounded-xl animate-pulse" />
            </div>

            {/* Skeleton de filtros */}
            <div className="hidden md:flex flex-wrap justify-center gap-3 lg:gap-4 mb-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-11 w-28 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>

            {/* Skeleton de título */}
            <div className="text-center mb-8 md:mb-12">
              <div className="h-10 md:h-14 bg-gray-200 rounded-lg w-64 mx-auto mb-3 animate-pulse" />
              <div className="h-5 bg-gray-100 rounded w-40 mx-auto animate-pulse" />
            </div>

            {/* Skeleton de grilla de productos */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              <ProductCardSkeleton count={8} />
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-24 bg-brand-bg-secondary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-red-500">Error al cargar productos: {error.message}</p>
          </div>
        </section>
      )}
    </div>
  );
}
