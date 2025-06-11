"use client"

import { Mic } from "lucide-react"

interface Props {
  onAccept: () => void
}

export default function MicrophoneConsentModal({ onAccept }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
            <Mic className="text-blue-600 dark:text-blue-400 w-8 h-8" />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">Permiso de micrófono requerido</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          Para usar el asistente de voz necesitas habilitar el micrófono. Si no das permiso, no podrás interactuar por voz.
        </p>
        <button
          onClick={onAccept}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
