'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useConfig } from '@/hooks/useConfig'
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  LayoutDashboard, 
  Settings, 
  MessageSquare, 
  ChevronRight, 
  Home,
  ShoppingBag, 
  Sparkles, 
  BarChart3,
  ClipboardList, 
  CreditCard, 
  Package, 
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react'

// --- CONFIGURACIÓN DE FILAS (FUERA DEL COMPONENTE PARA ESTABILIDAD) ---

// Fila 2: Información de Venta (Oculta)
const infoRow = [
  { href: '/beneficios', label: 'Beneficios' },
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/compara', label: 'Compará' },
]

// Sub-items del Panel Cliente (8 Secciones Técnicas)
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
  const [isRow2Open, setIsRow2Open] = useState(false)
  const [showPanelOptions, setShowPanelOptions] = useState(false)
  const [dynamicCats, setDynamicCats] = useState<any[]>([])

  // 🪄 LÓGICA DE CATEGORÍAS DINÁMICAS (Mantenida intacta)
  useEffect(() => {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => { 
        if (Array.isArray(data)) setDynamicCats(data) 
      })
      .catch(() => console.log("Categorías no disponibles"))
  }, [])

  // Sensor de modo simulación para el botón verde
  const isSimulando = pathname.includes('/panel') && config.isGuestMode;

  // Lógica de aislamiento: Home fija, Preview dinámica
  const isPreviewPage = pathname.includes('/preview');
  const displayLogo = isPreviewPage ? config.logoUrl : "/logo-nuevo.png";
  const displaySize = isPreviewPage ? config.logoSize : 80;

  const getHref = (href: string) => {
    if (href.startsWith('http') || href === '#' || href.startsWith('/#')) return href;
    return vendedor ? `${href}?vendedor=${vendedor}` : href;
  }

  return (
    <>
      <header className="sticky top-0 z-60 bg-black border-b border-white/10 shadow-2xl font-sans">
        
        {/* HAMBURGUESA SIDEBAR */}
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-red-600 transition-all"
        >
          <Menu size={30} />
        </button>

        {/* LOGO DINÁMICO */}
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-center">
          <Link href={getHref('/')}>
            <div style={{ height: `${displaySize}px` }} className="relative flex items-center transition-all duration-300">
              <img 
                src={displayLogo} 
                alt="Logo" 
                className="h-full w-auto object-contain" 
                onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")} 
              />
            </div>
          </Link>
        </div>

        {/* FILA 1: NAVEGACIÓN (INICIO / INVITADO / EMPEZAR) */}
        <div className="border-t border-white/5 bg-neutral-950">
          <div className="max-w-5xl mx-auto px-3 py-2 flex items-center justify-between">
            <nav className="flex items-center gap-1">
              <Link 
                href={getHref('/')} 
                className={`px-3 py-2 text-[11px] font-bold uppercase ${pathname === '/' ? 'text-white' : 'text-white/40'}`}
              >
                Inicio
              </Link>
              
              {!vendedor && (
                <Link 
                  href="/panel/ajustes" 
                  className="px-4 py-2 bg-white/5 rounded-full text-[11px] font-black uppercase text-white hover:bg-white/10 transition-all"
                >
                  Invitado
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-2">
              {/* BOTÓN VER WEB (SOLO EN SIMULACIÓN) */}
              {isSimulando && (
                <Link 
                  href="/preview" 
                  target="_blank" 
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-full animate-pulse shadow-lg"
                >
                  Ver Web <ExternalLink size={12} />
                </Link>
              )}
              
              <Link 
                href="/#contacto" 
                style={{ borderColor: config.colorMedio1 }} 
                className="border px-4 py-2 text-[11px] font-black uppercase text-white rounded-full hover:bg-white hover:text-black transition-all"
              >
                Empezar
              </Link>

              {/* TOGGLE FILA 2 */}
              <button onClick={() => setIsRow2Open(!isRow2Open)} className="p-2 text-white/50 hover:text-red-600">
                {isRow2Open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* FILA 2: OCULTA (DESENFOCADA GLASSMORPHISM) */}
        <div className={`overflow-hidden transition-all duration-500 bg-white/5 backdrop-blur-xl ${isRow2Open ? 'max-h-20 border-t border-white/5' : 'max-h-0'}`}>
          <nav className="max-w-5xl mx-auto px-3 py-4 flex justify-center gap-6">
            {infoRow.map((item: any) => (
              <Link 
                key={item.label} 
                href={getHref(item.href)} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-red-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
            <button onClick={() => setIsSidebarOpen(false)} className="text-white/50 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            <nav className="flex flex-col gap-1">
              <p className="text-[9px] font-black text-white/20 uppercase mb-2 ml-4 tracking-[0.2em]">General</p>
              <Link href={getHref('/')} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 transition-all uppercase text-xs font-bold">
                <Home size={20} className="text-slate-500" /> Inicio
              </Link>

              {/* ACORDEÓN PANEL CLIENTE (8 SUB-ITEMS) */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setShowPanelOptions(!showPanelOptions)} 
                  className={`flex items-center justify-between p-4 rounded-xl transition-all uppercase text-xs font-bold ${showPanelOptions ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-4">
                    <LayoutDashboard size={20} className="text-blue-500" /> Panel Cliente
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${showPanelOptions ? 'rotate-180' : ''}`} />
                </button>
                
                {showPanelOptions && (
                  <div className="flex flex-col gap-1 mt-1 ml-4 border-l border-white/10 pl-2">
                    {panelSubItems.map((item: any) => (
                      <Link 
                        key={item.href} 
                        href={getHref(item.href)} 
                        onClick={() => setIsSidebarOpen(false)} 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`${item.color} opacity-70 group-hover:opacity-100 transition-all`}>
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black text-white group-hover:text-red-500 uppercase">{item.label}</span>
                            <span className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">{item.subLabel}</span>
                          </div>
                        </div>
                        <ChevronRight size={12} className="text-white/10 group-hover:text-red-600" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="#" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 transition-all uppercase text-xs font-bold">
                <BookOpen size={20} className="text-emerald-500" /> Documentación
              </Link>

              <Link 
                href={vendedor ? `https://wa.me/5491153778475?text=Soporte:${vendedor}` : "/#contacto"} 
                className="flex items-center gap-4 p-4 rounded-xl bg-red-600/10 border border-red-600/20 mt-2 group"
              >
                <MessageSquare size={20} className="text-red-500" />
                <div className="flex flex-col text-white uppercase text-xs font-bold">
                  Soporte Técnico <span className="text-[8px] text-red-500 tracking-tighter">{vendedor ? 'Prioridad VIP' : 'Consultar'}</span>
                </div>
              </Link>
            </nav>

            {/* 🪄 CATEGORÍAS DINÁMICAS (INTACTAS) */}
            {dynamicCats.length > 0 && (
              <nav className="flex flex-col gap-1 border-t border-white/5 pt-6">
                <p className="text-[9px] font-black text-white/20 uppercase mb-2 ml-4 tracking-[0.2em]">Categorías de Tienda</p>
                {dynamicCats.map((cat: any) => (
                  <Link 
                    key={cat.slug} 
                    href={getHref(`/categoria/${cat.slug}`)} 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/80 group"
                  >
                    <div className="w-6 h-6 shrink-0 opacity-40 group-hover:opacity-100">
                      <img 
                        src={`/icons/${cat.slug}.png`} 
                        alt="" 
                        onError={(e) => (e.currentTarget.style.display = 'none')} 
                      />
                    </div>
                    <span className="text-xs font-bold uppercase">{cat.label}</span>
                    <ChevronRight size={14} className="ml-auto opacity-10 group-hover:opacity-100" />
                  </Link>
                ))}
              </nav>
            )}
          </div>
          
          <div className="p-6 border-t border-white/5 text-center">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
              Version 2.0 — High Performance
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}