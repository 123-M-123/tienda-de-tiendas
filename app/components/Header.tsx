'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight, LayoutGrid, Globe, Zap, Users } from 'lucide-react'

const hiddenRow = [
  { href: '/beneficios', label: 'Beneficios', icon: <Zap size={16} /> },
  { href: '/como-funciona', label: 'Cómo funciona', icon: <LayoutGrid size={16} /> },
  { href: '/clientes', label: 'Clientes', icon: <Users size={16} /> },
  { href: '/compara', label: 'Compará', icon: <Globe size={16} /> },
]

const mainRow = [
  { href: '/', label: 'Inicio' },
  { href: '/panel', label: 'Panel Cliente' },
]

export default function Header() {
  const pathname = usePathname()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Efecto de scroll para el header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* 1. TOP HEADER BAR */}
      <header 
        className={`sticky top-0 z-[60] transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-black py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LADO IZQUIERDO: LOGO + MENU TRIGGER */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSideNavOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white group"
            >
              <Menu size={24} className="group-hover:text-red-600 transition-colors" />
            </button>
            
            <Link href="/" className="transition-transform hover:scale-105">
              <Image
                src="/logo-nuevo.png"
                alt="Tienda de Tiendas"
                width={200}
                height={50}
                priority
                className="w-auto h-8 md:h-10 object-contain"
              />
            </Link>
          </div>

          {/* LADO DERECHO: NAV PRINCIPAL + CTA */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {mainRow.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-black uppercase tracking-widest transition-colors ${
                    pathname === item.href ? 'text-red-600' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <Link 
              href="/#contacto" 
              className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-tighter transition-all shadow-lg shadow-red-600/20"
            >
              Empezar
            </Link>
          </div>
        </div>
      </header>

      {/* 2. SIDE NAVIGATION (SIDEBAR) CON DESENFOQUE */}
      <div 
        className={`fixed inset-0 z-[70] transition-all duration-500 ${
          isSideNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay oscuro */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSideNavOpen(false)}
        />

        {/* Panel Lateral */}
        <aside 
          className={`absolute top-0 left-0 h-full w-full max-w-[320px] bg-black/90 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col transition-transform duration-500 ease-out ${
            isSideNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-12">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Navegación</span>
            <button 
              onClick={() => setIsSideNavOpen(false)}
              className="p-2 text-white/50 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {/* Secciones de Exploración */}
            {hiddenRow.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSideNavOpen(false)}
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="text-red-600 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold text-white/80 group-hover:text-white uppercase tracking-tight">
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={16} className="text-white/20 group-hover:text-red-600 transition-colors" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="bg-red-600/10 border border-red-600/20 p-6 rounded-2xl">
              <p className="text-[10px] font-black text-red-600 uppercase mb-2">Soporte VIP</p>
              <p className="text-xs text-white/70 leading-relaxed mb-4">¿Necesitás ayuda con tu despliegue SaaS?</p>
              <Link 
                href="https://wa.me/5491153778475" 
                className="text-xs font-bold text-white hover:text-red-600 transition-colors"
              >
                Hablar con un experto →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}