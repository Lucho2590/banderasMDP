import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function ProductosPage() {
  const productos = [
    { id: 1, nombre: "Banderas Nacionales", categoria: "Banderas Oficiales" },
    { id: 2, nombre: "Banderas Personalizadas", categoria: "Diseño Custom" },
    { id: 3, nombre: "Banderas Publicitarias", categoria: "Marketing" },
    { id: 4, nombre: "Mástiles y Accesorios", categoria: "Equipamiento" },
    { id: 5, nombre: "Banderas Deportivas", categoria: "Deportes" },
    { id: 6, nombre: "Banderas Institucionales", categoria: "Empresas" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-accent/10 via-brand-accent/5 to-brand-bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-accent mb-6 shadow-lg">
              <ShoppingBag className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-text-primary">Nuestros Productos</h1>
            <p className="text-xl text-brand-text-secondary">
              Descubrí nuestra amplia variedad de banderas y productos personalizados de la más alta calidad
            </p>
          </div>
        </div>
      </section>

      {/* Productos Grid */}
      <section className="py-20 bg-brand-bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="group relative bg-brand-bg-primary border border-brand-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-accent/10 via-brand-accent/5 to-brand-bg-secondary overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <ShoppingBag className="h-12 w-12 text-brand-accent" />
                      </div>
                      <span className="text-sm text-brand-text-secondary">Imagen del producto</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-brand-accent backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {producto.categoria}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors text-brand-text-primary">
                    {producto.nombre}
                  </h3>
                  <p className="text-brand-text-secondary text-sm mb-6 line-clamp-2">
                    Descripción detallada del producto aparecerá aquí con todas las características y especificaciones.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                    <div>
                      <div className="text-2xl font-bold text-brand-accent">Consultar</div>
                      <div className="text-xs text-brand-text-secondary">Precio</div>
                    </div>
                    <button className="group/btn flex items-center space-x-2 px-5 py-2.5 bg-brand-accent text-white rounded-xl hover:bg-brand-accent-hover hover:shadow-lg hover:scale-105 transition-all font-semibold">
                      <span>Ver más</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/5 transition-all pointer-events-none rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-lg text-brand-text-secondary mb-6">
            ¿No encontrás lo que buscás?
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-brand-accent text-white rounded-xl hover:bg-brand-accent-hover hover:shadow-lg hover:scale-105 transition-all font-semibold"
          >
            <span>Contactanos para un presupuesto personalizado</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

