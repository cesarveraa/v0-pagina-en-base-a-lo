"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type DepartmentSolution = {
  department: string
  solution: string
  /** Opcional: ruta de imagen local */
  image?: string
  /** Opcional: ID de video de YouTube para embed */
  videoId?: string
}

export default function SolucionesDepartamentoSection() {
  const solutions: DepartmentSolution[] = [
    {
      department: "La Paz",
      solution: `
        • Modernizar el transporte público con flotas eléctricas.  
        • Implementar ferias tecnológicas en El Alto para emprendedores.  
        • Mejorar suministro de agua en zona sur y zonas altas.
      `,
      videoId: "Mtd92A50jvQ",
    },
    {
      department: "Cochabamba",
      solution: `
        • Construir planta de tratamiento de aguas residuales.  
        • Fortalecer la agroindustria con centros de procesamiento local.  
        • Impulsar redes de innovación en la UMSS y UCB.
      `,
      videoId: "r69YdURH9Uc",
    },
    {
      department: "Santa Cruz",
      solution: `
        • Ampliar carreteras y promover corredores logísticos.  
        • Crear polos agroexportadores sustentables.  
        • Fomentar la industrialización del soya con valor agregado.
      `,
      videoId: "L8nQeR8TajA",
    },
    {
      department: "Tarija",
      solution: `
        • Integrar gasoductos regionales para hogares rurales.  
        • Desarrollar proyectos turísticos en la cordillera.  
        • Programa de capacitación técnico-energético.
      `,
      videoId: "O3IpYsP0tAs",
    },
    {
      department: "Potosí",
      solution: `
        • Garantizar el 11% de regalías por litio para municipios.  
        • Plan de minería responsable con vigilancia ciudadana.  
        • Centros de innovación minera y formación técnica.
      `,
      videoId: "4xcRSIG-IaQ",
    },
    {
      department: "Oruro",
      solution: `
        • Reconversión de refinerías y planta solar fotovoltaica.  
        • Turismo cultural en el carnaval de Oruro.  
        • Fortalecer la red de salud pública con telemedicina.
      `,
      videoId: "p_-xrSCJfbc",
    },
    {
      department: "Chuquisaca",
      solution: `
        • Desarrollo de campus universitario en Sucre.  
        • Turismo histórico y rutas patrimoniales.  
        • Programa de emprendedurismo cultural.
      `,
      videoId: "nUZ0GsXtYmE",
    },
    {
      department: "Beni",
      solution: `
        • Control e infraestructura contra inundaciones.  
        • Conectividad fluvial y puertos secos.  
        • Ecoturismo responsable en parques nacionales.
      `,
      videoId: "3igolfGOvzU",
    },
    {
      department: "Pando",
      solution: `
        • Construcción de carreteras de integración.  
        • Internet satelital para escuelas rurales.  
        • Proyectos de agricultura tropical sostenible.
      `,
      videoId: "15z-w57mB_w",
    },
  ]

  return (
    <section id="soluciones-departamento" className="section bg-muted relative">
      {/* Fondo con patrón aguayo */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5" />

      <div className="container relative z-10">
        <h2 className="section-title">Soluciones por Departamento</h2>
        <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
          Propuestas concretas adaptadas a las necesidades de cada región
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Tabs defaultValue={solutions[0].department} className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-6 bg-muted p-1 rounded-full">
              {solutions.map((item) => (
                <TabsTrigger
                  key={item.department}
                  value={item.department}
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {item.department}
                </TabsTrigger>
              ))}
            </TabsList>

            {solutions.map((item) => (
              <TabsContent
                key={item.department}
                value={item.department}
                className="mt-0 data-[state=active]:block hidden"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {item.videoId ? (
                      <div className="w-full h-64 rounded-lg shadow-md overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${item.videoId}`}
                          title={`Video de ${item.department}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={`Imagen de ${item.department}`}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-primary">
                      Soluciones para {item.department}
                    </h3>
                    <div className="prose max-w-none">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.solution.replace(/\n/g, "<br />"),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.slice(0, 3).map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                {item.videoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                    title={`Video de ${item.department}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`Imagen de ${item.department}`}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {item.department}
                </h3>
                <div className="prose prose-sm">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.solution.replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
