"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#hero", ariaLabel: "Ir a Inicio" },
  { label: "Sobre Samuel", href: "#sobre", ariaLabel: "Información sobre Samuel Doria Medina" },
  { label: "Propuestas", href: "#ideario", ariaLabel: "Ver Propuestas de Gobierno" },
  { label: "Agenda & Eventos", href: "#agenda", ariaLabel: "Ver Agenda y Eventos" },
  { label: "Noticias & Multimedia", href: "#multimedia", ariaLabel: "Noticias y Multimedia" },
  { label: "Participa (Voluntarios)", href: "#participa", ariaLabel: "Formulario de Voluntarios" },
  { label: "Dona", href: "#dona", ariaLabel: "Donaciones a la campaña" },
  { label: "Contacto", href: "#contacto", ariaLabel: "Formulario de Contacto" },
  { label: "Chat con Samuel", href: "/chat", ariaLabel: "Chatear con Samuel Doria Medina" },
  // ← Para “Chat Externo” NO usamos href, sino onClick
  {
    label: "Chat Externo",
    href: "", // lo dejamos vacío porque manejamos onClick
    ariaLabel: "Abrir chat externo (Character.ai)",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para abrir Character.ai en nueva pestaña
  const openExternalChat = () => {
    const url = "https://character.ai/chat/09DCYFnShJ4amZK4xg6EwqZAuKtm0OEkmhvHQlXHl64";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo + Título */}
        <Link href="#hero" className="flex items-center">
          <div className="w-24 h-24 relative mr-2 flex items-center justify-center">
            <Image
              src="/images/100diaslogo.png"
              alt="Logo 100 Días Carajo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <span className={`font-heading font-bold text-xl ${isScrolled ? "text-primary" : "text-white"}`}>
            Samuel Doria Medina
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link, idx) => {
            // Si es “Chat Externo”, renderizamos un botón con onClick
            if (link.label === "Chat Externo") {
              return (
                <button
                  key={idx}
                  aria-label={link.ariaLabel}
                  onClick={openExternalChat}
                  className={`font-medium hover:text-accent transition-colors relative group bg-transparent border-none p-0 ${
                    isScrolled ? "text-primary" : "text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              );
            }

            // Para el resto de enlaces, usamos <Link>
            return (
              <Link
                key={idx}
                href={link.href}
                aria-label={link.ariaLabel}
                className={`font-medium hover:text-accent transition-colors relative group ${
                  isScrolled ? "text-primary" : "text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        {/* Botón Mobile */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? "text-primary" : "text-white"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? "text-primary" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Navegación Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => {
                if (link.label === "Chat Externo") {
                  return (
                    <button
                      key={idx}
                      aria-label={link.ariaLabel}
                      onClick={() => {
                        openExternalChat();
                        setIsMenuOpen(false);
                      }}
                      className="text-primary font-medium hover:text-accent transition-colors py-2 border-b border-gray-100 bg-transparent text-left"
                    >
                      {link.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={idx}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-primary font-medium hover:text-accent transition-colors py-2 border-b border-gray-100"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
