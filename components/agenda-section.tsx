"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Video } from "lucide-react"

type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "Debates" | "Mítines" | "Foros"
  hasLivestream: boolean
}

export default function AgendaSection() {
  const [filter, setFilter] = useState<string>("all")

  const events: Event[] = [
    {
      id: "1",
      title: "Debate Presidencial - Canal Boliviano",
      date: "10 de junio, 2025",
      time: "20:00 - 22:00",
      location: "La Paz, Estudio Central",
      type: "Debates",
      hasLivestream: true,
    },
    {
      id: "2",
      title: "Mitin Central - Plaza Principal",
      date: "15 de junio, 2025",
      time: "16:00 - 18:00",
      location: "Santa Cruz, Plaza 24 de Septiembre",
      type: "Mítines",
      hasLivestream: true,
    },
    {
      id: "3",
      title: "Foro Económico - Cámara de Industria",
      date: "20 de junio, 2025",
      time: "10:00 - 12:00",
      location: "Cochabamba, Cámara de Industria",
      type: "Foros",
      hasLivestream: false,
    },
    {
      id: "4",
      title: "Debate Regional - Universidades",
      date: "25 de junio, 2025",
      time: "18:00 - 20:00",
      location: "Tarija, Universidad Autónoma",
      type: "Debates",
      hasLivestream: true,
    },
    {
      id: "5",
      title: "Mitin Sectorial - Trabajadores",
      date: "30 de junio, 2025",
      time: "17:00 - 19:00",
      location: "Oruro, Plaza Central",
      type: "Mítines",
      hasLivestream: false,
    },
  ]

  const filteredEvents = filter === "all" ? events : events.filter((event) => event.type === filter)

  return (
    <section id="agenda" className="section bg-muted">
      <div className="container">
        <h2 className="section-title">Agenda & Eventos</h2>

        <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="Debates">Debates</TabsTrigger>
            <TabsTrigger value="Mítines">Mítines</TabsTrigger>
            <TabsTrigger value="Foros">Foros</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-0">
            <div className="grid gap-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-primary text-white p-4">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-[2fr_1fr] gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center">
                        <button className="btn-primary text-sm py-2">Registrarse</button>
                        {event.hasLivestream && (
                          <button className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-md font-semibold transition-all text-sm">
                            <Video className="h-4 w-4" />
                            <span>Livestream</span>
                          </button>
                        )}
                      </div>
                    </div>
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
