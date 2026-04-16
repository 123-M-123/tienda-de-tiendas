'use client'
import Image from "next/image";

export default function Header() {

  const handleNavClick = (e: any, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      {/* FILA LOGO */}
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-center">

        <div className="w-full flex justify-center">
          <Image
            src="/logo.png"
            alt="Tienda de Tiendas"
            width={500}
            height={150}
            priority
            className="w-full max-w-[420px] md:max-w-[600px] h-auto object-contain"
          />
        </div>

      </div>

      {/* NAV */}
      <div className="border-t">
        <nav className="max-w-2xl mx-auto px-4 py-2 flex gap-3 overflow-x-auto text-sm justify-center">

          <a href="#beneficios" onClick={(e)=>handleNavClick(e,'beneficios')} className="whitespace-nowrap hover:opacity-70">
            Beneficios
          </a>

          <a href="#como-funciona" onClick={(e)=>handleNavClick(e,'como-funciona')} className="whitespace-nowrap hover:opacity-70">
            Cómo funciona
          </a>

          <a href="#comparacion" onClick={(e)=>handleNavClick(e,'comparacion')} className="whitespace-nowrap hover:opacity-70">
            Comparación
          </a>

          <a href="#contacto" onClick={(e)=>handleNavClick(e,'contacto')} className="whitespace-nowrap hover:opacity-70">
            Formulario
          </a>

        </nav>
      </div>

    </header>
  )
}