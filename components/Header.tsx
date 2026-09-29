"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Search, Flag, ShoppingCart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import { PHONE, PHONE_DISPLAY, waLink } from "@/lib/contact";

/**
 * "Nosotros" apunta al bloque de la home: no existe una página /nosotros.
 * /promociones existe pero está deliberadamente fuera del nav.
 */
const navItems = [
  { href: "/productos", label: "Productos" },
  { href: "/tienda", label: "Tienda" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { getCartItemsCount } = useCart();

  const cartItemsCount = getCartItemsCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartBadge = cartItemsCount > 0 && (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-reflection-600 text-xs font-bold text-white"
    >
      {cartItemsCount}
    </motion.span>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full border-b bg-brand-bg-primary transition-shadow duration-300 ${
        scrolled ? "border-brand-border shadow-md" : "border-brand-border-light"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-5 lg:h-[82px]">
          {/* Logo */}
          <Link href="/" className="group flex flex-shrink-0 items-center gap-2.5">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-sun transition-transform group-hover:scale-105 lg:h-[42px] lg:w-[42px]">
              <Flag className="h-4 w-4 text-white lg:h-5 lg:w-5" />
            </span>
            <span className="text-[21px] font-extrabold tracking-[-0.04em] text-sky-reflection-600 lg:text-[26px]">
              Banderas <span className="font-medium">MDP</span>
            </span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-bold transition-colors ${
                    isActive
                      ? "text-sky-reflection-600"
                      : "text-brand-text-primary hover:text-sky-reflection-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Acciones desktop */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              href="/productos"
              aria-label="Buscar productos"
              title="Buscar productos"
              className="rounded-full border border-brand-border p-2.5 text-brand-text-secondary transition-colors hover:border-sky-reflection-600 hover:text-sky-reflection-600"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full border border-brand-border p-2.5 text-brand-text-secondary transition-colors hover:border-sky-reflection-600 hover:text-sky-reflection-600"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {cartBadge}
            </button>

            <a
              href={waLink("Hola, quería hacerles una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-whatsapp-hover"
            >
              <MessageCircle className="mr-1.5 h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* Acciones mobile */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={waLink("Hola, quería hacerles una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-whatsapp px-3 py-2 text-xs font-bold text-white"
            >
              <MessageCircle className="mr-1 h-3.5 w-3.5" />
              WhatsApp
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-lg p-2 text-brand-text-secondary transition-colors hover:bg-brand-bg-secondary"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartBadge}
            </button>

            <button
              className="rounded-lg p-2 text-brand-text-primary transition-colors hover:bg-brand-bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navegación mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-brand-border lg:hidden"
            >
              <div className="flex flex-col space-y-2 py-5">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-4 py-3 text-base font-bold transition-colors ${
                          isActive
                            ? "bg-sky-reflection-50 text-sky-reflection-600"
                            : "text-brand-text-primary hover:bg-brand-bg-secondary hover:text-sky-reflection-600"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.08 }}
                  className="border-t border-brand-border pt-3"
                >
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-brand-text-secondary transition-colors hover:bg-brand-bg-secondary hover:text-sky-reflection-600"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{PHONE_DISPLAY}</span>
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
}
