import Header from "@/app/components/Header"
import Formulario from "@/components/Formulario"
import HeroSection from "@/app/components/HeroSection"

import BeneficiosSection from "@/app/components/BeneficiosSection"
import ComoFuncionaSection from "@/app/components/ComoFuncionaSection"
import ClientesSection from "@/app/components/ClientesSection"
import ComparacionSection from "@/app/components/ComparacionSection"
import Footer from "@/app/components/Footer"

export default function Home() {
  return (
    <div>
      <Header />
<HeroSection />
<BeneficiosSection />
<ComoFuncionaSection />
<ClientesSection />
<ComparacionSection />

  <Formulario />
  <Footer />
    </div>
  )
}