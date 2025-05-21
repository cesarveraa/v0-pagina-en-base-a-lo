"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Send, ChevronDown, Maximize2, Calendar, MapPin, FileText, Info } from "lucide-react"

type Message = {
  id: number
  sender: "user" | "samuel"
  text: string
  timestamp: Date
}

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    // Default initial message
    const defaultMessages = [
      {
        id: 1,
        sender: "samuel" as const,
        text: "¡Hola! Soy Samuel Doria Medina. ¿En qué puedo ayudarte hoy? Pregúntame sobre mis propuestas para Bolivia.",
        timestamp: new Date(),
      },
    ]

    // Check localStorage for saved messages
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages")
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages)
          // Convert string timestamps back to Date objects
          return parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        } catch (e) {
          console.error("Error parsing saved messages:", e)
        }
      }
    }

    return defaultMessages
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = () => {
    if (message.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setMessage("")

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages))
    }

    // Show typing indicator
    setIsTyping(true)

    // Simulate Samuel's response after a short delay
    setTimeout(() => {
      setIsTyping(false)

      const responses = [
        "En mi plan de 100 días, garantizaremos la estabilidad económica y el suministro de combustibles.",
        "Mi propuesta incluye 500.000 plazas técnicas en 5 años para reducir el desempleo juvenil.",
        "La transparencia es fundamental. Implementaremos auditorías en tiempo real de todas las empresas públicas.",
        "Para La Paz, modernizaremos el transporte público con flotas eléctricas y mejoraremos el suministro de agua.",
        "Creo firmemente en una economía de mercado con rostro social, que genere oportunidades para todos los bolivianos.",
        "¡Gracias por tu interés! Te invito a unirte como voluntario en nuestra campaña.",
      ]

      const samuelResponse: Message = {
        id: messages.length + 2,
        sender: "samuel",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      const newUpdatedMessages = [...updatedMessages, samuelResponse]
      setMessages(newUpdatedMessages)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("chatMessages", JSON.stringify(newUpdatedMessages))
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Format timestamp for display
  const formatTimestamp = (timestamp: Date) => {
    if (!(timestamp instanceof Date)) {
      timestamp = new Date(timestamp)
    }
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Suggested topics
  const suggestedTopics = [
    { icon: <Calendar className="h-3 w-3" />, text: "Plan 100 días" },
    { icon: <MapPin className="h-3 w-3" />, text: "Propuestas" },
    { icon: <FileText className="h-3 w-3" />, text: "Economía" },
    { icon: <Info className="h-3 w-3" />, text: "Sobre Samuel" },
  ]

  const handleTopicClick = (topic: string) => {
    setMessage(topic)
    inputRef.current?.focus()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="floating-button group"
        aria-label="Chat con Samuel Doria Medina"
      >
        <div className="absolute inset-0 bg-primary rounded-full opacity-0 scale-90 group-hover:opacity-10 group-hover:scale-110 transition-all duration-300"></div>
        <Image
          src="/placeholder.svg?height=64&width=64"
          alt="Samuel Doria Medina"
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-sm z-50 rounded-xl shadow-2xl overflow-hidden flex flex-col bg-white animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Samuel Doria Medina"
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-white/30"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-primary"></div>
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Samuel Doria Medina</h3>
                <p className="text-xs opacity-80">Candidato Presidencial 2025 • En línea</p>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/chat"
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors mr-1"
                aria-label="Expandir chat"
              >
                <Maximize2 className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[350px] bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "samuel" && (
                  <div className="flex-shrink-0 mr-2">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Samuel Doria Medina"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border border-white shadow-sm"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border border-gray-100 shadow-sm rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-white/70" : "text-gray-400"}`}>
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 mr-2">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Samuel Doria Medina"
                    width={32}
                    height={32}
                    className="rounded-full object-cover border border-white shadow-sm"
                  />
                </div>
                <div className="bg-white border border-gray-100 rounded-xl rounded-bl-none p-3 shadow-sm max-w-[80%]">
                  <div className="flex space-x-1.5">
                    <div
                      className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            {/* Suggested topics */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicClick(topic.text)}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded-full transition-colors"
                >
                  {topic.icon}
                  <span>{topic.text}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-transparent py-2 px-3 focus:outline-none resize-none min-h-[40px] max-h-[80px] text-sm rounded-l-full"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={message.trim() === "" || isTyping}
                className="bg-primary text-white p-2 rounded-full mr-1 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-[10px] text-gray-500">Conversa con Samuel sobre sus propuestas</p>
              <Link href="/chat" className="text-xs text-primary hover:underline font-medium">
                Abrir chat completo
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Minimized chat indicator when chat is open */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed bottom-6 right-6 z-40 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Minimizar chat"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      )}
    </>
  )
}
