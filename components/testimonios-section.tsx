"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Testimonial = {
  quote: string
  author: string
}

export default function TestimoniosSection() {
  const testimonials: Testimonial[] = [
    { quote: "Samuel trae soluciones reales y urgentes.", author: "Empresario A" },
    { quote: "Confianza y experiencia al servicio de la gente.", author: "Académico B" },
    { quote: "Su plan 100 Días es firme y medible.", author: "ONG C" },
    { quote: "Un líder que escucha y actúa.", author: "Líder Comunitario D" },
  ]

  const logos = [
    "/placeholder.svg?height=80&width=200",
    "/placeholder.svg?height=80&width=200",
    "/placeholder.svg?height=80&width=200",
    "/placeholder.svg?height=80&width=200",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = testimonials.length - 1
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((current) => (current === maxIndex ? 0 : current + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((current) => (current === 0 ? maxIndex : current - 1))
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <section id="testimonios" className="section">
      <div className="container">
        <h2 className="section-title">Testimonios y Endosos</h2>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto mb-16">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-muted border-none">
                    <CardContent className="p-8 text-center">
                      <blockquote className="text-2xl italic mb-6">"{testimonial.quote}"</blockquote>
                      <cite className="text-lg font-medium text-primary not-italic">— {testimonial.author}</cite>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-muted transition-colors"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-muted transition-colors"
            aria-label="Testimonio siguiente"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          <div className="flex justify-center mt-4 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted-foreground"}`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </section>
  )
}
