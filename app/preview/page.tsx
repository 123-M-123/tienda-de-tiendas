"use client"

import { useConfig } from "@/hooks/useConfig";
import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Instagram, 
  MessageCircle, 
  PackagePlus,
  ChevronRight,
  UploadCloud
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";
import DynamicStyles from "@/app/components/DynamicStyles";
import Link from "next/link";

/**
 * 🌐 VISTA PREVIA (SANDBOX) - LA "WEB DE MENTIRA"
 * Esta página es un lienzo en blanco que no contiene el Header ni el Footer
 * oficiales del sistema, permitiendo al invitado ver su marca al 100%.
 */
export default function PreviewPage() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Lógica de contacto para contratar
  const waLink = `https://wa.me/5491153778475?text=Hola%20Marcos!%20Vengo%20desde%20el%20simulador%20y%20quiero%20contratar%20mi%20web%20SaaS%20para%20la%20marca:%20${config.nombreMedio}`;

  // 🚩 PROTOCOLO DE LOGO: 
  // Detecta si el usuario cargó un link real de Drive o sigue el logo por defecto.
  const hasCustomLogo = config.logoUrl && 
                        config.logoUrl.includes("drive.google.com");

  return (
    <div 
      className="min-h-screen font-sans transition-all duration-500 flex flex-col" 
      style={{ backgroundColor: config.colorClaro1 }}
    >
      {/* Inyección de las variables de los 9 colores */}
      <DynamicStyles />
      
      {/* --- 1. HEADER PREVIEW (MARCA BLANCA TOTAL) --- */}
      <header 
        className="sticky top-0 z-50 py-4 md:py-6 border-b shadow-sm transition-all" 
        style={{ 
          backgroundColor: config.colorOscuro1, 
          borderBottomColor: config.colorMedio1 + '30' 
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          
          {/* LÓGICA DE LOGO / PLACEHOLDER */}
          <div style={{ height: `${config.logoSize}px` }} className="flex items-center min-w-30">
            {hasCustomLogo ? (
              <img 
                src={getDriveDirectLink(config.logoUrl, "400")} 
                className="h-full w-auto object-contain" 
                alt="Logo Cliente" 
              />
            ) : (
              /* CAJA DE CARGA (Para incentivar al cliente a pegar su link) */
              <div 
                className="h-full px-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 opacity-50 hover:opacity-100 transition-all cursor-pointer group"
                style={{ borderColor: config.colorClaro1, color: config.colorClaro1 }}
                onClick={() => window.location.href = '/panel/ajustes'}
              >
                <UploadCloud size={config.logoSize < 60 ? 14 : 24} className="group-hover:scale-110 transition-transform" />
                {config.logoSize > 60 && (
                  <span className="text-[9px] font-black uppercase tracking-tighter">Carga tu logo (Drive)</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest" style={{ color: config.colorClaro1 }}>
               <span className="cursor-pointer hover:opacity-70 transition-opacity">Productos</span>
               <span className="cursor-pointer hover:opacity-70 transition-opacity">Contacto</span>
            </nav>
            <div className="p-2 relative" style={{ color: config.colorClaro1 }}>
              <ShoppingBag size={28} />
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black text-white shadow-lg" 
                style={{ backgroundColor: config.colorMedio1 }}
              >
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* --- 2. HERO PREVIEW --- */}
        <section className="py-24 md:py-40 text-center px-6">
          <h1 
            className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8" 
            style={{ color: config.colorOscuro1 }}
          >
            {config.nombreLargo}
          </h1>
          <p 
            className="max-w-2xl mx-auto text-sm md:text-xl font-medium opacity-60 mb-12 uppercase tracking-wide" 
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
            Explorar Catálogo
          </button>
        </section>

        {/* --- 3. SECCIÓN DE PRODUCTOS (EMPTY STATE & GRID) --- */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t" style={{ borderTopColor: config.colorOscuro1 + '10' }}>
          <div className="flex items-center justify-between mb-12 border-l-8 pl-4" style={{ borderColor: config.colorMedio1 }}>
            <h2 className="text-3xl font-black uppercase italic" style={{ color: config.colorOscuro1 }}>
              Lanzamientos
            </h2>
          </div>

          {config.productosInvitado.length === 0 ? (
            /* 🚩 CARTEL DE AVISO MEJORADO */
            <div 
              className="bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem] p-16 md:p-32 text-center flex flex-col items-center gap-8 shadow-inner"
            >
              <div className="bg-amber-100 p-8 rounded-full text-amber-600 shadow-sm">
                <PackagePlus size={60} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase text-black italic">Tu tienda está vacía</h3>
                <p className="text-slate-500 font-bold max-w-sm mx-auto uppercase text-[10px] leading-relaxed tracking-widest">
                  Para ver la magia completa, cargá tus propios productos (máximo 10) desde el panel de gestión.
                </p>
              </div>
              <Link 
                href="/panel/productos"
                className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-black uppercase text-xs hover:bg-orange-600 transition-all shadow-xl active:scale-95"
              >
                Cargar mi primer producto <ChevronRight size={18} />
              </Link>
            </div>
          ) : (
            /* GRILLA DE PRODUCTOS DINÁMICA */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {config.productosInvitado.map((p) => (
                <div 
                  key={p.id} 
                  className="group transition-all flex flex-col"
                  style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}
                >
                  <div className="aspect-square overflow-hidden relative shadow-md" style={{ borderRadius: `${config.buttonRadius}px` }}>
                    <img 
                      src={getDriveDirectLink(p.img, "500")} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={p.titulo} 
                    />
                    <div 
                      className="absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-black text-white shadow-xl" 
                      style={{ backgroundColor: config.colorMedio1 }}
                    >
                       ${p.precio.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6 text-center flex-1 flex flex-col justify-center">
                    <p className="text-[9px] font-black uppercase opacity-40 mb-2 tracking-[0.2em]">{p.cat || 'Categoría'}</p>
                    <h3 className="font-bold text-sm uppercase tracking-tighter leading-tight" style={{ color: config.colorOscuro1 }}>
                      {p.titulo}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* --- 4. FOOTER DE LA MARCA (NORMALIZADO) --- */}
      <footer
        className="text-center py-24 px-6 border-t-8"
        style={{ 
          backgroundColor: config.colorOscuro1, 
          borderTopColor: config.colorMedio1 
        }}
      >
        <h4 className="text-4xl font-black uppercase tracking-tighter mb-4" style={{ color: config.colorClaro1 }}>
          {config.nombreMedio}
        </h4>
        <p className="text-xs font-bold uppercase opacity-50 mb-12 tracking-[0.3em]" style={{ color: config.colorClaro1 }}>
          {config.categoriasLanding || "Simulador de Tienda SaaS"}
        </p>

        <div className="flex justify-center flex-wrap gap-6 text-[10px] font-black uppercase mb-12" style={{ color: config.colorClaro1 }}>
          <span className="cursor-pointer hover:underline opacity-80">Arrepentimiento</span>
          <span className="cursor-pointer hover:underline opacity-80">FAQ</span>
          <span className="cursor-pointer hover:underline opacity-80">Contacto</span>
          <span className="cursor-pointer hover:underline opacity-80">Envíos</span>
          <span className="cursor-pointer hover:underline opacity-80">Términos</span>
        </div>

        <div className="flex justify-center gap-10 text-white opacity-40 mb-12">
          <Instagram size={30} className="hover:scale-110 transition-transform cursor-pointer" /> 
          <MessageCircle size={30} className="hover:scale-110 transition-transform cursor-pointer" />
        </div>

        <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-20" style={{ color: config.colorClaro1 }}>
          © {new Date().getFullYear()} {config.nombreCorto} — Todos los derechos reservados
        </p>
      </footer>

      {/* --- 5. BOTONES FLOTANTES DE NAVEGACIÓN --- */}
      
      {/* Botón Volver (Izquierda) */}
      <button 
        onClick={() => window.location.href = '/panel/ajustes'}
        className="fixed bottom-10 left-6 bg-black text-white p-5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.4)] border-2 border-white/20 active:scale-95 transition-all z-100 group"
      >
        <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Botón WhatsApp (Derecha) */}
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-6 bg-[#25D366] text-white p-5 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.4)] active:scale-95 transition-all z-100 animate-bounce"
      >
        <MessageCircle size={32} fill="white" className="text-[#25D366]" />
      </a>

    </div>
  );
}