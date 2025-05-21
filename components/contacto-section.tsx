"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function ContactoSection() {
  const [contactForm, setContactForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const [newsletter, setNewsletter] = useState("")

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    alert("¡Gracias por tu mensaje! Te responderemos pronto.")
    setContactForm({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", newsletter)
    alert("¡Gracias por suscribirte a nuestro boletín!")
    setNewsletter("")
  }

  return (
    <section id="contacto" className="section">
      <div className="container">
        <h2 className="section-title">Contáctanos y Mantente Informado</h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={contactForm.nombre}
                    onChange={handleContactChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input
                    id="asunto"
                    name="asunto"
                    value={contactForm.asunto}
                    onChange={handleContactChange}
                    placeholder="Asunto de tu mensaje"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={contactForm.mensaje}
                    onChange={handleContactChange}
                    placeholder="Tu mensaje"
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Enviar Mensaje
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info and Newsletter */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Información de Contacto</h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-bold">Dirección:</span> Av. Mariscal Santa Cruz N° 123, La Paz
                  </p>
                  <p>
                    <span className="font-bold">Teléfono:</span> +591 2 1234567
                  </p>
                  <p>
                    <span className="font-bold">Horario:</span> Lun–Vie 9:00–18:00
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">Redes Sociales</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com/samueldoriamedina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="https://twitter.com/SDoriaMedina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a
                      href="https://instagram.com/samueldoriamedina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Suscríbete a Nuestro Boletín</h3>
                <p className="mb-4">
                  Recibe actualizaciones de la campaña, eventos y noticias directamente en tu correo.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    placeholder="Tu mejor email"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <button type="submit" className="btn-accent whitespace-nowrap">
                    Suscríbete
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
