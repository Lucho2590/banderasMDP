"use client";

import { ShoppingBag, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTopProducts } from "@/lib/useFirestore";
import ProductCard from "@/components/ProductCard";

export default function TiendaPage() {
  // Traer los 10 productos más vendidos desde Firebase
  const { topProducts, loading, error } = useTopProducts(10);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <section className="relative py-20 bg-gradient-to-br from-sky-reflection/10 via-sky-reflection/5 to-brand-bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-sky-reflection mb-6 shadow-lg shadow-glow"
            >
              <ShoppingBag className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-brand-text-primary"
            >
              Tienda Online
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-brand-text-secondary"
            >
              Descubrí nuestros productos más vendidos y elegidos por miles de clientes
            </motion.p>
          </motion.div>
        </div>
      </section> */}

      {/* Productos Más Vendidos - Destacados */}
      {!loading && topProducts.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-brand-bg-primary to-brand-bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-sol/10 border border-sol/30 rounded-full mb-6"
              >
                <TrendingUp className="h-5 w-5 text-sol" />
                <span className="text-sm font-bold text-sol">LOS MÁS ELEGIDOS</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-text-primary">
                Productos Más Vendidos
              </h2>
              <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
                Nuestros clientes ya los eligieron. Descubrí por qué son los favoritos.
              </p>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {topProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  featured={true}
                  index={index}
                />
              ))}
            </div>
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
