"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle, Flag } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/clientes", label: "Clientes" },
    { href: "/promociones", label: "Promociones" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-bg-primary/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/10 blur-xl rounded-full group-hover:bg-brand-accent/20 transition-colors"></div>
              <Flag className="h-8 w-8 text-brand-accent relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-accent">
                Banderas MDP
              </div>
              <div className="text-xs text-brand-text-secondary -mt-1">Mar del Plata</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:2234739600"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors rounded-lg hover:bg-brand-bg-secondary"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">223-473 9600</span>
            </a>
            <a
              href="https://wa.me/542235416600"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-brand-accent text-white px-5 py-2.5 rounded-lg hover:bg-brand-accent-hover transition-all shadow-md hover:shadow-lg hover:scale-105 font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-brand-border animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-base font-medium text-brand-text-secondary hover:text-brand-accent hover:bg-brand-bg-secondary rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-brand-border">
                <a
                  href="tel:2234739600"
                  className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-brand-text-secondary hover:text-brand-accent hover:bg-brand-bg-secondary rounded-lg transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>223-473 9600</span>
                </a>
                <a
                  href="https://wa.me/542235416600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-brand-accent text-white px-4 py-3 rounded-lg hover:bg-brand-accent-hover transition-all font-medium shadow-md"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

