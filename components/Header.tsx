"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, Flag, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { getCartItemsCount } = useCart();

  const cartItemsCount = getCartItemsCount();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/tienda", label: "Tienda" },
    { href: "/productos", label: "Productos" },
    { href: "/promociones", label: "Promociones" },
    { href: "/contacto", label: "Contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-brand-border bg-brand-bg-primary/95 backdrop-blur-xl shadow-lg"
          : "border-transparent bg-brand-bg-primary/80 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-reflection/10 blur-xl rounded-full group-hover:bg-sky-reflection/20 transition-colors"></div>
              <Flag className="h-8 w-8 text-sky-reflection relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-reflection-600">
                Banderas MDP
              </div>
              <div className="text-xs text-brand-text-secondary -mt-1">Mar del Plata</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                    isActive
                      ? "text-sky-reflection-600"
                      : "text-brand-text-secondary hover:text-sky-reflection-600"
                  }`}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-sky-reflection"
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center space-x-2">
            <a
              href="tel:2234739600"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-brand-text-secondary hover:text-sky-reflection-600 transition-colors rounded-lg hover:bg-brand-bg-secondary"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">223-473 9600</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-brand-bg-secondary transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="h-5 w-5 text-brand-text-secondary" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-sol text-white rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Menu Buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-brand-bg-secondary transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="h-5 w-5 text-brand-text-secondary" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-sol text-white rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-brand-bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-brand-border"
            >
              <div className="flex flex-col space-y-3 py-6">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                          isActive
                            ? "text-sky-reflection-600 bg-sky-reflection/10"
                            : "text-brand-text-secondary hover:text-sky-reflection-600 hover:bg-brand-bg-secondary"
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
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-brand-border"
                >
                  <a
                    href="tel:2234739600"
                    className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-brand-text-secondary hover:text-sky-reflection-600 hover:bg-brand-bg-secondary rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>223-473 9600</span>
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

