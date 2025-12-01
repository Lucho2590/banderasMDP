"use client";

import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-brand-text-primary overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        {/* Top Section - Compacta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Columna 1: Brand + Contacto */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">Banderas MDP</h3>
              <p className="text-brand-accent text-sm mb-4">Mar del Plata</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Fabricamos banderas y productos personalizados de la más alta calidad desde hace más de 15 años.
              </p>

              {/* Contacto directo */}
              <div className="space-y-2">
                <a
                  href="tel:2234739600"
                  className="flex items-center justify-center md:justify-start space-x-2 text-gray-300 hover:text-brand-accent transition-colors group"
                >
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">223-473 9600</span>
                </a>
                <a
                  href="mailto:info@banderasmardelplata.com.ar"
                  className="flex items-center justify-center md:justify-start space-x-2 text-gray-300 hover:text-brand-accent transition-colors group"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">info@banderasmardelplata.com.ar</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Columna 2: Ubicación + Redes */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-3">Visitanos</h4>
              <a
                href="https://www.google.com/maps/search/?api=1&query=San+Lorenzo+3145,+Mar+del+Plata,+Buenos+Aires,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-center md:justify-start space-x-2 mb-6 group cursor-pointer"
              >
                <MapPin className="h-4 w-4 text-brand-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-gray-400 text-sm group-hover:text-brand-accent transition-colors">
                    San Lorenzo 3145, Mar del Plata
                  </p>
                  <p className="text-gray-500 text-xs group-hover:text-brand-accent transition-colors">
                    Ver en Google Maps →
                  </p>
                </div>
              </a>

              <h4 className="text-white font-semibold mb-3">Seguinos</h4>
              <div className="flex space-x-3 justify-center md:justify-start">
                <motion.a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-accent flex items-center justify-center text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enlaces horizontales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 pb-8 border-b border-gray-800"
        >
          {[
            { href: "/", label: "Inicio" },
            { href: "/productos", label: "Productos" },
            { href: "/promociones", label: "Promociones" },
            { href: "/contacto", label: "Contacto" },
          ].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-brand-accent transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Bottom - Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-center md:text-left">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Banderas Mar del Plata. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500">
              Diseñado por{" "}
              <span className="text-brand-accent hover:text-brand-accent-hover transition-colors">
                OG comunicación y diseño
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

