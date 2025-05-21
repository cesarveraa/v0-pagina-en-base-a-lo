"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"

type MediaItem = {
  type: "video" | "embed" | "audio" | "pressKit"
  label: string
  src: string
  downloads?: { label: string; href: string }[]
}

type BlogPost = {
  title: string
  date: string
  excerpt: string
  image: string
  url: string
}

export default function MultimediaSection() {
  const [activeTab, setActiveTab] = useState("noticias")

  const blogPosts: BlogPost[] = [
    {
      title: "Samuel Doria Medina presenta su plan económico para los primeros 100 días",
      date: "15 de mayo, 2025",
      excerpt: "El candidato presidencial detalló las medidas inmediatas para estabilizar la economía boliviana.",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "Propuesta de reforma educativa con enfoque técnico y emprendedor",
      date: "10 de mayo, 2025",
      excerpt: "La educación técnica será prioridad para generar empleo calificado en el corto plazo.",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "Alianzas estratégicas con el sector privado para reactivar la economía",
      date: "5 de mayo, 2025",
      excerpt: "El candidato se reunió con representantes de la empresa privada para coordinar acciones.",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "Gira por el oriente boliviano: propuestas para Santa Cruz",
      date: "1 de mayo, 2025",
      excerpt: "Samuel Doria Medina presentó su plan de desarrollo agroindustrial para el departamento.",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "Debate presidencial: Samuel destaca por propuestas concretas",
      date: "25 de abril, 2025",
      excerpt: "Analistas políticos destacan la claridad y viabilidad de las propuestas presentadas.",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
  ]

  const mediaGallery: MediaItem[] = [
    {
      type: "video",
      label: "Entrevista Brújula Digital (Feb 2025)",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      type: "video",
      label: "Foro Nueva Economía (Feb 2025)",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      type: "embed",
      label: "TikTok: ¡100 días, carajo!",
      src: "https://www.tiktok.com/embed/v2/7006699035033718022",
    },
    {
      type: "embed",
      label: "TikTok: Soluciones por Departamento",
      src: "https://www.tiktok.com/embed/v2/7006699035033718022",
    },
    {
      type: "audio",
      label: "Podcast Oficial",
      src: "/placeholder.svg",
    },
    {
      type: "pressKit",
      label: "Sala de Prensa",
      downloads: [
        { label: "Notas de Prensa", href: "#" },
        { label: "Material Gráfico", href: "#" },
      ],
    },
  ]

  return (
    <section id="multimedia" className="section">
      <div className="container">
        <h2 className="section-title">Noticias, Medios y Multimedia</h2>

        <Tabs defaultValue="noticias" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="noticias">Noticias</TabsTrigger>
            <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
          </TabsList>

          <TabsContent value="noticias" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <a href={post.url} className="text-primary font-medium hover:underline">
                      Leer más
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="multimedia" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaGallery.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-3">{item.label}</h3>

                    {item.type === "video" && (
                      <div className="aspect-video mb-3">
                        <iframe
                          className="w-full h-full"
                          src={item.src}
                          title={item.label}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {item.type === "embed" && (
                      <div className="aspect-[9/16] mb-3">
                        <iframe
                          className="w-full h-full"
                          src={item.src}
                          title={item.label}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                      </div>
                    )}

                    {item.type === "audio" && (
                      <audio controls className="w-full mb-3">
                        <source src={item.src} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                      </audio>
                    )}

                    {item.type === "pressKit" && item.downloads && (
                      <div className="space-y-2">
                        {item.downloads.map((download, idx) => (
                          <a
                            key={idx}
                            href={download.href}
                            className="flex items-center gap-2 text-primary hover:underline p-2 bg-muted rounded-md"
                          >
                            <Download size={18} />
                            <span>{download.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
