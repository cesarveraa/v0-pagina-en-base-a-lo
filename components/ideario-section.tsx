import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProposalCard = {
  title: string
  summary: string
  details: {
    reto: string
    solución: string
    impacto: string
  }
}

export default function IdearioSection() {
  const icons = [
    { icon: "💼", label: "Economía de Mercado con Rostro Social" },
    { icon: "🎓", label: "Educación Técnica y Emprendedora" },
    { icon: "⚖️", label: "Justicia Independiente" },
    { icon: "🔍", label: "Transparencia y Digitalización" },
  ]

  const proposals: ProposalCard[] = [
    {
      title: "Reforma Fiscal Progresiva",
      summary: "Equidad tributaria para fortalecer el gasto social",
      details: {
        reto: "Desigualdad y baja recaudación efectiva",
        solución: "Escala progresiva con exenciones a emprendedores",
        impacto: "+25% de ingresos para salud y educación",
      },
    },
    {
      title: "Empleos Técnicos",
      summary: "500.000 plazas técnicas en 5 años",
      details: {
        reto: "Desempleo juvenil especializado",
        solución: "Alianzas con sector privado para formación dual",
        impacto: "Disminución de desempleo juvenil en 18%",
      },
    },
    {
      title: "Transparencia Digital Total",
      summary: "Gestión pública auditada en tiempo real",
      details: {
        reto: "Corrupción y trámites presenciales",
        solución: "Plataforma única de trámites y datos abiertos",
        impacto: "50% menos de tiempo en trámites y + confianza ciudadana",
      },
    },
    {
      title: "Infraestructura con PPP",
      summary: "Red vial e infraestructura prioritaria",
      details: {
        reto: "Rezago de carreteras y servicios básicos",
        solución: "Marcos claros para Alianzas Público-Privadas",
        impacto: "Acelera proyectos y genera +30.000 empleos locales",
      },
    },
  ]

  return (
    <section id="ideario" className="section relative">
      {/* Decorative elements - Bolivian-inspired */}
      <div className="absolute left-0 top-1/4 w-16 h-64 bg-accent/10 rounded-r-full"></div>
      <div className="absolute right-0 top-1/2 w-16 h-64 bg-primary/10 rounded-l-full"></div>

      <div className="container">
        <h2 className="section-title">Ideología y Propuestas Clave 2025</h2>

        {/* Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {icons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className="font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Proposals Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proposals.map((proposal, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 border-t-4 border-primary"
            >
              <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-lg">
                <CardTitle className="text-xl">{proposal.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="font-medium text-lg mb-4">{proposal.summary}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary min-w-[60px]">Reto:</span>
                    <span>{proposal.details.reto}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary min-w-[60px]">Solución:</span>
                    <span>{proposal.details.solución}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary min-w-[60px]">Impacto:</span>
                    <span>{proposal.details.impacto}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
