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

      {/* FILA 1 */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* IZQUIERDA - Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          className="text-black"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17" cy="7" r="1"/>
          </svg>
        </a>

        {/* CENTRO - LOGO */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Image src="/logo.png" alt="TECNO EG" width={210} height={84} priority
            style={{ objectFit: 'contain', height: 'auto', maxHeight: 84 }} />
        </div>

        {/* DERECHA - BOTÓN */}
        <a
          href="https://wa.me/5491153778475"
          className="bg-black text-white px-4 py-2 rounded-xl text-sm"
        >
          Empezar
        </a>

      </div>

      {/* FILA 2 - NAVEGACIÓN */}
      <div className="border-t">
        <nav className="max-w-6xl mx-auto px-4 py-2 flex gap-3 overflow-x-auto text-sm">

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
