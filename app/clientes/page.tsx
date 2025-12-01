import { Building2, Award, Users } from "lucide-react";

export default function ClientesPage() {
  const clientes = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-primary mb-6 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Nuestros Clientes</h1>
            <p className="text-xl text-muted-foreground">
              Empresas e instituciones que confían en nosotros para sus proyectos
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/80 mb-4 shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Clientes satisfechos</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent/80 mb-4 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-muted-foreground">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 mb-4 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-muted-foreground">Satisfacción garantizada</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {clientes.map((cliente) => (
              <div
                key={cliente}
                className="group relative aspect-square bg-card border-2 border-border/50 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-primary hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all"></div>
                
                {/* Logo Placeholder */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all">
                    <Building2 className="h-12 w-12 text-primary/50 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    Cliente {cliente}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground mb-2">
            ¿Querés formar parte de nuestros clientes satisfechos?
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Agregá tus logos de clientes aquí para mostrar tu portfolio
          </p>
        </div>
      </section>
    </div>
  );
}

