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

  if (!mounted) return null;

  const waLink = `https://wa.me/5491153778475?text=Hola!%20Vengo%20desde%20el%20simulador%20y%20quiero%20hablar%20con%20un%20diseñador%20para%20contratar%20mi%20marca:%20${config.nombreMedio}`;

  const hasCustomLogo = config.logoUrl && 
                        config.logoUrl.includes("drive.google.com") && 
                        config.logoUrl !== "/logo-nuevo.png";

  const uniqueCategories = useMemo(() => {
    const cats = config.productosInvitado.map(p => (p.cat || "Varios").toUpperCase());
    return ["TODOS", ...Array.from(new Set(cats))];
  }, [config.productosInvitado]);

  const landingCategories = useMemo(() => {
    if (!config.categoriasLanding) return [];
    return config.categoriasLanding.split(',').map(c => c.trim().toUpperCase());
  }, [config.categoriasLanding]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "TODOS") return config.productosInvitado;
    return config.productosInvitado.filter(p => (p.cat || "Varios").toUpperCase() === activeCategory);
  }, [config.productosInvitado, activeCategory]);

  return (
    <div className="min-h-screen font-sans flex flex-col transition-all" style={{ backgroundColor: config.colorClaro1 }}>
      <DynamicStyles />
      
      {/* --- HEADER SANDBOX --- */}
      <header className="sticky top-0 z-50 py-4 md:py-6 border-b transition-all" style={{ backgroundColor: config.colorOscuro1, borderBottomColor: config.colorMedio1 + '20' }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-white">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:opacity-70"><Menu size={30} /></button>

          {/* 🚩 LINKEO PROFUNDO AL LOGO */}
          <div 
            style={{ height: `${config.logoSize}px` }} 
            className="flex items-center min-w-30 cursor-pointer group"
            onClick={() => window.location.href = '/panel/ajustes#seccion-logo'}
          >
            {hasCustomLogo ? (
              <img src={getDriveDirectLink(config.logoUrl, "400")} className="h-full w-auto object-contain transition-transform group-hover:scale-105" alt="Logo" />
            ) : (
              <div className="h-full px-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 opacity-40 group-hover:opacity-100 transition-all text-white border-white">
                <UploadCloud size={20} />
                <span className="text-[8px] font-black uppercase tracking-tighter text-center leading-none">Carga tu logo<br/>en Ajustes</span>
              </div>
            )}
          </div>

          <div className="p-2 relative" style={{ color: config.colorClaro1 }}>
            <ShoppingBag size={28} />
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black bg-white text-black">{config.wishlist.length}</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 text-center px-6">
          <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-4" style={{ color: config.colorOscuro1 }}>{config.nombreLargo}</h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm font-bold opacity-50 uppercase tracking-[0.2em]" style={{ color: config.colorOscuro1 }}>{config.metaDescripcion}</p>
        </section>

        {landingCategories.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 mb-10 overflow-x-auto no-scrollbar flex gap-3 justify-center">
            {landingCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ borderRadius: `${config.buttonRadius}px`, backgroundColor: activeCategory === cat ? config.colorMedio1 : 'white', color: activeCategory === cat ? 'white' : 'black' }} className="px-6 py-3 text-[10px] font-black uppercase border shadow-sm transition-all">{cat}</button>
            ))}
          </section>
        )}

        <section className="max-w-6xl mx-auto px-6 py-10 border-t" style={{ borderTopColor: config.colorOscuro1 + '10' }}>
          <div className="flex items-center justify-between mb-12 border-l-8 pl-4" style={{ borderColor: config.colorMedio1 }}>
            <h2 className="text-3xl font-black uppercase italic" style={{ color: config.colorOscuro1 }}>Catálogo</h2>
          </div>

          {config.productosInvitado.length === 0 ? (
            /* 🚩 CARTEL DE AVISO CON LINK DIRECTO */
            <div className="bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem] p-16 text-center flex flex-col items-center gap-6">
              <PackagePlus size={60} className="text-amber-600" />
              <h3 className="text-xl font-black uppercase text-black italic">Tu vitrina está vacía</h3>
              <button onClick={() => window.location.href = '/panel/productos'} className="px-8 py-4 bg-black text-white rounded-xl font-black uppercase text-xs">Ir a Cargar Productos</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer relative" onClick={() => setSelectedProduct(p)}>
                  <div className="aspect-3/4 overflow-hidden relative shadow-lg transition-transform duration-500 hover:-translate-y-2" style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}>
                    <img src={getDriveDirectLink(p.img, "600")} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.titulo} />
                    <button onClick={(e) => { e.stopPropagation(); config.toggleWishlist(p.id); }} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-sm" style={{ color: config.wishlist.includes(p.id) ? config.colorMedio1 : '#ccc' }}>
                      <Heart size={18} fill={config.wishlist.includes(p.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-center bg-white/95 p-4 rounded-2xl border border-black/5 mx-2 shadow-xl scale-95 md:scale-100">
                      <span className="text-[11px] font-black uppercase truncate max-w-[60%] text-black">{p.titulo}</span>
                      <span className="text-sm font-black text-red-600" style={{ color: config.colorMedio1 }}>${p.precio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* --- FOOTER DOBLE BLOQUE --- */}
      <footer className="py-20 text-center border-t-8" style={{ backgroundColor: config.colorOscuro1, borderTopColor: config.colorMedio1 }}>
         <h4 className="text-3xl font-black uppercase text-white mb-2">{config.nombreMedio}</h4>
         <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-12">{config.categoriasLanding || "Tu Tienda SaaS"}</p>
         <div className="flex justify-center flex-wrap gap-6 text-[10px] font-black uppercase text-white/30">
           <span>Arrepentimiento</span> | <span>FAQ</span> | <span>Envíos</span> | <span>Privacidad</span> | <span>Términos</span>
         </div>
      </footer>

      {/* FOOTER TIENDA DE TIENDAS (FIJO) */}
      <div className="h-22.5" />
      <footer className="fixed bottom-0 left-0 w-full z-300 py-4 px-6 text-center shadow-[0_-10px_30px_rgba(0,0,0,0.3)] transition-all bg-black border-t border-white/10" style={{ backgroundColor: config.colorMedio1 }}>
        <p className="text-[11px] font-black text-white m-0 flex items-center justify-center gap-2 italic">
          <a href="https://tienda-de-tiendas.vercel.app" target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">
            Diseño y Desarrollo web: Tienda de Tiendas <ExternalLink size={12} />
          </a>
        </p>
        <p className="text-[10px] text-white/80 m-0 uppercase font-bold tracking-tighter mt-1 italic">Promo Micro Emp 50% off hasta Dic 2026</p>
        <p className="text-[10px] text-white/80 m-0 font-bold uppercase mt-1">Tené tu Web en 2 días ✉️ Contacto</p>
      </footer>

      {/* BOTONES FLOTANTES */}
      <button onClick={() => window.location.href = '/panel/ajustes'} className="fixed bottom-28 left-6 bg-black text-white p-4 rounded-full shadow-2xl border-2 border-white/20 active:scale-95 transition-all z-50 group">
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <a href={waLink} target="_blank" className="fixed bottom-28 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl active:scale-95 transition-all z-50 animate-bounce">
        <MessageCircle size={32} fill="white" className="text-[#25D366]" />
      </a>

      {/* MODAL ZOOM (CON Z-INDEX 500) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-4xl bg-white overflow-hidden flex flex-col md:flex-row shadow-2xl" style={{ borderRadius: `${config.buttonRadius * 1.5}px` }}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 p-2 bg-black text-white rounded-full hover:scale-110 transition-transform"><X size={20}/></button>
            <div className="w-full md:w-1/2 aspect-square bg-slate-50 flex items-center justify-center"><img src={getDriveDirectLink(selectedProduct.img, "800")} className="w-full h-full object-contain" alt="Zoom" /></div>
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between text-black">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase opacity-40 tracking-[0.3em]">{selectedProduct.cat}</span>
                <h2 className="text-4xl font-black uppercase italic leading-none">{selectedProduct.titulo}</h2>
                <div className="text-4xl font-black italic" style={{ color: config.colorMedio1 }}>${selectedProduct.precio.toLocaleString()}</div>
              </div>
              <div className="space-y-4 pt-10 border-t border-black/5">
                <button onClick={() => config.toggleWishlist(selectedProduct.id)} style={{ borderColor: config.colorMedio1, color: config.wishlist.includes(selectedProduct.id) ? 'white' : config.colorMedio1, backgroundColor: config.wishlist.includes(selectedProduct.id) ? config.colorMedio1 : 'transparent' }} className="w-full py-5 border-2 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all shadow-lg">
                  <Heart size={20} fill={config.wishlist.includes(selectedProduct.id) ? "white" : "none"} /> {config.wishlist.includes(selectedProduct.id) ? 'En Favoritos' : 'Me Gusta'}
                </button>
                <button style={{ backgroundColor: config.colorOscuro1 }} className="w-full py-6 text-white font-black uppercase text-sm rounded-2xl shadow-xl hover:opacity-90 transition-all">Simular Compra</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}