"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Galería "Trabajos realizados".
 *
 * NOTA DE IMÁGENES: las fotos son PLACEHOLDERS (imágenes de producto existentes).
 * Reemplazar cada `image` por una FOTO REAL del trabajo terminado/instalado y
 * actualizar `title` con el cliente o tipo de proyecto.
 */
const projects = [
  { title: "Banderas de flameo institucionales", image: "/productos/flameo/institucionales.jpg" },
  { title: "Banderas de ceremonia para escuelas", image: "/productos/ceremonia/argentina-bonaerense.jpg" },
  { title: "Estandartes y banners para eventos", image: "/productos/estandartes/estandartes.jpg" },
  { title: "Astas y mástiles a medida", image: "/productos/astas/hierro.jpg" },
  { title: "Banderas deportivas personalizadas", image: "/productos/flameo/deportivas.jpg" },
  { title: "Señalética y banderas de obra", image: "/productos/flameo/senializacion.jpg" },
];

export default function ProjectsGallery() {
  return (
    <section className="py-20 lg:py-28 bg-brand-bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text-primary">
            Trabajos realizados
          </h2>
          <p className="mt-3 text-lg text-brand-text-secondary">
            Casos reales de empresas, municipios e instituciones que confían en nuestra fabricación.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project, index) => (
            <motion.figure
              key={project.title}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-primary shadow-sm hover:shadow-lg transition-shadow"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Marcador de placeholder (quitar al cargar foto real) */}
              <span className="absolute top-2 right-2 z-10 rounded bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                muestra
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-text-primary/85 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold text-white">
                {project.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
