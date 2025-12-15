"use client";

import { ShoppingBag, TrendingUp, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTopProducts, useProducts, useCategories } from "@/lib/useFirestore";
import ProductCard from "@/components/ProductCard";
import ProductCarouselHero from "@/components/ProductCarouselHero";
import ProductCarouselNetflix from "@/components/ProductCarouselNetflix";
import { useState, useMemo } from "react";

export default function TiendaPage() {
  // Traer los top 5 productos más vendidos para el carrousel
  const { topProducts, loading: loadingTop, error: errorTop } = useTopProducts(5);

  // Traer TODOS los productos con ecommerce=true
  const { products: allProducts, loading: loadingAll, error: errorAll } = useProducts();

  // Traer categorías desde Firebase (para matchear IDs con nombres)
  const { categories: firebaseCategories, loading: loadingCategories } = useCategories();

  const loading = loadingTop || loadingAll || loadingCategories;
  const error = errorTop || errorAll;

  // Estados para búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  // Botones de categorías (hardcodeados con iconos bonitos)
  const categoryButtons = [
    { name: null, label: "Todas", },
    { name: "Argentinas", label: "Argentinas", },
    { name: "Bonaerenses", label: "Bonaerenses", },
    {name: "Banderas varias", label: "Banderas varias", },
    { name: "Varios", label: "Varios", },
    { name: "Fútbol", label: "Fútbol", },
  ];

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filtro por categoría
    if (selectedCategoryName && firebaseCategories.length > 0) {
      // Buscar el ID de la categoría seleccionada en Firebase
      const selectedCategory = firebaseCategories.find(
        (cat) => cat.name.toLowerCase() === selectedCategoryName.toLowerCase()
      );

      if (selectedCategory) {
        // Filtrar productos que tengan este ID de categoría
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

    return filtered;
  }, [allProducts, selectedCategoryName, searchTerm, firebaseCategories]);

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
      {!loadingTop && topProducts.length > 0 && (
        <>
          <ProductCarouselNetflix products={topProducts} />
        </>
      )}

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

            {/* Filtros por categoría */}
            {/* Mobile: Dropdown mejorado */}
            <div className="md:hidden mb-8">
              <label className="block text-sm font-semibold text-brand-text-secondary mb-2 px-1">
                Filtrar por categoría
              </label>
              <div className="relative">
                <select
                  value={selectedCategoryName || ""}
                  onChange={(e) => setSelectedCategoryName(e.target.value || null)}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-brand-border focus:border-sky-reflection focus:outline-none text-brand-text-primary bg-white font-semibold shadow-md hover:shadow-lg transition-all appearance-none cursor-pointer"
                >
                  {categoryButtons.map((category) => (
                    <option key={category.name || "all"} value={category.name || ""}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-brand-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop: Botones mejorados */}
            <div className="hidden md:flex flex-wrap justify-center gap-3 lg:gap-4 mb-12">
              {categoryButtons.map((category) => (
                <motion.button
                  key={category.name || "all"}
                  onClick={() => setSelectedCategoryName(category.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center space-x-2 ${
                    selectedCategoryName === category.name
                      ? "bg-gradient-to-r from-sky-reflection to-sky-reflection-600 text-white scale-105"
                      : "bg-white text-brand-text-primary hover:bg-gradient-to-br hover:from-brand-bg-secondary hover:to-brand-bg-tertiary border-2 border-brand-border hover:border-sky-reflection/30"
                  }`}
                >
                  <span className="text-sm lg:text-base">{category.label}</span>
                </motion.button>
              ))}
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

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 p-3">
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
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategoryName(null);
                  }}
                  className="px-6 py-3 bg-sky-reflection text-white rounded-xl hover:bg-sky-reflection-600 transition-all font-semibold"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <section className="py-24 bg-brand-bg-secondary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-sky-reflection border-t-transparent"></div>
            <p className="mt-4 text-brand-text-secondary">Cargando productos destacados...</p>
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
