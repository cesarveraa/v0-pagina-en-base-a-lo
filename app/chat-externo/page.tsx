"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ExternalChatPage() {
  // Estado para controlar el loading del iframe
  const [loading, setLoading] = useState(true);
  // Estado para detectar si el iframe devolvió error (p. ej. bloqueado)
  const [iframeError, setIframeError] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Cuando el iframe logre cargar (onLoad), ocultamos el spinner
  const handleLoad = () => {
    setLoading(false);
  };

  // Si el iframe falla (onError), ocultamos el spinner y activamos el fallback
  const handleError = () => {
    setLoading(false);
    setIframeError(true);
  };

  // URL del chat en Character.ai. Puede variar si usas otra ruta o distinto chatID.
  const CHARACTER_AI_URL =
    "https://character.ai/chat/09DCYFnShJ4amZK4xg6EwqZAuKtm0OEkmhvHQlXHl64";

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* --------------------------------------------------------------------- */}
      {/* Header con botón “Volver” */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center shadow-sm">
        <Link href="/" className="text-gray-500 hover:text-primary flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Volver a la página principal</span>
        </Link>
      </header>

      {/* --------------------------------------------------------------------- */}
      {/* Contenedor principal: aquí mostramos spinner, iframe o fallback según el caso */}
      <div className="flex-1 relative">
        {/* 1. Si aún estamos en “loading” y no hubo error, mostramos spinner */}
        {loading && !iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-gray-700">Cargando chat externo…</div>
          </div>
        )}

        {/* 2. Si NO hubo error en el iframe, intentamos renderizarlo */}
        {!iframeError && (
          <iframe
            ref={iframeRef}
            onLoad={handleLoad}
            onError={handleError}
            src={CHARACTER_AI_URL}
            className="w-full h-full border-none"
            allow="camera; microphone; autoplay"
          />
        )}

        {/* 3. Si hubo error de carga (p. ej. X-Frame-Options), mostramos fallback */}
        {iframeError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-gray-50">
            <p className="mb-4 text-center text-gray-800">
              Ha sido imposible cargar el chat embebido debido a restricciones del navegador o
              políticas de seguridad. 
            </p>
            <a
              href={CHARACTER_AI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Abrir chat en Character.ai
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
