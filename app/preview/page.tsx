"use client"

import { useConfig } from "@/hooks/useConfig";
import { useEffect, useState, useMemo } from "react";
import { 
  ShoppingBag, ArrowLeft, Instagram, MessageCircle, 
  PackagePlus, ChevronRight, UploadCloud, Heart, 
  X, Menu, ExternalLink
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

  useEffect(() => { setMounted(true); }, []);

  // 🚩 LÓGICA DE WHATSAPP (Nombre "Marcos" eliminado)
  const waLink = `https://wa.me/5491153778475?text=Hola!%20Vengo%20desde%20el%20simulador%20y%20quiero%20hablar%20con%20un%20diseñador%20para%20contratar%20mi%20marca:%20${config.nombreMedio}`;

  // 🚩 SENSOR DE CATEGORÍAS
  const uniqueCategories = useMemo(() => {
    const cats = config.productosInvitado.map(p => (p.cat || "Otros").toUpperCase());
    return ["TODOS", ...Array.from(new Set(cats))];
  }, [config.productosInvitado]);

  // Filtro de categorías para la Landing (Las que el usuario escribió en Config)
  const landingCategories = useMemo(() => {
    if (!config.categoriasLanding) return [];
    return config.categoriasLanding.split(',').map(c => c.trim().toUpperCase());
  }, [config.categoriasLanding]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "TODOS") return config.productosInvitado;
    return config.productosInvitado.filter(p => (p.cat || "Otros").toUpperCase() === activeCategory);
  }, [config.productosInvitado, activeCategory]);

  if (!mounted) return null;

  // 🚩 LÓGICA DE LOGO: No muestra el logo de Marcos por defecto
  const hasCustomLogo = config.logoUrl && config.logoUrl.includes("drive.google.com");

  return (
    <div className="min-h-screen font-sans flex flex-col transition-all" style={{ backgroundColor: config.colorClaro1 }}>
      <DynamicStyles />
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 py-4 md:py-6 border-b transition-all" style={{ backgroundColor: config.colorOscuro1, borderBottomColor: config.colorMedio1 + '20' }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-white">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:opacity-70"><Menu size={30} /></button>

          <div style={{ height: `${config.logoSize}px` }} className="flex items-center min-w-30">
            {hasCustomLogo ? (
              <img src={getDriveDirectLink(config.logoUrl, "400")} className="h-full w-auto object-contain" alt="Logo" />
            ) : (
              <div className="h-full px-4 border-2 border-dashed rounded-xl flex items-center gap-2 opacity-40" style={{ borderColor: config.colorClaro1 }}>
                <UploadCloud size={20} /> <span className="text-[8px] font-black uppercase">Subí tu Logo</span>
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

      {/* --- SIDEBAR --- */}
      <div className={`fixed inset-0 z-100 transition-all ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <aside className={`absolute top-0 left-0 h-full w-72 bg-neutral-900 border-r border-white/10 flex flex-col transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center text-white">
            <span className="text-xs font-black uppercase tracking-widest italic">Explorar</span>
            <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
          </div>
          <nav className="p-4 flex flex-col gap-2">
            {uniqueCategories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setIsSidebarOpen(false); }} className={`w-full text-left p-4 rounded-xl text-xs font-black uppercase transition-all ${activeCategory === cat ? 'bg-red-600 text-white' : 'text-white/40 hover:bg-white/5'}`}>{cat}</button>
            ))}
          </nav>
        </aside>
      </div>

      <main className="flex-1">
        <section className="py-20 text-center px-6">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4" style={{ color: config.colorOscuro1 }}>{config.nombreLargo}</h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm font-bold opacity-50 uppercase tracking-[0.2em]" style={{ color: config.colorOscuro1 }}>{config.metaDescripcion}</p>
        </section>

        {/* --- CATEGORÍAS LANDING (TOP 5) --- */}
        {landingCategories.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 mb-10 overflow-x-auto no-scrollbar flex gap-3 justify-center">
            {landingCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ borderRadius: `${config.buttonRadius}px`, backgroundColor: activeCategory === cat ? config.colorMedio1 : 'white', color: activeCategory === cat ? 'white' : 'black' }} className="px-6 py-3 text-[10px] font-black uppercase border shadow-sm transition-all">{cat}</button>
            ))}
          </section>
        )}

        <section className="max-w-6xl mx-auto px-6 py-10 border-t" style={{ borderTopColor: config.colorOscuro1 + '10' }}>
          <div className="flex items-center justify-between mb-12 border-l-8 pl-4" style={{ borderColor: config.colorMedio1 }}>
            <h2 className="text-3xl font-black uppercase italic" style={{ color: config.colorOscuro1 }}>Lanzamientos</h2>
          </div>

          {config.productosInvitado.length === 0 ? (
            <div className="bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem] p-16 text-center flex flex-col items-center gap-6 shadow-inner">
              <PackagePlus size={60} className="text-amber-600" />
              <h3 className="text-xl font-black uppercase text-black italic">Tu vitrina está vacía</h3>
              <button onClick={() => window.location.href = '/panel/productos'} className="px-8 py-4 bg-black text-white rounded-xl font-black uppercase text-xs">Cargar Ahora</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer relative" onClick={() => setSelectedProduct(p)}>
                  <div className="aspect-3/4 overflow-hidden relative shadow-lg" style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}>
                    <img src={getDriveDirectLink(p.img, "600")} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.titulo} />
                    <button onClick={(e) => { e.stopPropagation(); config.toggleWishlist(p.id); }} className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-sm" style={{ color: config.wishlist.includes(p.id) ? config.colorMedio1 : '#ccc' }}>
                      <Heart size={18} fill={config.wishlist.includes(p.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-center bg-white/90 p-3 rounded-xl border border-black/5 mx-2 scale-90 md:scale-100">
                      <span className="text-[10px] font-black uppercase truncate max-w-[60%] text-black">{p.titulo}</span>
                      <span className="text-xs font-black text-red-600" style={{ color: config.colorMedio1 }}>${p.precio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* --- 🚩 FOOTER DOBLE BLOQUE (FUSIÓN SOLICITADA) --- */}
      <footer className="py-16 text-center border-t-8" style={{ backgroundColor: config.colorOscuro1, borderTopColor: config.colorMedio1 }}>
         <h4 className="text-2xl font-black uppercase text-white mb-2">{config.nombreMedio}</h4>
         <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-8">{config.categoriasLanding.replace(/,/g, ' | ')}</p>
         <div className="flex justify-center gap-6 text-[10px] font-black uppercase text-white/40">
           <span>Arrepentimiento</span> | <span>FAQ</span> | <span>Envíos</span> | <span>Privacidad</span>
         </div>
      </footer>

      <div className="h-20" />

      <footer className="fixed bottom-0 left-0 w-full z-300 py-4 px-6 text-center shadow-[0_-10px_30px_rgba(0,0,0,0.3)] transition-all" style={{ backgroundColor: config.colorMedio1 }}>
        <p className="text-[11px] font-black text-white m-0 flex items-center justify-center gap-2 italic">
          <a href="https://tienda-de-tiendas.vercel.app" target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">
            Diseño y Desarrollo web: Tienda de Tiendas <ExternalLink size={12} />
          </a>
        </p>
        <p className="text-[10px] text-white/80 m-0 uppercase font-bold tracking-tighter mt-1">Promo Micro Emp 50% off hasta Dic 2026</p>
        <p className="text-[10px] text-white/80 m-0 font-bold uppercase">Tené tu Web en 2 días ✉️ Contacto</p>
      </footer>

      {/* MODAL ZOOM */}
      {selectedProduct && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-4xl bg-white overflow-hidden flex flex-col md:flex-row shadow-2xl" style={{ borderRadius: `${config.buttonRadius * 1.5}px` }}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 p-2 bg-black text-white rounded-full"><X size={20}/></button>
            <div className="w-full md:w-1/2 aspect-square"><img src={getDriveDirectLink(selectedProduct.img, "800")} className="w-full h-full object-contain" alt="Zoom" /></div>
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between text-black">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase opacity-40">{selectedProduct.cat}</span>
                <h2 className="text-3xl font-black uppercase italic leading-none">{selectedProduct.titulo}</h2>
                <div className="text-3xl font-black" style={{ color: config.colorMedio1 }}>${selectedProduct.precio}</div>
              </div>
              <div className="space-y-4 pt-8 border-t border-black/5">
                <button onClick={() => config.toggleWishlist(selectedProduct.id)} style={{ borderColor: config.colorMedio1, color: config.wishlist.includes(selectedProduct.id) ? 'white' : config.colorMedio1, backgroundColor: config.wishlist.includes(selectedProduct.id) ? config.colorMedio1 : 'transparent' }} className="w-full py-4 border-2 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 transition-all">
                  <Heart size={16} fill={config.wishlist.includes(selectedProduct.id) ? "white" : "none"} /> {config.wishlist.includes(selectedProduct.id) ? 'En Favoritos' : 'Me Gusta'}
                </button>
                <button style={{ backgroundColor: config.colorOscuro1 }} className="w-full py-5 text-white font-black uppercase text-xs rounded-xl">Simular Compra</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOTONES FLOTANTES */}
      <button onClick={() => window.location.href = '/panel/ajustes'} className="fixed bottom-24 left-6 bg-black text-white p-4 rounded-full shadow-2xl border-2 border-white/20 active:scale-95 transition-all z-50"><ArrowLeft size={24} /></button>
      <a href={waLink} target="_blank" className="fixed bottom-24 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl active:scale-95 transition-all z-50 animate-bounce"><MessageCircle size={28} fill="white" className="text-[#25D366]" /></a>
    </div>
  );
}