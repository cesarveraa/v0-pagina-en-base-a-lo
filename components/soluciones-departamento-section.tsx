"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type DepartmentSolution = {
  department: string
  solution: string
  image: string
}

export default function SolucionesDepartamentoSection() {
  const solutions: DepartmentSolution[] = [
    {
      department: "La Paz",
      solution: `
        • Modernizar el transporte público con flotas eléctricas.  
        • Implementar ferias tecnológicas en El Alto para emprendedores.  
        • Mejorar suministro de agua en zona sur y zonas altas.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Cochabamba",
      solution: `
        • Construir planta de tratamiento de aguas residuales.  
        • Fortalecer la agroindustria con centros de procesamiento local.  
        • Impulsar redes de innovación en la UMSS y UCB.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Santa Cruz",
      solution: `
        • Ampliar carreteras y promover corredores logísticos.  
        • Crear polos agroexportadores sustentables.  
        • Fomentar la industrialización del soya con valor agregado.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Tarija",
      solution: `
        • Integrar gasoductos regionales para hogares rurales.  
        • Desarrollar proyectos turísticos en la cordillera.  
        • Programa de capacitación técnico-energético.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Potosí",
      solution: `
        • Garantizar el 11% de regalías por litio para municipios.  
        • Plan de minería responsable con vigilancia ciudadana.  
        • Centros de innovación minera y formación técnica.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Oruro",
      solution: `
        • Reconversión de refinerías y planta solar fotovoltaica.  
        • Turismo cultural en el carnaval de Oruro.  
        • Fortalecer la red de salud pública con telemedicina.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Chuquisaca",
      solution: `
        • Desarrollo de campus universitario en Sucre.  
        • Turismo histórico y rutas patrimoniales.  
        • Programa de emprendedurismo cultural.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Beni",
      solution: `
        • Control e infraestructura contra inundaciones.  
        • Conectividad fluvial y puertos secos.  
        • Ecoturismo responsable en parques nacionales.`,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      department: "Pando",
      solution: `
        • Construcción de carreteras de integración.  
        • Internet satelital para escuelas rurales.  
        • Proyectos de agricultura tropical sostenible.`,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section id="soluciones-departamento" className="section bg-muted relative">
      {/* Aguayo pattern background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>

      <div className="container relative z-10">
        <h2 className="section-title">Soluciones por Departamento</h2>
        <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
          Propuestas concretas adaptadas a las necesidades de cada región
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Tabs defaultValue="La Paz" className="w-full">
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
              <TabsContent key={item.department} value={item.department} className="mt-0 fade-in">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={`Imagen de ${item.department}`}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-primary">Soluciones para {item.department}</h3>
                    <div className="prose max-w-none">
                      <p dangerouslySetInnerHTML={{ __html: item.solution.replace(/\n/g, "<br />") }} />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.slice(0, 3).map((item, index) => (
            <Card key={index} className="hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`Imagen de ${item.department}`}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2 text-primary">{item.department}</h3>
                <div className="prose prose-sm">
                  <p dangerouslySetInnerHTML={{ __html: item.solution.replace(/\n/g, "<br />") }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
