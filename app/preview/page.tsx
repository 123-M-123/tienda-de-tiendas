"use client"

import { useConfig } from "@/hooks/useConfig";
import { useEffect, useState, useMemo } from "react";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Instagram, 
  MessageCircle, 
  PackagePlus, 
  ChevronRight, 
  UploadCloud, 
  Heart, 
  X, 
  Menu, 
  ExternalLink,
  Star,
  Search,
  MousePointer2
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";
import DynamicStyles from "@/app/components/DynamicStyles";
import Link from "next/link";

/**
 * 🌐 VISTA PREVIA (SANDBOX) - VERSIÓN 2.5 PREMIUM
 * Aislamiento total de marca para invitados y clientes.
 * Incluye: Sidebar dinámico, Modal Zoom, Wishlist y Doble Footer.
 */
export default function PreviewPage() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("TODOS");

  // 🛡️ PROTOCOLO DE HIDRATACIÓN
  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 🪄 SENSOR AUTOMÁTICO DE CATEGORÍAS (Extraído de los productos del invitado)
  const uniqueCategories = useMemo(() => {
    const cats = config.productosInvitado.map(p => (p.cat || "Otros").toUpperCase());
    return ["TODOS", ...Array.from(new Set(cats))];
  }, [config.productosInvitado]);

  // 🪄 FILTRO DE CATEGORÍAS PARA LANDING (Top 5 del Customizer)
  const landingCategories = useMemo(() => {
    if (!config.categoriasLanding) return [];
    return config.categoriasLanding.split(',').map(c => c.trim().toUpperCase());
  }, [config.categoriasLanding]);

  // 🪄 LÓGICA DE FILTRADO DE GRILLA
  const filteredProducts = useMemo(() => {
    if (activeCategory === "TODOS") return config.productosInvitado;
    return config.productosInvitado.filter(p => (p.cat || "Otros").toUpperCase() === activeCategory);
  }, [config.productosInvitado, activeCategory]);

  if (!mounted) return null;

  // 🚩 LÓGICA DE CONTACTO (Sin nombres propios / Protocolo Marcos)
  const waLink = `https://wa.me/5491153778475?text=Hola!%20Vengo%20desde%20el%20simulador%20y%20quiero%20hablar%20con%20un%20diseñador%20para%20contratar%20mi%20marca:%20${config.nombreMedio}`;

  // 🚩 PLACEHOLDER DE LOGO (Ignora el default si no hay link real)
  const hasCustomLogo = config.logoUrl && 
                        config.logoUrl.includes("drive.google.com") && 
                        config.logoUrl !== "/logo-nuevo.png";

  return (
    <div 
      className="min-h-screen font-sans transition-all duration-500 flex flex-col" 
      style={{ backgroundColor: config.colorClaro1 }}
    >
      {/* Inyección de las variables CSS de la paleta de 9 colores */}
      <DynamicStyles />
      
      {/* --- 1. HEADER SANDBOX (MARCA BLANCA) --- */}
      <header 
        className="sticky top-0 z-100 py-4 md:py-6 border-b transition-all" 
        style={{ 
          backgroundColor: config.colorOscuro1, 
          borderBottomColor: config.colorMedio1 + '30' 
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-white">
          
          {/* TRIGGER SIDEBAR CATEGORÍAS */}
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <Menu size={30} />
          </button>

          {/* LOGO DINÁMICO CON LINK PROFUNDO A AJUSTES */}
          <div 
            style={{ height: `${config.logoSize}px` }} 
            className="flex items-center min-w-30 cursor-pointer group"
            onClick={() => window.location.href = '/panel/ajustes#seccion-logo'}
            title="Click para ajustar tamaño o imagen"
          >
            {hasCustomLogo ? (
              <img 
                src={getDriveDirectLink(config.logoUrl, "400")} 
                className="h-full w-auto object-contain transition-transform group-hover:scale-105" 
                alt="Logo Cliente" 
              />
            ) : (
              <div 
                className="h-full px-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 opacity-40 group-hover:opacity-100 transition-all text-white border-white"
              >
                <UploadCloud size={config.logoSize < 60 ? 14 : 24} />
                {config.logoSize > 60 && (
                  <span className="text-[8px] font-black uppercase tracking-tighter">Subí tu Logo</span>
                )}
              </div>
            )}
          </div>

          {/* ACCESOS RÁPIDOS HEADER */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: config.colorClaro1 }}>
               <span className="cursor-pointer hover:opacity-70 transition-opacity">Productos</span>
               <span className="cursor-pointer hover:opacity-70 transition-opacity">Contacto</span>
            </nav>
            <div className="p-2 relative cursor-pointer" style={{ color: config.colorClaro1 }}>
              <ShoppingBag size={28} />
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black bg-white text-black shadow-lg"
              >
                {config.wishlist.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- 2. SIDEBAR DE CATEGORÍAS (GHOST MODE) --- */}
      <div 
        className={`fixed inset-0 z-200 transition-all duration-500 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <aside 
          className={`absolute top-0 left-0 h-full w-72 bg-neutral-900 border-r border-white/10 flex flex-col transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ backgroundColor: config.colorOscuro2 }}
        >
          <div className="p-6 border-b border-white/5 flex justify-between items-center text-white">
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest italic" style={{ color: config.colorMedio1 }}>Explorar</span>
              <span className="text-[9px] font-bold opacity-30 uppercase">Categorías Dinámicas</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <nav className="p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
            {uniqueCategories.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setActiveCategory(cat); setIsSidebarOpen(false); }}
                className={`w-full text-left p-4 rounded-xl text-[10px] font-black uppercase transition-all border ${activeCategory === cat ? 'bg-white text-black border-white shadow-lg scale-[1.02]' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </nav>
          
          <div className="mt-auto p-6 border-t border-white/5">
             <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em] text-center">Simulador v2.5</p>
          </div>
        </aside>
      </div>

      <main className="flex-1">
        {/* --- 3. HERO SECTION --- */}
        <section className="py-24 md:py-40 text-center px-6">
          <h1 
            className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8" 
            style={{ color: config.colorOscuro1 }}
          >
            {config.nombreLargo}
          </h1>
          <p 
            className="max-w-2xl mx-auto text-sm md:text-xl font-medium opacity-60 mb-12 uppercase tracking-[0.2em] leading-relaxed" 
            style={{ color: config.colorOscuro2 }}
          >
            {config.metaDescripcion}
          </p>
          <button 
            style={{ 
              backgroundColor: config.colorMedio1, 
              borderRadius: `${config.buttonRadius}px` 
            }}
            className="px-12 py-6 text-white font-black uppercase text-sm shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            Ver Catálogo Completo
          </button>
        </section>

        {/* --- 4. BARRA DE CATEGORÍAS MADRE (TOP 5) --- */}
        {landingCategories.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 mb-16 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 justify-center min-w-max pb-4">
              {landingCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ 
                    borderRadius: `${config.buttonRadius}px`,
                    backgroundColor: activeCategory === cat ? config.colorMedio1 : 'white',
                    color: activeCategory === cat ? 'white' : 'black',
                    borderColor: config.colorOscuro1 + '15'
                  }}
                  className="px-8 py-4 text-[10px] font-black uppercase border shadow-md transition-all hover:-translate-y-1"
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* --- 5. SECCIÓN DE PRODUCTOS (EMPTY STATE & GRID) --- */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t" style={{ borderTopColor: config.colorOscuro1 + '10' }}>
          <div className="flex items-center justify-between mb-12 border-l-8 pl-4" style={{ borderColor: config.colorMedio1 }}>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter" style={{ color: config.colorOscuro1 }}>
              {activeCategory === "TODOS" ? "Nuestros Productos" : activeCategory}
            </h2>
            <div className="flex items-center gap-2 opacity-30">
               <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.colorMedio1 }} />
               <span className="text-[10px] font-bold uppercase italic">En vivo</span>
            </div>
          </div>

          {config.productosInvitado.length === 0 ? (
            /* 🚩 CARTEL DE EMPTY STATE (REDIRECCIÓN A PRODUCTOS) */
            <div 
              className="bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem] p-16 md:p-32 text-center flex flex-col items-center gap-8 shadow-inner"
            >
              <div className="bg-amber-100 p-8 rounded-full text-amber-600 shadow-sm border border-amber-200">
                <PackagePlus size={60} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase text-black italic leading-none">Tu vitrina está vacía</h3>
                <p className="text-slate-500 font-bold max-w-sm mx-auto uppercase text-[10px] tracking-widest leading-relaxed">
                  Cargá tus propios productos (máximo 10) desde el panel para ver la magia de los 9 colores aplicada.
                </p>
              </div>
              <button 
                onClick={() => window.location.href = '/panel/productos'}
                className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-black uppercase text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl"
              >
                Cargar mi primer producto <ChevronRight size={18} />
              </button>
            </div>
          ) : (
            /* GRILLA DE PRODUCTOS DINÁMICA */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id} 
                  className="group cursor-pointer relative"
                  onClick={() => setSelectedProduct(p)}
                >
                  <div 
                    className="aspect-3/4 overflow-hidden relative shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl" 
                    style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}
                  >
                    <img 
                      src={getDriveDirectLink(p.img, "600")} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={p.titulo} 
                    />
                    
                    {/* BOTÓN WISHLIST DINÁMICO */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); config.toggleWishlist(p.id); }}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-lg transition-all active:scale-75"
                      style={{ color: config.wishlist.includes(p.id) ? config.colorMedio1 : '#ccc' }}
                    >
                      <Heart size={20} fill={config.wishlist.includes(p.id) ? "currentColor" : "none"} />
                    </button>

                    {/* LABEL DE PRODUCTO FLOTANTE */}
                    <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-center bg-white/95 p-4 rounded-2xl border border-black/5 mx-2 shadow-2xl scale-95 md:scale-100 transition-all group-hover:scale-100">
                      <div className="flex flex-col truncate max-w-[65%]">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-black truncate">{p.titulo}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">{p.cat || 'General'}</span>
                      </div>
                      <span className="text-sm font-black italic" style={{ color: config.colorMedio1 }}>
                        ${Number(p.precio).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* --- 6. FOOTER DOBLE BLOQUE (FUSIÓN SOLICITADA) --- */}
      
      {/* BLOQUE A: MARCA DEL CLIENTE (NORMAL) */}
      <footer 
        className="text-center py-24 px-6 border-t-8" 
        style={{ 
          backgroundColor: config.colorOscuro1, 
          borderTopColor: config.colorMedio1 
        }}
      >
        <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4" style={{ color: config.colorClaro1 }}>
          {config.nombreMedio}
        </h4>
        <p className="text-xs font-bold text-white/40 uppercase tracking-[0.4em] mb-12">
          {config.categoriasLanding.replace(/,/g, '  |  ') || "Tienda SaaS Personalizada"}
        </p>

        <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 text-[10px] font-black uppercase text-white/30 mb-12">
           <span className="hover:text-white transition-colors cursor-pointer">Arrepentimiento</span>
           <span className="hover:text-white transition-colors cursor-pointer">Preguntas Frecuentes</span>
           <span className="hover:text-white transition-colors cursor-pointer">Políticas de Envío</span>
           <span className="hover:text-white transition-colors cursor-pointer">Privacidad</span>
           <span className="hover:text-white transition-colors cursor-pointer">Términos</span>
        </div>

        <div className="flex justify-center gap-10 text-white/40">
          <Instagram size={28} className="hover:scale-110 transition-transform cursor-pointer" /> 
          <MessageCircle size={28} className="hover:scale-110 transition-transform cursor-pointer" />
        </div>

        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10 mt-16">
          © {new Date().getFullYear()} {config.nombreCorto} — Todos los derechos reservados
        </p>
      </footer>

      {/* BLOQUE B: MARCA MARCOS (STICKY FIJO ABAJO) */}
      <div className="h-23.75" /> {/* Espacio reservado para el footer fijo */}
      <footer 
        className="fixed bottom-0 left-0 w-full z-300 py-4 px-6 text-center shadow-[0_-15px_40px_rgba(0,0,0,0.4)] transition-all border-t border-white/10" 
        style={{ backgroundColor: config.colorOscuro2 }}
      >
        <div className="max-w-4xl mx-auto space-y-1">
          <p className="text-[11px] font-black text-white m-0 flex items-center justify-center gap-2 italic">
            <a href="https://tienda-de-tiendas.vercel.app" target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1 hover:text-red-500">
              Diseño y Desarrollo web: Tienda de Tiendas <ExternalLink size={12} />
            </a>
          </p>
          <p className="text-[9px] text-white/60 m-0 uppercase font-bold tracking-widest opacity-80">
            Promo Micro Emp 50% off hasta Dic 2026
          </p>
          <p className="text-[10px] text-white/90 m-0 font-black uppercase tracking-tighter mt-1">
            Tené tu Web en 2 días ✉️ Contacto
          </p>
        </div>
      </footer>

      {/* --- 7. BOTONES FLOTANTES DE NAVEGACIÓN --- */}
      
      {/* Botón Volver al Panel (Izquierda) */}
      <button 
        onClick={() => window.location.href = '/panel/ajustes'}
        className="fixed bottom-32 left-6 bg-black text-white p-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-white/20 active:scale-95 transition-all z-150 group"
      >
        <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Botón WhatsApp Lead (Derecha) */}
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-32 right-6 bg-[#25D366] text-white p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] active:scale-95 transition-all z-150 animate-bounce"
      >
        <MessageCircle size={32} fill="white" className="text-[#25D366]" />
      </a>

      {/* --- 🚩 MODAL DE ZOOM (SaaS PRODUCT MODAL) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-500 flex items-center justify-center p-4 md:p-10">
          {/* Backdrop Glassmorphism */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)} />
          
          <div 
            className="relative w-full max-w-5xl bg-white overflow-hidden flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-black/10"
            style={{ borderRadius: `${config.buttonRadius * 1.5}px` }}
          >
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 z-10 p-3 bg-black text-white rounded-full hover:scale-110 active:scale-90 transition-transform"
            >
              <X size={24}/>
            </button>
            
            {/* Lado A: Imagen */}
            <div className="w-full md:w-3/5 aspect-square bg-slate-50 flex items-center justify-center border-r border-black/5">
              <img 
                src={getDriveDirectLink(selectedProduct.img, "1000")} 
                className="w-full h-full object-contain p-4" 
                alt="Zoom" 
              />
            </div>
            
            {/* Lado B: Info & Checkout */}
            <div className="flex-1 p-10 flex flex-col justify-between text-black">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-px bg-black/20" />
                   <span className="text-[11px] font-black uppercase opacity-40 tracking-[0.4em]">{selectedProduct.cat || "Colección Principal"}</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.8] italic">
                  {selectedProduct.titulo}
                </h2>
                
                <p className="text-sm font-bold text-slate-500 leading-relaxed uppercase border-l-2 border-black/10 pl-4 py-2">
                  {selectedProduct.desc || "Experimentá la calidad de nuestro sistema SaaS. Cargá tus propios productos para ver este modal con tu mercadería real."}
                </p>
                
                <div className="flex items-end gap-2">
                   <span className="text-5xl font-black italic tracking-tighter" style={{ color: config.colorMedio1 }}>
                     ${Number(selectedProduct.precio).toLocaleString()}
                   </span>
                   <span className="text-[10px] font-bold opacity-30 uppercase mb-2">Precio Online</span>
                </div>
              </div>

              {/* Botonera de Acción */}
              <div className="space-y-4 pt-10 border-t border-black/5">
                <button 
                  onClick={() => config.toggleWishlist(selectedProduct.id)} 
                  style={{ 
                    borderColor: config.colorMedio1, 
                    color: config.wishlist.includes(selectedProduct.id) ? 'white' : config.colorMedio1, 
                    backgroundColor: config.wishlist.includes(selectedProduct.id) ? config.colorMedio1 : 'transparent' 
                  }} 
                  className="w-full py-5 border-2 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-95"
                >
                  <Heart size={20} fill={config.wishlist.includes(selectedProduct.id) ? "white" : "none"} /> 
                  {config.wishlist.includes(selectedProduct.id) ? 'En Favoritos' : 'Me Gusta'}
                </button>
                
                <button 
                  style={{ backgroundColor: config.colorOscuro1 }} 
                  className="w-full py-6 text-white font-black uppercase text-sm rounded-2xl shadow-2xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={20} /> Simular Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}