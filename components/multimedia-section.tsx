"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

type BlogPost = {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  url: string;
};

type TikTokItem = {
  label: string;
  src: string;
};

export default function MultimediaSection() {
  const blogPosts: BlogPost[] = [
    {
      title: "Samuel Doria Medina presenta su plan económico para los primeros 100 días",
      date: "15 de mayo, 2025",
      excerpt:
        "El candidato presidencial detalló las medidas inmediatas para estabilizar la economía boliviana.",
      image: "/images/multimedia1.jpg",
      url: "#",
    },
    {
      title: "Propuesta de reforma educativa con enfoque técnico y emprendedor",
      date: "10 de mayo, 2025",
      excerpt:
        "La educación técnica será prioridad para generar empleo calificado en el corto plazo.",
      image: "/images/multimedia2.jpg",
      url: "#",
    },
    {
      title: "Alianzas estratégicas con el sector privado para reactivar la economía",
      date: "5 de mayo, 2025",
      excerpt:
        "El candidato se reunió con representantes de la empresa privada para coordinar acciones.",
      image: "/images/multimedia3.jpg",
      url: "#",
    },
    {
      title: "Gira por el oriente boliviano: propuestas para Santa Cruz",
      date: "1 de mayo, 2025",
      excerpt:
        "Samuel Doria Medina presentó su plan de desarrollo agroindustrial para el departamento.",
      image: "/images/multimedia4.jpg",
      url: "#",
    },
    {
      title: "Debate presidencial: Samuel destaca por propuestas concretas",
      date: "25 de abril, 2025",
      excerpt:
        "Analistas políticos destacan la claridad y viabilidad de las propuestas presentadas.",
      image: "/images/multimedia5.jpg",
      url: "#",
    },
  ];

  const tiktoks: TikTokItem[] = [
    { label: "TikTok 1", src: "https://www.tiktok.com/embed/v2/7472490335877205303/" },
    { label: "TikTok 2", src: "https://www.tiktok.com/embed/v2/7467252803178663174/" },
    { label: "TikTok 3", src: "https://www.tiktok.com/embed/v2/7499106438753570054/" },
    { label: "TikTok 4", src: "https://www.tiktok.com/embed/v2/7490730380283088183/" },
    { label: "TikTok 5", src: "https://www.tiktok.com/embed/v2/7472490335877205303/" },
    { label: "TikTok 6", src: "https://www.tiktok.com/embed/v2/7006699035033718022" },
  ];

  return (
    <section id="multimedia" className="section">
      <div className="container space-y-12">
        {/* Noticias */}
        <div>
          <h2 className="section-title mb-6">Noticias</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={post.image}
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
        </div>

        {/* TikToks */}
        <div>
          <h2 className="section-title mb-6">TikToks</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiktoks.map((item, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-3">{item.label}</h3>
                  <div className="aspect-[9/16] mb-3">
                    <iframe
                      className="w-full h-full"
                      src={item.src}
                      title={item.label}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
