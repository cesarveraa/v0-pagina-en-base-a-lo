import Header from "@/components/header"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import IdearioSection from "@/components/ideario-section"
import Plan100Section from "@/components/plan100-section"
import MultimediaSection from "@/components/multimedia-section"
import SolucionesDepartamentoSection from "@/components/soluciones-departamento-section"
import TestimoniosSection from "@/components/testimonios-section"
import AgendaSection from "@/components/agenda-section"
import ParticipaSection from "@/components/participa-section"
import DonaSection from "@/components/dona-section"
import ContactoSection from "@/components/contacto-section"
import Footer from "@/components/footer"
import FloatingButton from "@/components/floating-button"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <IdearioSection />
      <Plan100Section />
      <MultimediaSection />
      <SolucionesDepartamentoSection />
      <TestimoniosSection />
      <AgendaSection />
      <ParticipaSection />
      <DonaSection />
      <ContactoSection />
      <Footer />
      <FloatingButton />
    </main>
  )
}
