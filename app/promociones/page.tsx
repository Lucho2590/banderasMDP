import Carousel from "@/components/Carousel";
import { Tag, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromocionesPage() {
  const promociones = [
    {
      id: 1,
      title: "Descuento Especial",
      subtitle: "Banderas Nacionales",
      description: "20% OFF en todas las banderas nacionales este mes",
      badge: "20% OFF",
      gradient: "from-primary via-accent to-primary",
    },
    {
      id: 2,
      title: "Oferta Personalizada",
      subtitle: "Diseños Custom",
      description: "Segunda bandera personalizada con 30% de descuento",
      badge: "30% OFF",
      gradient: "from-accent via-primary to-accent",
    },
    {
      id: 3,
      title: "Pack Completo",
      subtitle: "Banderas + Mástiles",
      description: "Combo especial: bandera + mástil con precio especial",
      badge: "Combo",
      gradient: "from-green-500 via-accent to-primary",
    },
  ];

  const carouselItems = promociones.map((promo) => (
    <div
      key={promo.id}
      className={`relative w-full h-[600px] bg-gradient-to-br ${promo.gradient} flex items-center justify-center overflow-hidden`}
    >
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">{promo.badge}</span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          {promo.title}
        </h2>
        
        <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
          {promo.subtitle}
        </p>
        
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {promo.description}
        </p>
        
        <div className="mt-8 text-sm text-white/60">
          [Imagen de promoción aquí]
        </div>
        
        <Link
          href="/contacto"
          className="inline-flex items-center space-x-2 mt-8 px-8 py-4 bg-white text-primary rounded-xl hover:bg-white/90 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 font-semibold"
        >
          <span>Consultar ahora</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg">
              <Tag className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Promociones</h1>
            <p className="text-xl text-muted-foreground">
              Aprovechá nuestras ofertas especiales y promociones exclusivas
            </p>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Carousel items={carouselItems} />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground mb-2">
            ¿Querés estar al tanto de nuestras promociones?
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Agregá tus imágenes de promociones en el carousel para destacar tus ofertas
          </p>
        </div>
      </section>
    </div>
  );
}

