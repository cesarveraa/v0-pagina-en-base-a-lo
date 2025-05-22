"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Send,
  ArrowLeft,
  Minimize2,
  Calendar,
  MapPin,
  FileText,
  Info,
  MessageSquare,
} from "lucide-react"

type Message = {
  id: number
  sender: "user" | "samuel"
  text: string
  timestamp: Date
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = typeof window !== "undefined"
      ? localStorage.getItem("chatMessages")
      : null

    if (saved) {
      try {
        return JSON.parse(saved).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }))
      } catch {
        /* fall-back */
      }
    }

    return [
      {
        id: 1,
        sender: "samuel",
        text: "¡Hola! Soy Samuel Doria Medina. Estoy aquí para responder tus preguntas sobre mis propuestas para Bolivia. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date(),
      },
    ]
  })

  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Guarda y hace scroll
  const pushMessage = (msg: Message) => {
    setMessages((prev) => {
      const next = [...prev, msg]
      if (typeof window !== "undefined") {
        localStorage.setItem("chatMessages", JSON.stringify(next))
      }
      return next
    })
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 50)
  }

  // Envía la petición al backend
  const handleSendMessage = async () => {
    const text = message.trim()
    if (!text) return

    // 1) Muestra usuario
    const userMsg: Message = {
      id: messages.length + 1,
      sender: "user",
      text,
      timestamp: new Date(),
    }
    pushMessage(userMsg)
    setMessage("")
    inputRef.current?.focus()

    // 2) Indica “Samuel está escribiendo”
    setIsTyping(true)

    try {
      const res = await fetch(
        "https://server-crj.vercel.app/api/responder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: text }),
        }
      )
      const { response } = await res.json()

      // 3) Muestra respuesta
      const samuelMsg: Message = {
        id: userMsg.id + 1,
        sender: "samuel",
        text: response,
        timestamp: new Date(),
      }
      pushMessage(samuelMsg)
    } catch (err) {
      console.error(err)
      pushMessage({
        id: messages.length + 2,
        sender: "samuel",
        text: "Lo siento, hubo un error al enviar tu mensaje.",
        timestamp: new Date(),
      })
    } finally {
      setIsTyping(false)
    }
  }

  // Enviar con Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Focus inicial y scroll en cada mensaje
  useEffect(() => {
    inputRef.current?.focus()
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Formatea hora
  const formatTimestamp = (ts: Date) =>
    ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const suggestedTopics = [
    { icon: <Calendar className="h-4 w-4" />, text: "Plan 100 días" },
    { icon: <MapPin className="h-4 w-4" />, text: "Propuestas para mi región" },
    { icon: <FileText className="h-4 w-4" />, text: "Reforma económica" },
    { icon: <Info className="h-4 w-4" />, text: "Sobre Samuel" },
  ]

  // Click en sugerido
  const handleTopicClick = (topic: string) => {
    setMessage(topic)
    inputRef.current?.focus()
  }

 return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver al sitio</span>
          </Link>
        </div>

        <div className="p-4">
          <h2 className="font-bold text-gray-700 mb-4">Información</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="text-sm">Agenda de Campaña</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-sm">Propuestas Completas</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="text-sm">Eventos Cercanos</span>
            </div>
          </div>
        </div>

        <div className="p-4 mt-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-bold text-primary mb-2">¿Quieres participar?</h3>
            <p className="text-sm text-gray-600 mb-3">Únete a nuestro equipo de voluntarios y sé parte del cambio.</p>
            <Link
              href="#participa"
              className="text-sm bg-primary text-white py-2 px-3 rounded-md inline-block hover:bg-primary/90 transition-colors"
            >
              Registrarme
            </Link>
          </div>
        </div>
      </div>

       {/* Chat Container */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <div className="md:hidden mr-3">
              <Link href="/" className="text-gray-500 hover:text-primary">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <Image
                  src="/images/perfil.jpg"
                  alt="Samuel"
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-accent"
                />
                <span className="absolute bottom-0 right-0 block h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="ml-3">
                <h1 className="font-bold text-gray-800 text-lg sm:text-xl">Samuel Doria Medina</h1>
                <p className="text-xs sm:text-sm text-gray-500">Candidato Presidencial 2025 • En línea</p>
              </div>
            </div>
          </div>
          <Link href="/" className="text-gray-500 hover:text-primary p-2 rounded-full md:hidden">
            <Minimize2 className="h-6 w-6" />
          </Link>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "samuel" && (
                  <div className="flex-shrink-0 mr-3">
                    <Image
                      src="/images/perfil.jpg"
                      alt="Samuel"
                      width={40}
                      height={40}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm sm:text-base">{msg.text}</p>
                  <p className="text-xs sm:text-sm mt-1 text-gray-400">
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 mr-3">
                  <Image
                    src="/images/perfil.jpg"
                    alt="Samuel typing"
                    width={40}
                    height={40}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover opacity-60"
                  />
                </div>
                <div className="p-4 bg-white border rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => handleTopicClick(topic.text)}
                className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-sm sm:text-base"
              >
                {topic.icon}
                {topic.text}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-gray-50 border rounded-2xl px-4 py-2">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Escribe tu mensaje a Samuel..."
              className="flex-1 bg-transparent resize-none focus:outline-none text-sm sm:text-base"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="p-2 rounded-full bg-primary text-white disabled:opacity-50"
            >
              <Send className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}