import Link from "next/link";
import { ArrowRight, Award, Palette, Users, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background - Gradiente celeste y blanco animado */}
        <div className="absolute inset-0 gradient-celeste-blanco"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Líderes en Mar del Plata</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl">
              Banderas MDP
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 max-w-3xl mx-auto font-light drop-shadow-lg">
              Tu mejor opción en banderas y productos personalizados
            </p>
            
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Calidad premium, diseño personalizado y atención profesional
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/productos"
                className="group inline-flex items-center justify-center px-8 py-4 bg-brand-bg-primary text-brand-accent rounded-xl hover:bg-brand-bg-secondary transition-all shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg"
              >
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all font-semibold text-lg"
              >
                Contactanos
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-brand-bg-primary to-brand-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-text-primary">¿Por qué elegirnos?</h2>
            <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
              Comprometidos con la excelencia en cada proyecto
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-brand-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-brand-bg-primary border border-brand-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-2">
                <div className="w-16 h-16 rounded-xl bg-brand-accent flex items-center justify-center mb-6 shadow-md">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-text-primary">Calidad Premium</h3>
                <p className="text-brand-text-secondary leading-relaxed">
                  Materiales de primera calidad importados y nacionales, garantizando la máxima durabilidad y resistencia a las condiciones climáticas.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-brand-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-brand-bg-primary border border-brand-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-2">
                <div className="w-16 h-16 rounded-xl bg-brand-accent flex items-center justify-center mb-6 shadow-md">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-text-primary">Personalización Total</h3>
                <p className="text-brand-text-secondary leading-relaxed">
                  Diseños completamente personalizados según tus necesidades. Desde banderas tradicionales hasta proyectos únicos y creativos.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-brand-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-brand-bg-primary border border-brand-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-2">
                <div className="w-16 h-16 rounded-xl bg-brand-accent flex items-center justify-center mb-6 shadow-md">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-text-primary">Atención Personalizada</h3>
                <p className="text-brand-text-secondary leading-relaxed">
                  Asesoramiento profesional de principio a fin. Te acompañamos en cada paso para encontrar la solución perfecta para tu proyecto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para tu próximo proyecto?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contactanos hoy y recibí un presupuesto sin compromiso
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-bg-primary text-brand-accent rounded-xl hover:bg-brand-bg-secondary transition-all shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg"
            >
              Solicitar Presupuesto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

