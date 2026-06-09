"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutShort() {
  return (
    <section className="bg-gradient-baltic">
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Fabricación propia, calidad de punta a punta
          </h2>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Fabricamos banderas y productos personalizados para empresas, instituciones
            y eventos en todo el país. Materiales resistentes, costuras reforzadas y
            asesoramiento personalizado en cada proyecto.
          </p>
          <Link
            href="/contacto"
            className="group mt-8 inline-flex items-center justify-center px-7 py-3.5 bg-white text-sky-reflection-700 rounded-xl font-semibold text-base shadow-lg hover:bg-brand-bg-secondary transition-all"
          >
            Solicitar presupuesto
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
