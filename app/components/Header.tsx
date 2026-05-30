'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useConfig } from '@/hooks/useConfig'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, ChevronDown, ChevronUp, 
  BookOpen, LayoutDashboard, Settings, 
  MessageSquare, ChevronRight, Home,
  ShoppingBag, Sparkles, BarChart3,
  ClipboardList, CreditCard, Package, Image as ImageIcon
} from 'lucide-react'

// Sub-items del Panel Cliente (8 Secciones)
const panelSubItems = [
  { href: '/panel/dashboard', label: 'Resumen', subLabel: 'Pantalla', icon: <LayoutDashboard size={18} />, color: 'text-slate-400' },
  { href: '/panel/analytics', label: 'Métricas', subLabel: 'Google', icon: <BarChart3 size={18} />, color: 'text-slate-400' },
  { href: '/panel/pedidos', label: 'Pedidos', subLabel: 'Off-line', icon: <ClipboardList size={18} />, color: 'text-emerald-500' },
  { href: '/panel/webhook', label: 'Pagos', subLabel: 'On-line', icon: <CreditCard size={18} />, color: 'text-blue-500' },
  { href: '/panel/productos', label: 'Productos', subLabel: 'Gestión', icon: <Package size={18} />, color: 'text-orange-500' },
  { href: '/panel/banners', label: 'Publicidad', subLabel: 'Banners', icon: <ImageIcon size={18} />, color: 'text-purple-500' },
  { href: '/panel/merchant', label: 'Merchant', subLabel: 'Google', icon: <ShoppingBag size={18} />, color: 'text-blue-900' },
  { href: '/panel/ajustes', label: 'Estilo', subLabel: 'Branding', icon: <Settings size={18} />, color: 'text-red-600' },
]

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vendedor = searchParams.get("vendedor")
  const config = useConfig()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showPanelOptions, setShowPanelOptions] = useState(false)
  const [dynamicCats, setDynamicCats] = useState<any[]>([])

  // Carga de categorías para la sección inferior del sidebar
  useEffect(() => {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setDynamicCats(data) })
      .catch(() => console.log("Categorías no disponibles"))
  }, [])

  // Lógica de Soporte Técnico
  const supportLink = vendedor 
    ? `https://wa.me/5491153778475?text=Soporte%20Cuenta:%20${vendedor}`
    : "/#contacto";

  const getHref = (href: string) => {
    if (href.startsWith('http') || href === '#' || href.startsWith('/#')) return href;
    return vendedor ? `${href}?vendedor=${vendedor}` : href;
  }

  return (
    <>
      <header className="sticky top-0 z-60 bg-black border-b border-white/10 shadow-2xl font-sans">
        {/* BOTÓN HAMBURGUESA */}
        <button onClick={() => setIsSidebarOpen(true)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-red-600 transition-all">
          <Menu size={30} />
        </button>

        {/* LOGO DINÁMICO */}
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-center">
          <Link href={getHref('/')}>
            <div style={{ height: `${config.logoSize}px` }} className="relative flex items-center transition-all duration-300">
              <img src={config.logoUrl} alt={config.nombreMedio} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")} />
            </div>
          </Link>
        </div>

        {/* FILA 1 NAVEGACIÓN */}
        <div className="border-t border-white/5 bg-neutral-950">
          <div className="max-w-3xl mx-auto px-3 py-2 flex items-center justify-center">
            <nav className="flex justify-center gap-1">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Panel', href: '/panel' },
                { label: 'Empezar', href: '/#contacto' }
              ].map((item) => (
                <Link key={item.label} href={getHref(item.href)}
                  style={{ backgroundColor: pathname === item.href ? config.colorMedio1 : 'transparent', borderRadius: `${config.buttonRadius}px`, borderColor: item.label === 'Empezar' ? config.colorMedio1 : 'transparent' }}
                  className={`px-4 py-2 min-w-18.75 rounded-full text-center transition-all text-[11px] font-bold uppercase ${pathname === item.href ? 'text-white' : 'text-white/60 hover:text-white'} ${item.label === 'Empezar' ? 'border ml-2' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* --- SIDEBAR MAESTRO --- */}
      <div className={`fixed inset-0 z-70 transition-all duration-500 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        
        <aside className={`absolute top-0 left-0 h-full w-full max-w-[320px] bg-neutral-950 border-r border-white/10 flex flex-col transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <div className="p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-red-600">SaaS Identity</span>
              <span className="text-[10px] text-white/30 uppercase font-bold">{config.nombreMedio}</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            
            <nav className="flex flex-col gap-1">
              <p className="text-[9px] font-black text-white/20 uppercase mb-2 ml-4 tracking-[0.2em]">General</p>
              <Link href={getHref('/')} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 transition-all uppercase text-xs font-bold">
                <Home size={20} className="text-slate-500" /> Inicio
              </Link>

              {/* 🛡️ ACORDEÓN PANEL CLIENTE */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setShowPanelOptions(!showPanelOptions)}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all uppercase text-xs font-bold ${showPanelOptions ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/80'}`}
                >
                  <div className="flex items-center gap-4">
                    <LayoutDashboard size={20} className="text-blue-500" /> Panel Cliente
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${showPanelOptions ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showPanelOptions && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-1 mt-1 ml-4 border-l border-white/10 pl-2">
                      {panelSubItems.map((item) => (
                        <Link key={item.href} href={getHref(item.href)} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`${item.color} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all`}>{item.icon}</div>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-white group-hover:text-red-500 uppercase">{item.label}</span>
                              <span className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">{item.subLabel}</span>
                            </div>
                          </div>
                          <ChevronRight size={12} className="text-white/10 group-hover:text-red-600" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="#" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 transition-all uppercase text-xs font-bold">
                <BookOpen size={20} className="text-emerald-500" /> Documentación
              </Link>
              
              <Link href={supportLink} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl bg-red-600/10 border border-red-600/20 mt-2 group">
                <MessageSquare size={20} className="text-red-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white uppercase">Soporte Técnico</span>
                  <span className="text-[8px] text-red-500 font-bold uppercase tracking-tighter">{vendedor ? 'Prioridad Cliente' : 'Consultar Preventa'}</span>
                </div>
              </Link>
            </nav>

            {/* CATEGORÍAS DINÁMICAS */}
            {dynamicCats.length > 0 && (
              <nav className="flex flex-col gap-1 border-t border-white/5 pt-6">
                <p className="text-[9px] font-black text-white/20 uppercase mb-2 ml-4 tracking-[0.2em]">Categorías</p>
                {dynamicCats.map((cat) => (
                  <Link key={cat.slug} href={getHref(`/categoria/${cat.slug}`)} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 group">
                    <div className="w-6 h-6 shrink-0 opacity-40 group-hover:opacity-100"><img src={`/icons/${cat.slug}.png`} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} /></div>
                    <span className="text-xs font-bold uppercase">{cat.label}</span>
                    <ChevronRight size={14} className="ml-auto opacity-10 group-hover:opacity-100" />
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}