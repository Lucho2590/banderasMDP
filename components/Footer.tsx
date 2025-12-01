import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, MessageCircle, Flag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo y Descripción */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-colors"></div>
                <Flag className="h-8 w-8 text-primary relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Banderas MDP
                </div>
                <div className="text-xs text-muted-foreground -mt-1">Mar del Plata</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu mejor opción en banderas y productos personalizados en Mar del Plata. Calidad, diseño y atención profesional.
            </p>
          </div>

          {/* Páginas */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">Páginas</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/clientes" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  Clientes
                </Link>
              </li>
              <li>
                <Link href="/promociones" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  Promociones
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">Redes Sociales</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Seguinos en las redes y enterate de las últimas noticias y promociones.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-accent/10 hover:bg-accent/20 flex items-center justify-center text-accent hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Dónde Estamos */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">Dónde Estamos</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Dirección</p>
                  <p className="text-muted-foreground">
                    San Lorenzo 3145<br />
                    Mar del Plata
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Teléfono</p>
                  <a href="tel:2234739600" className="text-muted-foreground hover:text-primary transition-colors">
                    223-473 9600 Rot.
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/542235416600"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    223-541 6600
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 Banderas Mar del Plata. Todos los derechos reservados.
            </p>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Diseñado por <span className="text-primary font-medium">OG comunicación y diseño</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

