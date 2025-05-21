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
    const defaultMessages: Message[] = [
      {
        id: 1,
        sender: "samuel",
        text: "¡Hola! Soy Samuel Doria Medina. Estoy aquí para responder tus preguntas sobre mis propuestas para Bolivia. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date(),
      },
    ]
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatMessages")
      if (saved) {
        try {
          return JSON.parse(saved).map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }))
        } catch {}
      }
    }
    return defaultMessages
  })

  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const addMessage = (msg: Message) => {
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

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMsg: Message = {
      id: messages.length + 1,
      sender: "user",
      text: message.trim(),
      timestamp: new Date(),
    }
    addMessage(userMsg)
    setMessage("")
    inputRef.current?.focus()

    setIsTyping(true)
    try {
      const res = await fetch("https://server-crj.vercel.app/api/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg.text }),
      })
      const { response } = await res.json()

      const samuelMsg: Message = {
        id: userMsg.id + 1,
        sender: "samuel",
        text: response,
        timestamp: new Date(),
      }
      addMessage(samuelMsg)

    } catch (err) {
      console.error(err)
      // Optionally show an error message in chat:
      addMessage({
        id: messages.length + 2,
        sender: "samuel",
        text: "Lo siento, ha ocurrido un error al enviar tu mensaje.",
        timestamp: new Date(),
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTimestamp = (ts: Date) =>
    ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const suggestedTopics = [
    { icon: <Calendar className="h-4 w-4" />, text: "Plan 100 días" },
    { icon: <MapPin className="h-4 w-4" />, text: "Propuestas para mi región" },
    { icon: <FileText className="h-4 w-4" />, text: "Reforma económica" },
    { icon: <Info className="h-4 w-4" />, text: "Sobre Samuel" },
  ]

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

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <div className="md:hidden mr-3">
              <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Samuel Doria Medina"
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-accent"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3">
                <h1 className="font-bold text-gray-800">Samuel Doria Medina</h1>
                <p className="text-xs text-gray-500">Candidato Presidencial 2025 • En línea</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-gray-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Minimizar chat"
            >
              <Minimize2 className="h-5 w-5" />
            </Link>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Welcome message */}
            <div className="bg-primary/5 rounded-lg p-4 mb-6 text-center">
              <h2 className="font-bold text-primary mb-2">Bienvenido al chat con Samuel Doria Medina</h2>
              <p className="text-sm text-gray-600">
                Pregúntame sobre mis propuestas para Bolivia o selecciona un tema de interés.
              </p>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {msg.sender === "samuel" && (
                  <div className="flex-shrink-0 mr-3 self-end">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Samuel Doria Medina"
                      width={40}
                      height={40}
                      className="rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border border-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.sender === "user" ? "text-white/70" : "text-gray-400"}`}>
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex-shrink-0 mr-3 self-end">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Samuel Doria Medina"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm max-w-[80%]">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 bg-white p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            {/* Suggested topics */}
            <div className="mb-4 flex flex-wrap gap-2">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicClick(topic.text)}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1.5 px-3 rounded-full transition-colors"
                >
                  {topic.icon}
                  <span>{topic.text}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu mensaje a Samuel..."
                className="flex-1 bg-transparent py-3 px-4 focus:outline-none resize-none min-h-[50px] max-h-[120px]"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={message.trim() === "" || isTyping}
                className="bg-primary text-white p-3 rounded-full mr-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Enviar mensaje"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
              <MessageSquare className="h-3 w-3" />
              <span>Las respuestas son generadas automáticamente basadas en las propuestas de campaña</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
