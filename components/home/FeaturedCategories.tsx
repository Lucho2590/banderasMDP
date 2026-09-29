"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { homeCollections } from "@/data/productCategories";

/**
 * Fila de 6 tarjetas de categoría (ver `homeCollections`).
 *
 * NOTA DE IMÁGENES: los `heroImage` actuales son PLACEHOLDERS de 400px de ancho
 * que además traen el nombre de la categoría "quemado" en la propia foto. Por eso
 * la tarjeta lleva un velo azul completo además del degradado al pie: sin él, el
 * título de la tarjeta compite con el texto de la imagen. Al reemplazar las fotos
 * por otras limpias y en alta, conviene bajar la opacidad de ese velo.
 */
export default function FeaturedCategories() {
  return (
    <section className="bg-brand-bg-primary py-16 lg:py-[86px]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl lg:mb-10"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky-reflection-600">
            Nuestras categorías
          </p>
          <h2 className="mt-4 font-sans text-[clamp(1.875rem,3.4vw,2.375rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-brand-text-primary">
            Todo lo que necesitás
            <br />
            en un solo lugar
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3.5 xl:grid-cols-6">
          {homeCollections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
            >
              <Link
                href={`/productos#${collection.slug}`}
                className="group relative block min-h-[235px] overflow-hidden rounded-2xl shadow-card-soft transition-shadow hover:shadow-xl lg:min-h-[310px]"
              >
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 17vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Velo completo: las fotos son placeholders con texto quemado
                    encima, así que hace falta más que un degradado al pie para
                    que el título de la tarjeta se lea. */}
                <div className="absolute inset-0 bg-sky-reflection-800/45" />
                <div className="absolute inset-0 bg-gradient-card-overlay" />

                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-sky-reflection-600">
                  <ArrowRight className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="font-sans text-[15px] font-extrabold uppercase leading-tight tracking-tight text-white md:text-lg xl:text-[15px]">
                    {collection.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-[1.45] text-sky-reflection-50">
                    {collection.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
