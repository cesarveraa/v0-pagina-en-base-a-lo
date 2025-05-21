"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ParticipaSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    departamento: "",
    areas: {
      comunicacion: false,
      logistica: false,
      digital: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      departamento: value,
    }))
  }

  const handleCheckboxChange = (area: keyof typeof formData.areas) => {
    setFormData((prev) => ({
      ...prev,
      areas: {
        ...prev.areas,
        [area]: !prev.areas[area],
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("¡Gracias por unirte! Te contactaremos pronto.")
  }

  return (
    <section id="participa" className="section">
      <div className="container">
        <h2 className="section-title">Participa como Voluntario</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Únete al equipo que llevará estas propuestas a cada rincón de Bolivia
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Tu número de teléfono"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento de interés</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="la-paz">La Paz</SelectItem>
                      <SelectItem value="cochabamba">Cochabamba</SelectItem>
                      <SelectItem value="santa-cruz">Santa Cruz</SelectItem>
                      <SelectItem value="tarija">Tarija</SelectItem>
                      <SelectItem value="potosi">Potosí</SelectItem>
                      <SelectItem value="oruro">Oruro</SelectItem>
                      <SelectItem value="chuquisaca">Chuquisaca</SelectItem>
                      <SelectItem value="beni">Beni</SelectItem>
                      <SelectItem value="pando">Pando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Áreas de interés</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="comunicacion"
                        checked={formData.areas.comunicacion}
                        onCheckedChange={() => handleCheckboxChange("comunicacion")}
                      />
                      <Label htmlFor="comunicacion" className="font-normal">
                        Comunicación
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="logistica"
                        checked={formData.areas.logistica}
                        onCheckedChange={() => handleCheckboxChange("logistica")}
                      />
                      <Label htmlFor="logistica" className="font-normal">
                        Logística
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="digital"
                        checked={formData.areas.digital}
                        onCheckedChange={() => handleCheckboxChange("digital")}
                      />
                      <Label htmlFor="digital" className="font-normal">
                        Digital
                      </Label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Enviar Solicitud
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Map */}
          <div className="bg-muted rounded-lg overflow-hidden h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122270.42214146105!2d-68.19973089550779!3d-16.50097138429664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915edf0a04f5a40f%3A0x57dbfc76b4458ab3!2sLa%20Paz%2C%20Bolivia!5e0!3m2!1sen!2sus!4v1621541234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de centros de campaña"
            ></iframe>
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
              <h3 className="font-bold text-lg mb-2">Centros de Campaña</h3>
              <p>Encuentra el centro más cercano a ti para unirte a nuestro equipo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
