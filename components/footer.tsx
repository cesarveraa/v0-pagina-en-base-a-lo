import Link from "next/link"

export default function Footer() {
  const quickLinks = [
    { label: "Política de Privacidad", href: "/politica" },
    { label: "Términos y Condiciones", href: "/terminos" },
  ]

  return (
    <footer className="bg-primary text-white py-8 relative">
      {/* Aguayo pattern border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-accent">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #003A70 0px, #003A70 10px, #FFC20E 10px, #FFC20E 20px)",
          }}
        ></div>
      </div>

      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-accent transition-colors flex items-center">
                    <span className="mr-2">•</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campaign Data */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Datos de la Campaña</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Unidad Nacional S.R.L.
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                RUT: 12345678-9
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Oficina Tributaria: La Paz
              </li>
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Créditos</h3>
            <p>Diseño y Desarrollo Web © 2025 Campaña 100 Días</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p>© 2025 Samuel Doria Medina - Todos los derechos reservados</p>

          {/* Bolivian flag colors */}
          <div className="mt-4 flex justify-center">
            <div className="flex h-2 w-24">
              <div className="w-1/3 bg-[#D52B1E]"></div> {/* Red */}
              <div className="w-1/3 bg-[#F9E300]"></div> {/* Yellow */}
              <div className="w-1/3 bg-[#007934]"></div> {/* Green */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
