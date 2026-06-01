"use client"

import { useConfig } from "@/hooks/useConfig";
import { useEffect, useState, useMemo } from "react";
import { 
  ShoppingBag, ArrowLeft, Instagram, MessageCircle, 
  PackagePlus, ChevronRight, UploadCloud, Heart, 
  X, Menu, ExternalLink, Star
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";
import DynamicStyles from "@/app/components/DynamicStyles";

export default function PreviewPage() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("TODOS");

  useEffect(() => { setMounted(true); }, []);

  const waLink = `https://wa.me/5491153778475?text=Hola!%20Quiero%20contratar%20mi%20marca:%20${config.nombreMedio}`;

  const uniqueCategories = useMemo(() => {
    if (!mounted || !config.productosInvitado) return ["TODOS"];
    const cats = config.productosInvitado.map(p => (p.cat || "Otros").toUpperCase());
    return ["TODOS", ...Array.from(new Set(cats))];
  }, [config.productosInvitado, mounted]);

  const filteredProducts = useMemo(() => {
    if (!mounted || !config.productosInvitado) return [];
    if (activeCategory === "TODOS") return config.productosInvitado;
    return config.productosInvitado.filter(p => (p.cat || "Otros").toUpperCase() === activeCategory);
  }, [config.productosInvitado, activeCategory, mounted]);

  const renderBanner = (ubicacion: string) => {
    const banner = config.bannersInvitado.find(b => b.ubicacion.toLowerCase() === ubicacion.toLowerCase());
    if (!banner) return null;
    const content = (
      <div className="w-full my-10 overflow-hidden shadow-2xl" style={{ borderRadius: `${config.buttonRadius}px` }}>
        <img src={getDriveDirectLink(banner.img, "1200")} alt="Promo" className="w-full h-auto object-cover" />
      </div>
    );
    return banner.linkDestino ? <a href={banner.linkDestino} target="_blank">{content}</a> : content;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-sans flex flex-col transition-all" style={{ backgroundColor: config.colorClaro1 }}>
      <DynamicStyles />
      
      {/* 🚩 CLASE CANÓNICA: z-100 */}
      <header className="sticky top-0 z-100 py-4 md:py-6 border-b" style={{ backgroundColor: config.colorOscuro1, borderBottomColor: config.colorMedio1 + '20' }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-white">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:opacity-70"><Menu size={30} /></button>
          
          {/* 🚩 CLASE CANÓNICA: min-w-30 */}
          <div style={{ height: `${config.logoSize}px` }} className="flex items-center min-w-30 cursor-pointer" onClick={() => window.location.href = '/panel/ajustes#seccion-logo'}>
            {config.logoUrl.includes("drive.google.com") ? (
              <img src={getDriveDirectLink(config.logoUrl, "400")} className="h-full w-auto object-contain" alt="Logo" />
            ) : (
              <div className="h-full px-4 border-2 border-dashed rounded-xl flex items-center gap-2 opacity-40 border-white text-white"><UploadCloud size={20} /> <span className="text-[8px] font-black uppercase">Subí tu Logo</span></div>
            )}
          </div>
          <div className="p-2 relative"><ShoppingBag size={28} /><span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black bg-white text-black shadow-lg">{config.wishlist.length}</span></div>
        </div>
      </header>

      {/* SIDEBAR - 🚩 CLASE CANÓNICA: z-200 */}
      <div className={`fixed inset-0 z-200 transition-all ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <aside className={`absolute top-0 left-0 h-full w-72 bg-neutral-900 border-r border-white/10 flex flex-col transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center text-white">
            <span className="text-xs font-black uppercase tracking-widest italic" style={{ color: config.colorMedio1 }}>Explorar</span>
            <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
          </div>
          <nav className="p-4 flex flex-col gap-2 overflow-y-auto">
            {uniqueCategories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setIsSidebarOpen(false); }} className={`w-full text-left p-4 rounded-xl text-[10px] font-black uppercase transition-all border ${activeCategory === cat ? 'bg-white text-black shadow-lg' : 'text-white/40 border-transparent hover:bg-white/5'}`}>{cat}</button>
            ))}
          </nav>
        </aside>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6">
        <section className="py-20 text-center">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8" style={{ color: config.colorOscuro1 }}>{config.nombreLargo}</h1>
          <p className="max-w-xl mx-auto text-xs font-bold opacity-50 uppercase tracking-widest" style={{ color: config.colorOscuro1 }}>{config.metaDescripcion}</p>
        </section>

        {renderBanner("hero-preview")}

        <section className="py-20 border-t" style={{ borderTopColor: config.colorOscuro1 + '10' }}>
          <h2 className="text-3xl font-black uppercase italic mb-10" style={{ color: config.colorOscuro1 }}>Lanzamientos</h2>
          {filteredProducts.length === 0 ? (
            <div className="bg-white/50 border-2 border-dashed border-black/10 rounded-4xl p-16 text-center flex flex-col items-center gap-6"><PackagePlus size={60} className="text-amber-600" /><h3 className="text-xl font-black uppercase text-black italic">Tu vitrina está vacía</h3><button onClick={() => window.location.href = '/panel/productos'} className="px-8 py-4 bg-black text-white rounded-xl font-black uppercase text-xs shadow-xl">Ir a Cargar</button></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer relative" onClick={() => setSelectedProduct(p)}>
                  {/* 🚩 CLASE CANÓNICA: aspect-3/4 */}
                  <div className="aspect-3/4 overflow-hidden relative shadow-lg transition-transform hover:-translate-y-2" style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}>
                    <img src={getDriveDirectLink(p.img, "600")} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.titulo} />
                    <button onClick={(e) => { e.stopPropagation(); config.toggleWishlist(p.id); }} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-sm" style={{ color: config.wishlist.includes(p.id) ? config.colorMedio1 : '#ccc' }}><Heart size={18} fill={config.wishlist.includes(p.id) ? "currentColor" : "none"} /></button>
                    <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-center bg-white/95 p-4 rounded-2xl border border-black/5 mx-2 shadow-xl scale-95 md:scale-100 transition-all"><span className="text-[11px] font-black uppercase truncate max-w-[60%] text-black">{p.titulo}</span><span className="text-sm font-black italic" style={{ color: config.colorMedio1 }}>${p.precio}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {renderBanner("footer-preview")}
      </main>

      <footer className="py-20 text-center border-t-8 mt-20" style={{ backgroundColor: config.colorOscuro1, borderTopColor: config.colorMedio1 }}>
         <h4 className="text-3xl font-black uppercase text-white mb-6 italic">{config.nombreMedio}</h4>
         <div className="flex justify-center gap-6 text-[10px] font-black uppercase text-white/30"><span>FAQ</span> | <span>Envíos</span> | <span>Términos</span></div>
      </footer>

      {/* 🚩 CLASE CANÓNICA: h-22.5, z-300 */}
      <div className="h-22.5" />
      <footer className="fixed bottom-0 left-0 w-full z-300 py-4 px-6 text-center bg-black border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <p className="text-[11px] font-black text-white flex items-center justify-center gap-2 italic">
          <a href="https://tienda-de-tiendas.vercel.app" target="_blank" className="underline flex items-center gap-1">Diseño: Tienda de Tiendas <ExternalLink size={12} /></a>
        </p>
        <p className="text-[9px] text-white/60 m-0 uppercase font-bold tracking-widest mt-1 italic">Promo Micro Emp 50% off hasta Dic 2026</p>
      </footer>

      {/* 🚩 CLASE CANÓNICA: z-150 */}
      <button onClick={() => window.location.href = '/panel/ajustes'} className="fixed bottom-28 left-6 bg-black text-white p-5 rounded-full shadow-2xl border-2 border-white/20 active:scale-95 transition-all z-150 hover:bg-red-600"><ArrowLeft size={28} /></button>
      <a href={waLink} target="_blank" className="fixed bottom-28 right-6 bg-[#25D366] text-white p-5 rounded-full shadow-2xl active:scale-95 transition-all z-150 animate-bounce"><MessageCircle size={32} fill="white" className="text-[#25D366]" /></a>

      {/* MODAL ZOOM - 🚩 CLASE CANÓNICA: z-500 */}
      {selectedProduct && (
        <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-5xl bg-white overflow-hidden flex flex-col md:flex-row shadow-2xl" style={{ borderRadius: `${config.buttonRadius * 1.5}px` }}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 p-2 bg-black text-white rounded-full hover:scale-110 transition-transform"><X size={20}/></button>
            <div className="w-full md:w-1/2 aspect-square bg-slate-50 flex items-center justify-center border-r border-black/5"><img src={getDriveDirectLink(selectedProduct.img, "1000")} className="w-full h-full object-contain p-4" alt="Zoom" /></div>
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between text-black">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase opacity-40">{selectedProduct.cat}</span>
                <h2 className="text-4xl font-black uppercase italic leading-none">{selectedProduct.titulo}</h2>
                <div className="text-4xl font-black italic" style={{ color: config.colorMedio1 }}>${selectedProduct.precio.toLocaleString()}</div>
              </div>
              <div className="space-y-4 pt-10 border-t border-black/5">
                <button onClick={() => config.toggleWishlist(selectedProduct.id)} style={{ borderColor: config.colorMedio1, color: config.wishlist.includes(selectedProduct.id) ? 'white' : config.colorMedio1, backgroundColor: config.wishlist.includes(selectedProduct.id) ? config.colorMedio1 : 'transparent' }} className="w-full py-5 border-2 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all shadow-lg"><Heart size={20} fill={config.wishlist.includes(selectedProduct.id) ? "white" : "none"} /> {config.wishlist.includes(selectedProduct.id) ? 'En Favoritos' : 'Me Gusta'}</button>
                <button style={{ backgroundColor: config.colorOscuro1 }} className="w-full py-6 text-white font-black uppercase text-sm rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3"><ShoppingBag size={20} /> Simular Compra</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}