// components/ElevenLabsWidget.tsx
"use client"

import { useEffect, useRef } from "react"

export default function ElevenLabsWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://elevenlabs.io/convai-widget/index.js"
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
  }, [])

  return <div ref={containerRef} className="w-full max-w-md mx-auto my-4" />
}
