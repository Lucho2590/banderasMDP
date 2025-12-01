"use client";

import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductosPage() {
  const productos = [
    { id: 1, nombre: "Banderas Nacionales", categoria: "Banderas Oficiales", color: "from-blue-500 to-blue-600" },
    { id: 2, nombre: "Banderas Personalizadas", categoria: "Diseño Custom", color: "from-purple-500 to-pink-600" },
    { id: 3, nombre: "Banderas Publicitarias", categoria: "Marketing", color: "from-orange-500 to-red-600" },
    { id: 4, nombre: "Mástiles y Accesorios", categoria: "Equipamiento", color: "from-gray-600 to-gray-700" },
    { id: 5, nombre: "Banderas Deportivas", categoria: "Deportes", color: "from-green-500 to-emerald-600" },
    { id: 6, nombre: "Banderas Institucionales", categoria: "Empresas", color: "from-brand-accent-600 to-brand-accent-700" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-accent/10 via-brand-accent/5 to-brand-bg-secondary overflow-hidden">
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-accent mb-6 shadow-lg"
            >
              <ShoppingBag className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-brand-text-primary"
            >
              Nuestros Productos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-brand-text-secondary"
            >
              Descubrí nuestra amplia variedad de banderas y productos personalizados de la más alta calidad
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Productos Grid */}
      <section className="py-20 bg-brand-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto, index) => (
              <motion.div
                key={producto.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent-500 to-brand-accent-700 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-brand-bg-primary border border-brand-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow"
                >
                  {/* Image Placeholder */}
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${producto.color} overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-center"
                      >
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <ShoppingBag className="h-12 w-12 text-white" />
                        </div>
                        <span className="text-sm text-white font-medium">Imagen del producto</span>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="absolute top-4 right-4"
                    >
                      <span className="px-3 py-1 glass-effect text-white text-xs font-semibold rounded-full border border-white/30 shadow-lg">
                        {producto.categoria}
                      </span>
                    </motion.div>

                    {/* Quick view button on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <button className="px-6 py-3 bg-white text-brand-accent rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                        Vista Rápida
                      </button>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors text-brand-text-primary">
                      {producto.nombre}
                    </h3>
                    <p className="text-brand-text-secondary text-sm mb-6 line-clamp-2">
                      Descripción detallada del producto aparecerá aquí con todas las características y especificaciones.
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                      <div>
                        <div className="text-2xl font-bold text-brand-accent">Consultar</div>
                        <div className="text-xs text-brand-text-secondary">Precio</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group/btn relative flex items-center space-x-2 px-5 py-2.5 bg-brand-accent text-white rounded-xl hover:bg-brand-accent-hover shadow-md hover:shadow-xl transition-all font-semibold overflow-hidden"
                      >
                        <span className="relative z-10">Ver más</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-lg text-brand-text-secondary mb-6">
            ¿No encontrás lo que buscás?
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent-hover hover:shadow-lg hover:scale-105 transition-all font-semibold"
          >
            <span>Contactanos para un presupuesto personalizado</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

