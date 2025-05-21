import Image from "next/image"

type TimelineItem = {
  year: string
  label: string
}

export default function AboutSection() {
  const timeline: TimelineItem[] = [
    { year: "1964–1976", label: "Estudios escolares en Colegio Alemán de Oruro" },
    { year: "1976–1980", label: "Economía y Adm. Empresas, UCB" },
    { year: "1980–1982", label: "Lic. Economía, ASU (EEUU)" },
    { year: "1983–1984", label: "Máster en Finanzas Públicas, LSE (Reino Unido)" },
    { year: "1987–2014", label: "Director de SOBOCE; expansión a franquicias y hotelería" },
    { year: "1991–1993", label: "Ministro de Planeamiento y Jefe del Gabinete Económico" },
    { year: "1995", label: "Secuestrado por el MRTA (45 días de cautiverio)" },
    { year: "2005", label: "Sobreviviente de accidente aéreo en Oruro" },
    { year: "2005–2019", label: "Candidaturas presidenciales (2005, 2009, 2014)" },
    { year: "2025", label: "Candidato Presidencial por Bloque Unidad" },
  ]

  const achievements = [
    "Premio José María Roca (AILA) 2012 al Mejor Industrial Latinoamericano.",
    "Venta de participación en SOBOCE al Grupo Gloria por $US 300MM (2014).",
    "Vicepresidente de Internacional Socialista para América Latina (2023).",
  ]

  return (
    <section id="sobre" className="section bg-muted relative overflow-hidden">
      {/* Aguayo pattern background */}
      <div className="absolute top-0 left-0 w-full h-16 opacity-10 aguayo-pattern"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 opacity-10 aguayo-pattern"></div>

      <div className="container">
        <h2 className="section-title">Sobre Samuel Doria Medina</h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-[1.02]">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Samuel conversando con vecinos en La Paz"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm">Samuel conversando con vecinos en La Paz</p>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-3 text-primary">Perfil General</h3>
              <div className="prose">
                <p>
                  Samuel Jorge Doria Medina Auza
                  <br />• Nacido el 4 de diciembre de 1958 en La Paz.
                  <br />• Economista (UCB, ASU), Máster en Finanzas Públicas (LSE).
                  <br />• Empresario (SOBOCE, Burger King, Subway, hotelería) y político.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-3 text-primary">Línea de Tiempo</h3>
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div key={index} className="flex hover:bg-muted p-2 rounded-md transition-colors">
                    <div className="w-24 flex-shrink-0 font-bold text-accent">{item.year}</div>
                    <div>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-3 text-primary">Hitos Personales</h3>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
