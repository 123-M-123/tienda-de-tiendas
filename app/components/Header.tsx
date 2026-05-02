'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const hiddenRow = [
  { href: '/beneficios', label: 'Beneficios' },
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/compara', label: 'Compará' },
]

const mainRow = [
  { href: '/', label: 'Inicio' },
  { href: '/panel', label: 'Panel Cliente' },
  { href: '/#contacto', label: 'Empezar' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/#contacto') return pathname === '/'
    return pathname === href
  }

  const renderButton = (item: any) => (
    <Link
      key={item.href}
      href={item.href}
      className={`
        px-2 py-2 min-w-20 rounded-md text-center leading-tight transition text-xs md:text-sm
        ${isActive(item.href)
          ? 'font-bold border-b-2 border-black'
          : 'opacity-70 hover:opacity-100'
        }
      `}
    >
      {item.label === 'Cómo funciona'
        ? <>Cómo<br />funciona</>
        : item.label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 bg-[#e7e1ccd0] shadow-md">

      {/* LOGO */}
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Tienda de Tiendas"
            width={500}
            height={150}
            priority
            className="w-full max-w-80 md:max-w-80 h-auto object-contain"
          />
        </Link>
      </div>

      <div className="border-t">

        {/* FILA PRINCIPAL */}
        <div className="max-w-3xl mx-auto px-3 pt-2 pb-2 relative">

          <button
            onClick={() => setOpen(!open)}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 font-bold text-sm"
          >
            {open ? '−' : '+'}
          </button>

          <nav className="flex justify-center gap-1 pr-8">
            {mainRow.map(renderButton)}
          </nav>
        </div>

        {/* FILA OCULTA */}
        <div
          className={`
            overflow-hidden transition-all duration-300
            ${open ? 'max-h-40 pb-2' : 'max-h-0'}
          `}
        >
          <nav className="max-w-3xl mx-auto px-3 flex justify-center gap-1 flex-wrap">
            {hiddenRow.map(renderButton)}
          </nav>
        </div>

      </div>
    </header>
  )
}