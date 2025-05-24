// components/ElevenLabsWrapper.tsx
"use client"

import dynamic from "next/dynamic"

const ElevenLabsWidget = dynamic(() => import("./ElevenLabsWidget"), { ssr: false })

export default function ElevenLabsWrapper() {
  return <ElevenLabsWidget />
}
