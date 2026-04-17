'use client'
import { useEffect, useState } from "react"
import Image from "next/image"

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "beneficios", label: "Beneficios" },
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "clientes", label: "Clientes" },
  { id: "compará", label: "Compará" },
  { id: "contacto", label: "Empezar" },
]

export default function Header() {

  const [active, setActive] = useState("")

  const handleNavClick = (e: any, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return

    const y = el.getBoundingClientRect().top + window.scrollY - 140

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      let current = ""

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id)
        if (!el) return

        const top = el.offsetTop - 160
        if (window.scrollY >= top) {
          current = sec.id
        }
      })

      setActive(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-[#e7e1ccd0] shadow-md">

      {/* LOGO */}
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-center">
        <Image
          src="/logo.png"
          alt="Tienda de Tiendas"
          width={500}
          height={150}
          priority
          className="w-full max-w-[320px] md:max-w--130px h-auto object-contain"
        />
      </div>

      {/* NAV */}
      <div className="border-t">
        <nav className="max-w-3xl mx-auto px-4 py-2 flex justify-center gap-4 text-xs md:text-sm">

          {sections.map((sec) => (
            <a
              key={sec.id}
              onClick={(e)=>handleNavClick(e, sec.id)}
              className={`
                cursor-pointer transition text-center leading-tight
                ${active === sec.id
                  ? "font-bold border-b-2 border-black"
                  : "opacity-70 hover:opacity-100"
                }
              `}
            >
              {sec.id === "como-funciona"
                ? <>Cómo<br/>funciona</>
                : sec.label}
            </a>
          ))}

        </nav>
      </div>

    </header>
  )
}