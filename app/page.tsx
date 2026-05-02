// app/page.tsx

import Formulario from "@/components/Formulario"
import HeroSection from "@/app/components/HeroSection"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Formulario />
    </div>
  )
}