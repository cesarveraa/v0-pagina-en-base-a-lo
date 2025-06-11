"use client"

import { useEffect, useRef, useState } from "react"
import MicrophoneConsentModal from "./MicrophoneConsentModal"

export default function ElevenLabsWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)
  const [canUseMic, setCanUseMic] = useState(false)

  useEffect(() => {
    // Verificamos permiso inicial
    navigator.permissions
      .query({ name: "microphone" as PermissionName })
      .then((status) => {
        if (status.state === "granted") {
          setCanUseMic(true)
        } else {
          setShowModal(true)
        }
      })
      .catch(() => {
        // Fallback por si el navegador no soporta navigator.permissions
        setShowModal(true)
      })
  }, [])

  useEffect(() => {
    if (!canUseMic) return

    const script = document.createElement("script")
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed"
    script.async = true
    script.type = "text/javascript"
    document.body.appendChild(script)

    const element = document.createElement("elevenlabs-convai")
    element.setAttribute("agent-id", "agent_01jvzxxvtre4fbbx7kfqrjpa4g")

    containerRef.current?.appendChild(element)

    return () => {
      document.body.removeChild(script)
      containerRef.current?.removeChild(element)
    }
  }, [canUseMic])

  const requestMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setCanUseMic(true)
      setShowModal(false)
    } catch (err) {
      alert("No se pudo acceder al micrófono. Por favor revisa los permisos en tu navegador.")
    }
  }

  return (
    <>
      {showModal && <MicrophoneConsentModal onAccept={requestMicrophoneAccess} />}
      <div ref={containerRef} className="w-full max-w-md mx-auto my-4" />
    </>
  )
}
