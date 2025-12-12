"use client";

import Link from "next/link";
import { ArrowRight, Award, Palette, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background - Gradiente celeste mejorado */}
        <div className="absolute inset-0 gradient-celeste-blanco"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        {/* Elementos decorativos flotantes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect border border-white/30 mb-8"
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Líderes en Mar del Plata</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
            >
              Banderas MDP
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 max-w-3xl mx-auto font-light drop-shadow-lg"
            >
              Fabricamos banderas y productos personalizados de la más alta calidad
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            >
              Desde banderas institucionales hasta diseños únicos. Materiales premium importados y nacionales. Servicio al cliente excepcional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                href="/productos"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-sol text-white rounded-xl hover:bg-sol-hover transition-all shadow-xl hover:shadow-2xl hover:scale-105 font-semibold text-lg overflow-hidden shadow-glow-sol"
              >
                <span className="relative z-10 flex items-center">
                  Ver Productos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center px-8 py-4 glass-effect text-white border-2 border-white/40 rounded-xl hover:bg-white/25 hover:border-white/60 transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contactanos
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              {[
                { number: "15+", label: "Años de experiencia" },
                { number: "500+", label: "Clientes satisfechos" },
                { number: "100%", label: "Calidad garantizada" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="glass-effect rounded-2xl p-6 border border-white/30">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator mejorado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white transition-colors"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-gradient-to-b from-brand-bg-primary to-brand-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-text-primary">¿Por qué elegirnos?</h2>
            <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
              Comprometidos con la excelencia en cada proyecto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Award,
                title: "Calidad Garantizada",
                description: "Trabajamos con materiales importados y nacionales de primera línea. Cada bandera pasa por rigurosos controles de calidad. Garantía total en todos nuestros productos.",
                delay: 0.1,
              },
              {
                icon: Palette,
                title: "Diseño Sin Límites",
                description: "Tu idea, nuestra realidad. Desde logos corporativos hasta diseños creativos complejos. Asesoramiento de diseño incluido sin costo adicional.",
                delay: 0.2,
              },
              {
                icon: Users,
                title: "Experiencia Comprobada",
                description: "Más de 15 años sirviendo a empresas, instituciones y particulares de Mar del Plata y la región. Clientes satisfechos que vuelven y nos recomiendan.",
                delay: 0.3,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-sky-reflection/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative bg-brand-bg-primary border border-brand-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-xl bg-sky-reflection flex items-center justify-center mb-6 shadow-md group-hover:shadow-glow transition-shadow"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-brand-text-primary group-hover:text-sky-reflection-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-brand-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banner de Promoción */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-promo"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        {/* Elementos decorativos */}
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass-effect-dark rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-sol rounded-full mb-6 shadow-glow-sol"
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold text-white">OFERTA ESPECIAL</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                  >
                    20% OFF
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-white/90 mb-6"
                  >
                    En banderas personalizadas este mes
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href="/contacto"
                      className="group inline-flex items-center justify-center px-8 py-4 bg-white text-sky-reflection-700 rounded-xl hover:bg-sky-reflection-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 font-bold text-lg"
                    >
                      Consultar ahora
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="hidden md:flex items-center justify-center"
                >
                  <div className="relative">
                    {/* Aquí puedes poner una imagen/GIF desde Firebase */}
                    {/* Para demo, usamos el diseño actual */}
                    {/* Reemplaza este bloque con: <img src={promoImage} alt="Promoción" className="rounded-3xl shadow-2xl" /> */}
                    <motion.div
                      animate={{
                        rotate: [0, 5, 0, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-64 h-64 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden relative"
                    >
                      {/* Placeholder para imagen - reemplazar con <img> cuando tengas Firebase */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-reflection-400/40 to-sol/40"></div>
                      <div className="text-center relative z-10">
                        <div className="text-7xl font-bold text-white mb-2">20%</div>
                        <div className="text-xl text-white/90 font-semibold">DESCUENTO</div>
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -top-4 -right-4 w-16 h-16 bg-sol rounded-full flex items-center justify-center shadow-lg shadow-glow-sol"
                    >
                      <Sparkles className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clientes Section */}
      <section className="py-24 bg-brand-bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-text-primary">
              Confían en nosotros
            </h2>
            <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
              Empresas e instituciones que eligen nuestra calidad y servicio
            </p>
          </motion.div>

          {/* Carousel infinito de logos */}
          <div className="relative">
            {/* Gradiente fade izquierdo */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-bg-secondary to-transparent z-10"></div>
            {/* Gradiente fade derecho */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-bg-secondary to-transparent z-10"></div>

            <div className="flex overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex gap-12 items-center"
              >
                {/* Primera ronda de logos */}
                {[...Array(12)].map((_, index) => (
                  <div
                    key={`logo-1-${index}`}
                    className="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-md flex items-center justify-center border border-brand-border hover:shadow-xl transition-shadow group"
                  >
                    <div className="text-center">
                      <div className="w-32 h-20 bg-gradient-to-br from-sky-reflection/10 to-sky-reflection/5 rounded-lg flex items-center justify-center mb-2 group-hover:from-sky-reflection/20 group-hover:to-sky-reflection/10 transition-colors">
                        {/* Placeholder para logo - reemplazar con <img> cuando tengas Firebase */}
                        <CheckCircle2 className="h-10 w-10 text-sky-reflection" />
                      </div>
                      <span className="text-xs text-brand-text-secondary font-medium">
                        Cliente {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Segunda ronda de logos (duplicado para efecto infinito) */}
                {[...Array(12)].map((_, index) => (
                  <div
                    key={`logo-2-${index}`}
                    className="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-md flex items-center justify-center border border-brand-border hover:shadow-xl transition-shadow group"
                  >
                    <div className="text-center">
                      <div className="w-32 h-20 bg-gradient-to-br from-sky-reflection/10 to-sky-reflection/5 rounded-lg flex items-center justify-center mb-2 group-hover:from-sky-reflection/20 group-hover:to-sky-reflection/10 transition-colors">
                        <CheckCircle2 className="h-10 w-10 text-sky-reflection" />
                      </div>
                      <span className="text-xs text-brand-text-secondary font-medium">
                        Cliente {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-24 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Llevá tu marca al siguiente nivel
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/90 mb-8"
            >
              Presupuesto sin cargo en 24 horas. Asesoramiento profesional incluido. Entrega rápida en Mar del Plata y alrededores.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/contacto"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-bg-primary text-brand-accent rounded-xl hover:bg-brand-bg-secondary transition-all shadow-xl hover:shadow-2xl hover:scale-105 font-semibold text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Solicitar Presupuesto
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent-500/0 via-brand-accent-500/10 to-brand-accent-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}

