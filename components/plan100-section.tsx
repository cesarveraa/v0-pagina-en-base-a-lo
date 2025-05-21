export default function Plan100Section() {
  const priorityActions = [
    "Estabilizar reservas de divisas y tipo de cambio",
    "Asegurar suministro ininterrumpido de combustibles",
    "Auditoría integral de empresas públicas",
    "Negociación y ejecución de $US 3.500MM en créditos",
    "Lanzamiento de Fondo de Estabilización Económica",
  ]

  return (
    <section
      id="plan100"
      className="section bg-gradient-to-b from-primary to-primary/90 text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container relative z-10">
        <h2 className="section-title text-white">El Plan 100 Días</h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Video */}
          <div className="aspect-video bg-black/20 rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Plan 100 Días"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Infographic */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6 text-accent">5 Acciones Prioritarias</h3>

            <div className="space-y-4">
              {priorityActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm transform transition-transform hover:translate-x-2"
                >
                  <div className="bg-accent text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg">{action}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm border-l-4 border-accent">
              <p className="text-lg">
                En 100 días garantizamos la circulación de dólares y combustible, nuevos recursos para hospitales, y la
                rendición de cuentas sobre todos los contratos del Estado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
