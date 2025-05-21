"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-primary/60 z-10"></div>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/placeholder.svg?height=1080&width=1920"
        >
          <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      </div>

      {/* Content */}
      <div className="container relative z-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 backdrop-blur-sm bg-black/10 rounded-lg">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight">
            ¡100 DÍAS, <span className="text-accent">CARAJO!</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Recuperar la economía y la dignidad de Bolivia en tiempo récord
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#participa" className="btn-primary rounded-full">
              Únete
            </Link>
            <Link href="#dona" className="btn-accent rounded-full">
              Dona
            </Link>
            <Link href="#ideario" className="btn-outline rounded-full">
              Ver Propuestas
            </Link>
          </div>
        </div>

        {/* Decorative element - Bolivian flag colors */}
        <div className="absolute bottom-0 left-0 right-0 h-2 flex">
          <div className="w-1/3 bg-[#D52B1E]"></div> {/* Red */}
          <div className="w-1/3 bg-[#F9E300]"></div> {/* Yellow */}
          <div className="w-1/3 bg-[#007934]"></div> {/* Green */}
        </div>
      </div>
    </section>
  )
}
