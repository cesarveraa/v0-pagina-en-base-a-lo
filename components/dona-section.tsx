"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Building, Bitcoin } from "lucide-react"

type DonationBreakdown = {
  label: string
  percent: number
}

export default function DonaSection() {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("tarjeta")

  const target = 1500000
  const raised = 420000
  const progress = (raised / target) * 100

  const breakdown: DonationBreakdown[] = [
    { label: "Publicidad y difusión", percent: 40 },
    { label: "Eventos y logística", percent: 25 },
    { label: "Tecnología y plataformas", percent: 20 },
    { label: "Formación de voluntarios", percent: 15 },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation submitted:", { amount, paymentMethod })
    // Here you would typically process the payment
    alert("¡Gracias por tu donación!")
  }

  return (
    <section id="dona" className="section bg-primary text-white">
      <div className="container">
        <h2 className="section-title text-white">Dona para Hacerlo Posible</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Cada contribución impulsa acciones concretas en tu departamento
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Donation Form */}
          <Card className="bg-white text-text">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Monto a donar (Bs.)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ingresa el monto"
                    min="10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Método de pago</Label>
                  <Tabs defaultValue="tarjeta" onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tarjeta" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Tarjeta</span>
                      </TabsTrigger>
                      <TabsTrigger value="transferencia" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>Transferencia</span>
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="flex items-center gap-2">
                        <Bitcoin className="h-4 w-4" />
                        <span>Crypto</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="tarjeta" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Número de tarjeta</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Fecha de expiración</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="transferencia" className="space-y-4 mt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-bold mb-2">Datos bancarios:</h3>
                        <p>Banco: Banco Nacional de Bolivia</p>
                        <p>Cuenta: 1234567890</p>
                        <p>Titular: Unidad Nacional S.R.L.</p>
                        <p>Concepto: Donación Campaña</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="crypto" className="space-y-4 mt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-bold mb-2">Direcciones de criptomonedas:</h3>
                        <p className="mb-2">Bitcoin (BTC):</p>
                        <p className="text-xs break-all bg-white p-2 rounded">
                          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                        </p>
                        <p className="mt-2 mb-2">Ethereum (ETH):</p>
                        <p className="text-xs break-all bg-white p-2 rounded">
                          0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-primary hover:bg-accent/90 px-6 py-3 rounded-md font-semibold transition-all"
                >
                  Completar Donación
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Transparency Chart */}
          <div className="space-y-8">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Progreso de Recaudación</h3>
              <div className="mb-2 flex justify-between">
                <span>Bs. {raised.toLocaleString()}</span>
                <span>Meta: Bs. {target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                <div className="bg-accent h-4 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-sm">
                Hemos recaudado el {progress.toFixed(1)}% de nuestra meta para esta campaña. ¡Cada contribución cuenta!
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Distribución de Fondos</h3>
              <div className="space-y-4">
                {breakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{item.label}</span>
                      <span>{item.percent}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Transparencia</h3>
              <p>
                Todos los fondos recaudados son auditados mensualmente y los reportes son publicados en nuestra página
                web. Cumplimos con todas las regulaciones del Órgano Electoral Plurinacional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
