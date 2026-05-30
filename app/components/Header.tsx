'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useConfig } from '@/hooks/useConfig'
import { 
  Menu, X, ChevronDown, ChevronUp, 
  LayoutDashboard, Settings, MessageSquare, ChevronRight, Sparkles 
} from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vendedor = searchParams.get("vendedor")
  const config = useConfig()
  
  const [isRow2Open, setIsRow2Open] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [cats, setCats] = useState<any[]>([])

  // 🪄 Cargamos categorías dinámicas para el sidebar
  useEffect(() => {
    fetch('/api/categorias').then(res => res.json()).then(data => setCats(data))
  }, [])

  const getHref = (href: string) => {
    if (href.startsWith('http') || href === '#') return href;
    return vendedor ? `${href}?vendedor=${vendedor}` : href;
  }

  return (
    <>
      <header className="sticky top-0 z-60 bg-black border-b border-white/10 shadow-2xl">
        <button onClick={() => setIsSidebarOpen(true)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-red-600 transition-colors">
          <Menu size={28} />
        </button>

        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-center">
          <Link href={getHref('/')}>
            <div style={{ height: `${config.logoSize}px` }} className="relative flex items-center transition-all duration-300">
              <img src={config.logoUrl} alt={config.tiendaNombre} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
            </div>
          </Link>
        </div>

        <div className="border-t border-white/5 bg-neutral-950">
          <div className="max-w-3xl mx-auto px-3 py-2 relative flex items-center justify-center">
            <nav className="flex justify-center gap-1">
              {['Inicio', 'Panel Cliente', 'Empezar'].map((label) => {
                const href = label === 'Inicio' ? '/' : label === 'Panel Cliente' ? '/panel' : '/#contacto';
                const active = pathname === href;
                return (
                  <Link key={label} href={getHref(href)} 
                    style={{ 
                      backgroundColor: active ? config.colorPrimario : 'transparent',
                      borderRadius: `${config.buttonRadius}px` 
                    }}
                    className="px-4 py-2 text-[11px] font-bold uppercase text-white/70 hover:text-white"
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
            <button onClick={() => setIsRow2Open(!isRow2Open)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/50">
              {isRow2Open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* SIDEBAR CON CATEGORÍAS AUTOMÁTICAS */}
      <div className={`fixed inset-0 z-70 transition-all duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <aside className={`absolute top-0 left-0 h-full w-full max-w-75 bg-neutral-950 border-r border-white/10 p-6 flex flex-col transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-10">
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: config.colorPrimario }}>Catálogo SaaS</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
          </div>
          
          <nav className="flex flex-col gap-1 overflow-y-auto">
            <p className="text-[9px] font-black text-white/20 uppercase mb-2 ml-4">Categorías</p>
            {cats.map(cat => (
              <Link key={cat.slug} href={getHref(`/categoria/${cat.slug}`)} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 group">
                <div className="w-6 h-6 shrink-0 opacity-50 group-hover:opacity-100">
                  <img src={`/icons/${cat.slug}.png`} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
                <span className="text-xs font-bold uppercase">{cat.label}</span>
                <ChevronRight size={14} className="ml-auto opacity-10 group-hover:opacity-100 transition-all" />
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}