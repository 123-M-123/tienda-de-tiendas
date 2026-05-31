"use client"

import { useConfig } from "@/hooks/useConfig";
import { useEffect, useState, useMemo } from "react";
import { 
  ShoppingBag, ArrowLeft, Instagram, MessageCircle, 
  PackagePlus, ChevronRight, UploadCloud, Heart, 
  X, Menu, Search, Star
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";
import DynamicStyles from "@/app/components/DynamicStyles";
import Link from "next/link";

export default function PreviewPage() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("TODOS");

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚩 LÓGICA DE WHATSAPP (Sincronizada con el pedido del usuario)
  const waLink = `https://wa.me/5491153778475?text=Hola%20Marcos!%20Vengo%20desde%20el%20simulador%20y%20quiero%20hablar%20con%20un%20diseñador%20para%20contratar%20mi%20marca:%20${config.nombreMedio}`;

  // 🚩 SENSOR DE CATEGORÍAS (Automático de los 10 productos)
  const uniqueCategories = useMemo(() => {
    const cats = config.productosInvitado.map(p => (p.cat || "Otros").toUpperCase());
    return ["TODOS", ...Array.from(new Set(cats))];
  }, [config.productosInvitado]);

  // 🚩 FILTRO DE PRODUCTOS
  const filteredProducts = useMemo(() => {
    if (activeCategory === "TODOS") return config.productosInvitado;
    return config.productosInvitado.filter(p => (p.cat || "Otros").toUpperCase() === activeCategory);
  }, [config.productosInvitado, activeCategory]);

  if (!mounted) return null;

  // 🚩 CHEQUEO DE LOGO PERSONALIZADO
  const hasCustomLogo = config.logoUrl && config.logoUrl.includes("drive.google.com");

  return (
    <div className="min-h-screen font-sans transition-all duration-500 flex flex-col" style={{ backgroundColor: config.colorClaro1 }}>
      <DynamicStyles />
      
      {/* --- 1. HEADER SANDBOX --- */}
      <header className="sticky top-0 z-50 py-4 md:py-6 border-b transition-all" style={{ backgroundColor: config.colorOscuro1, borderBottomColor: config.colorMedio1 + '20' }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-white">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:opacity-70 transition-opacity">
            <Menu size={30} />
          </button>

          {/* LOGO O PLACEHOLDER */}
          <div style={{ height: `${config.logoSize}px` }} className="flex items-center min-w-30">
            {hasCustomLogo ? (
              <img src={getDriveDirectLink(config.logoUrl, "400")} className="h-full w-auto object-contain" alt="Logo" />
            ) : (
              <div 
                className="h-full px-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 opacity-40 hover:opacity-100 transition-all cursor-pointer group"
                style={{ borderColor: config.colorClaro1, color: config.colorClaro1 }}
                onClick={() => window.location.href = '/panel/ajustes'}
              >
                <UploadCloud size={config.logoSize < 60 ? 14 : 24} className="group-hover:scale-110 transition-transform" />
                {config.logoSize > 60 && <span className="text-[9px] font-black uppercase tracking-tighter">Subí tu logo</span>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
             <div className="relative">
                <ShoppingBag size={28} />
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black bg-white text-black">
                  {config.wishlist.length}
                </span>
             </div>
          </div>
        </div>
      </header>

      {/* --- 2. SIDEBAR DE CATEGORÍAS --- */}
      <div className={`fixed inset-0 z-70 transition-all ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <aside className={`absolute top-0 left-0 h-full w-72 bg-neutral-900 border-r border-white/10 flex flex-col transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center text-white">
            <span className="text-xs font-black uppercase tracking-widest italic">Explorar</span>
            <button onClick={() => setIsSidebarOpen(false)} className="hover:text-red-500 transition-colors"><X size={24} /></button>
          </div>
          <nav className="p-4 flex flex-col gap-2">
            {uniqueCategories.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setActiveCategory(cat); setIsSidebarOpen(false); }}
                className={`w-full text-left p-4 rounded-xl text-xs font-black uppercase transition-all ${activeCategory === cat ? 'bg-red-600 text-white' : 'text-white/40 hover:bg-white/5'}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>
      </div>

      <main className="flex-1">
        {/* HERO */}
        <section className="py-20 md:py-32 text-center px-6">
          <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8" style={{ color: config.colorOscuro1 }}>
            {config.nombreLargo}
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-xl font-medium opacity-60 mb-12 uppercase tracking-widest" style={{ color: config.colorOscuro2 }}>
            {config.metaDescripcion}
          </p>
          <button style={{ backgroundColor: config.colorMedio1, borderRadius: `${config.buttonRadius}px` }} className="px-12 py-6 text-white font-black uppercase text-sm shadow-xl active:scale-95 transition-all">
            Ver Productos
          </button>
        </section>

        {/* --- 3. SECCIÓN DE PRODUCTOS (EMPTY STATE & GRID) --- */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t" style={{ borderTopColor: config.colorOscuro1 + '10' }}>
          <div className="flex items-center justify-between mb-12 border-l-8 pl-4" style={{ borderColor: config.colorMedio1 }}>
            <h2 className="text-3xl font-black uppercase italic" style={{ color: config.colorOscuro1 }}>Catálogo</h2>
          </div>

          {config.productosInvitado.length === 0 ? (
            /* 🚩 CARTEL DE EMPTY STATE RECUPERADO */
            <div className="bg-white/50 border-2 border-dashed border-black/10 rounded-4xl p-16 md:p-32 text-center flex flex-col items-center gap-8 shadow-inner">
              <div className="bg-amber-100 p-8 rounded-full text-amber-600 shadow-sm"><PackagePlus size={60} /></div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase text-black italic">Tu vitrina está vacía</h3>
                <p className="text-slate-500 font-bold max-w-sm mx-auto uppercase text-[10px] tracking-widest">Cargá tus propios productos en el panel de gestión.</p>
              </div>
              <button onClick={() => window.location.href = '/panel/productos'} className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl">
                Cargar mi primer producto <ChevronRight size={18} className="inline ml-1" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer relative" onClick={() => setSelectedProduct(p)}>
                  <div className="aspect-3/4 overflow-hidden relative shadow-lg transition-transform duration-500 hover:-translate-y-2" style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}>
                    <img src={getDriveDirectLink(p.img, "600")} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.titulo} />
                    <button onClick={(e) => { e.stopPropagation(); config.toggleWishlist(p.id); }} className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-sm" style={{ color: config.wishlist.includes(p.id) ? config.colorMedio1 : '#ccc' }}>
                      <Heart size={18} fill={config.wishlist.includes(p.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute bottom-4 left-0 w-full px-4">
                       <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center border border-black/5 shadow-xl">
                          <span className="text-[11px] font-black uppercase tracking-tighter truncate max-w-[60%]">{p.titulo}</span>
                          <span className="text-sm font-black" style={{ color: config.colorMedio1 }}>${p.precio}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* --- 4. MODAL DE ZOOM --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-5xl bg-white overflow-hidden flex flex-col md:flex-row shadow-2xl" style={{ borderRadius: `${config.buttonRadius * 1.5}px` }}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-10 p-3 bg-black text-white rounded-full hover:scale-110 transition-transform"><X size={24}/></button>
            <div className="w-full md:w-3/5 aspect-square bg-slate-50"><img src={getDriveDirectLink(selectedProduct.img, "1000")} className="w-full h-full object-contain" alt="Zoom" /></div>
            <div className="flex-1 p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-[11px] font-black uppercase opacity-40 tracking-[0.3em]">{selectedProduct.cat || "Categoría"}</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.8]">{selectedProduct.titulo}</h2>
                <p className="text-sm font-medium text-slate-500 leading-relaxed uppercase">{selectedProduct.desc || "Calidad SaaS Premium."}</p>
                <div className="text-4xl font-black italic" style={{ color: config.colorMedio1 }}>${selectedProduct.precio.toLocaleString()}</div>
              </div>
              <div className="space-y-4 pt-10 border-t border-black/5">
                <button onClick={() => config.toggleWishlist(selectedProduct.id)} style={{ borderColor: config.colorMedio1, color: config.wishlist.includes(selectedProduct.id) ? 'white' : config.colorMedio1, backgroundColor: config.wishlist.includes(selectedProduct.id) ? config.colorMedio1 : 'transparent' }} className="w-full py-5 border-2 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all">
                  <Heart size={20} fill={config.wishlist.includes(selectedProduct.id) ? "white" : "none"} /> {config.wishlist.includes(selectedProduct.id) ? 'En Favoritos' : 'Me Gusta'}
                </button>
                <button style={{ backgroundColor: config.colorOscuro1 }} className="w-full py-6 text-white font-black uppercase text-sm rounded-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all">Simular Compra</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-24 text-center border-t-8" style={{ backgroundColor: config.colorOscuro1, borderTopColor: config.colorMedio1 }}>
         <h2 className="text-4xl font-black uppercase text-white mb-4 tracking-tighter">{config.nombreMedio}</h2>
         <div className="flex justify-center gap-10 text-white/40 mb-10"><Instagram size={28} /><MessageCircle size={28} /></div>
         <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.6em]">Powered by Tienda de Tiendas SaaS Engine</p>
      </footer>

      {/* BOTONES FLOTANTES */}
      <button onClick={() => window.location.href = '/panel/ajustes'} className="fixed bottom-10 left-6 bg-black text-white p-5 rounded-full shadow-2xl border-2 border-white/20 active:scale-95 transition-all z-50 hover:bg-red-600"><ArrowLeft size={28} /></button>
      <a href={waLink} target="_blank" className="fixed bottom-10 right-6 bg-[#25D366] text-white p-5 rounded-full shadow-2xl active:scale-95 transition-all z-50 animate-bounce shadow-green-900/40"><MessageCircle size={32} fill="white" className="text-[#25D366]" /></a>
    </div>
  );
}