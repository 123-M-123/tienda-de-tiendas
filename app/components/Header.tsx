'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { 
  Menu, X, ChevronDown, ChevronUp, 
  BookOpen, LayoutDashboard, Settings, 
  MessageSquare, ChevronRight 
} from 'lucide-react'

// Fila 2 (Oculta en el Header - Glassmorphism)
const hiddenRow = [
  { href: '/beneficios', label: 'Beneficios' },
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/compara', label: 'Compará' },
]

// Fila 1 (Visible en el Header - Navegación Principal)
const mainRow = [
  { href: '/', label: 'Inicio' },
  { href: '/panel', label: 'Panel Cliente' },
  { href: '/#contacto', label: 'Empezar' },
]

// Navegador Lateral (Sidebar - Secciones Técnicas)
const sideNavItems = [
  { href: '#', label: 'Documentación', icon: <BookOpen size={18} /> },
  { href: '/panel/dashboard', label: 'Panel de Control', icon: <LayoutDashboard size={18} /> },
  { href: '#', label: 'Configuración SaaS', icon: <Settings size={18} /> },
  { href: 'https://wa.me/5491153778475', label: 'Soporte Técnico', icon: <MessageSquare size={18} /> },
]

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vendedor = searchParams.get("vendedor")
  
  const [isRow2Open, setIsRow2Open] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/#contacto') return false
    return pathname === href
  }

  // Helper para persistencia del vendedor en todos los links
  const getHref = (href: string) => {
    if (href.startsWith('http') || href === '#') return href;
    return vendedor ? `${href}?vendedor=${vendedor}` : href;
  }

  return (
    <>
      {/* --- HEADER PRINCIPAL --- */}
      <header className="sticky top-0 z-60 bg-black border-b border-white/10 shadow-2xl">
        
        {/* BOTÓN HAMBURGUESA (IZQUIERDA) */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute left-4 top-6 p-2 text-white/70 hover:text-red-600 transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* LOGO CENTRAL */}
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-center">
          <Link href={getHref('/')}>
            <Image
              src="/logo-nuevo.png"
              alt="Tienda de Tiendas"
              width={280}
              height={70}
              priority
              className="w-auto h-10 md:h-12 object-contain"
            />
          </Link>
        </div>

        <div className="border-t border-white/5 bg-neutral-950">
          {/* FILA 1: NAVEGACIÓN CENTRAL */}
          <div className="max-w-3xl mx-auto px-3 py-2 relative flex items-center justify-center">
            <nav className="flex justify-center gap-1">
              {mainRow.map((item) => (
                <Link
                  key={item.href}
                  href={getHref(item.href)}
                  className={`
                    px-4 py-2 min-w-18.75 rounded-full text-center transition-all text-[11px] md:text-xs font-bold uppercase tracking-tight
                    ${isActive(item.href)
                      ? 'bg-red-600 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                    ${item.label === 'Empezar' ? 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white ml-2' : ''}
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* BOTÓN TOGGLE FILA 2 */}
            <button
              onClick={() => setIsRow2Open(!isRow2Open)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-red-600 transition-colors"
            >
              {isRow2Open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* FILA 2: DESPLEGABLE CON GLASSMORPHISM */}
          <div
            className={`
              overflow-hidden transition-all duration-500 ease-in-out
              ${isRow2Open ? 'max-h-40 bg-white/5 backdrop-blur-xl border-t border-white/5' : 'max-h-0'}
            `}
          >
            <nav className="max-w-3xl mx-auto px-3 py-4 flex justify-center gap-4 flex-wrap">
              {hiddenRow.map((item) => (
                <Link
                  key={item.href}
                  href={getHref(item.href)}
                  className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40 hover:text-red-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* --- SIDEBAR LATERAL (NAVEGADOR TÉCNICO) --- */}
      <div 
        className={`fixed inset-0 z-70 transition-all duration-500 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay con desenfoque */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Panel Sidebar */}
        <aside 
          className={`absolute top-0 left-0 h-full w-full max-w-75 bg-neutral-950 border-r border-white/10 p-6 flex flex-col transition-transform duration-500 ease-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
              <span className="text-xs font-black text-red-600 uppercase tracking-widest">SaaS Menu</span>
              <span className="text-[10px] text-white/30 uppercase font-bold">Tienda de Tiendas</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white/50 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {sideNavItems.map((item) => (
              <Link
                key={item.label}
                href={getHref(item.href)}
                onClick={() => setIsSidebarOpen(false)}
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="text-red-600 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-white/80 group-hover:text-white uppercase">
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={14} className="text-white/10 group-hover:text-red-600 transition-all" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="bg-red-600/5 border border-red-600/10 p-4 rounded-xl">
              <p className="text-[10px] font-black text-red-600 uppercase mb-1">Status</p>
              <p className="text-[9px] text-white/40 uppercase tracking-widest">
                Version 2.0 — High Performance
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}