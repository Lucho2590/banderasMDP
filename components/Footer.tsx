"use client";

import Link from "next/link";
import { Facebook, Instagram, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { productCategories } from "@/data/productCategories";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE,
  PHONE_DISPLAY,
  WHATSAPP_DISPLAY,
  waLink,
} from "@/lib/contact";

const infoLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/productos", label: "Productos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-baltic-blue-600 text-white">
      <div className="container mx-auto px-4 py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-8 lg:grid-cols-[2fr_1fr_1fr_1fr]"
        >
          {/* Marca */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-sun">
                <Flag className="h-4 w-4 text-white" />
              </span>
              <span className="text-[22px] font-extrabold tracking-[-0.04em] text-white">
                Banderas <span className="font-normal">MDP</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-sky-reflection-200">
              Fabricación propia · Mar del Plata
            </p>
          </div>

          {/* Productos */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Productos</h4>
            <ul>
              {productCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/productos#${category.slug}`}
                    className="block py-[3px] text-[13px] text-sky-reflection-100 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Información</h4>
            <ul>
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-[3px] text-[13px] text-sky-reflection-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Contacto</h4>
            <ul className="text-[13px] text-sky-reflection-100">
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-[3px] transition-colors hover:text-white"
                >
                  {ADDRESS}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE}`} className="block py-[3px] transition-colors hover:text-white">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-[3px] transition-colors hover:text-white"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="block py-[3px] transition-colors hover:text-white">
                  {EMAIL}
                </a>
              </li>
            </ul>

            <div className="mt-4 flex gap-2.5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram: ${INSTAGRAM_HANDLE}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-9 flex flex-col items-center gap-1.5 border-t border-white/10 pt-6 text-center text-xs text-sky-reflection-200 md:flex-row md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} Banderas Mar del Plata. Todos los derechos reservados.</p>
          <p>Diseñado por OG comunicación y diseño</p>
        </div>
      </div>
    </footer>
  );
}
