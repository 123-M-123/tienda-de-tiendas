"use client"

import { useConfig } from "@/hooks/useConfig";
import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Instagram, 
  MessageCircle, 
  ExternalLink,
  Info,
  PackagePlus,
  ChevronRight
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";
import DynamicStyles from "@/app/components/DynamicStyles";
import Link from "next/link";

export default function PreviewPage() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Lógica de WhatsApp Dinámica para el invitado
  const waLink = `https://wa.me/${config.waUser}?text=Hola!%20Vengo%20desde%20tu%20web%20de%20prueba.`;

  return (
    <div 
      className="min-h-screen font-sans transition-all duration-500 flex flex-col" 
      style={{ backgroundColor: config.colorClaro1 }}
    >
      <DynamicStyles />
      
      {/* --- 1. HEADER PREVIEW (Basado en colorOscuro1) --- */}
      <header 
        className="sticky top-0 z-50 py-4 md:py-6 border-b shadow-md transition-all" 
        style={{ backgroundColor: config.colorOscuro1, borderBottomColor: config.colorMedio1 + '40' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div style={{ height: `${config.logoSize}px` }} className="flex items-center">
            <img 
              src={config.logoUrl} 
              className="h-full w-auto object-contain" 
              onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")}
              alt="Logo Preview" 
            />
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest" style={{ color: config.colorClaro1 }}>
               <span className="cursor-pointer hover:opacity-70">Colección</span>
               <span className="cursor-pointer hover:opacity-70">Contacto</span>
            </nav>
            <div className="p-2 relative" style={{ color: config.colorClaro1 }}>
              <ShoppingBag size={28} />
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black text-white" 
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
        <section className="py-20 md:py-32 text-center px-6">
          <h1 
            className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6" 
            style={{ color: config.colorOscuro1 }}
          >
            {config.nombreLargo}
          </h1>
          <p 
            className="max-w-2xl mx-auto text-sm md:text-xl font-medium opacity-60 mb-10" 
            style={{ color: config.colorOscuro2 }}
          >
            {config.metaDescripcion}
          </p>
          <button 
            style={{ backgroundColor: config.colorMedio1, borderRadius: `${config.buttonRadius}px` }}
            className="px-10 py-5 text-white font-black uppercase text-sm shadow-xl hover:scale-105 transition-all"
          >
            Explorar Catálogo
          </button>
        </section>

        {/* --- 3. SECCIÓN DE PRODUCTOS (CON LÓGICA DE AVISO) --- */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-12 border-l-8 pl-4" style={{ borderColor: config.colorMedio1 }}>
            <h2 className="text-2xl font-black uppercase italic" style={{ color: config.colorOscuro1 }}>
              Nuestros Productos
            </h2>
          </div>

          {config.productosInvitado.length === 0 ? (
            /* 🚩 CARTEL DE AVISO: SI NO HAY PRODUCTOS */
            <div 
              className="bg-white border-2 border-dashed border-black/10 rounded-4xl p-12 md:p-20 text-center flex flex-col items-center gap-6 shadow-inner"
            >
              <div className="bg-amber-100 p-6 rounded-full text-amber-600">
                <PackagePlus size={50} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase text-black">Tu vitrina está vacía</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto uppercase text-xs">
                  Cargá hasta 10 productos en tu panel para ver cómo lucen con este diseño.
                </p>
              </div>
              <Link 
                href="/panel/productos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-black uppercase text-xs hover:bg-orange-600 transition-all shadow-lg"
              >
                Cargar mi primer producto <ChevronRight size={16} />
              </Link>
            </div>
          ) : (
            /* GRILLA DE PRODUCTOS */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {config.productosInvitado.map((p) => (
                <div 
                  key={p.id} 
                  className="group transition-all flex flex-col"
                  style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}
                >
                  <div className="aspect-square overflow-hidden relative shadow-sm" style={{ borderRadius: `${config.buttonRadius}px` }}>
                    <img 
                      src={getDriveDirectLink(p.img, "500")} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={p.titulo} 
                    />
                    <div 
                      className="absolute bottom-3 right-3 px-4 py-2 rounded-full text-xs font-black text-white shadow-lg" 
                      style={{ backgroundColor: config.colorMedio1 }}
                    >
                       ${p.precio.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 text-center flex-1 flex flex-col justify-center">
                    <p className="text-[9px] font-black uppercase opacity-40 mb-1 tracking-widest">{p.cat || 'Categoría'}</p>
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

      {/* --- 4. FOOTER DE LA MARCA (Normal, con las políticas) --- */}
      <footer
        className="text-center py-16 px-6 border-t-4"
        style={{ backgroundColor: config.colorOscuro1, borderTopColor: config.colorClaro1 }}
      >
        <h4 className="text-3xl font-black uppercase tracking-widest mb-2" style={{ color: config.colorClaro1 }}>
          {config.nombreMedio}
        </h4>
        <p className="text-xs font-bold uppercase opacity-60 mb-8" style={{ color: config.colorClaro1 }}>
          {config.categoriasLanding || "Tu Tienda SaaS"}
        </p>

        <p className="text-[10px] font-black uppercase space-x-2 mb-6" style={{ color: config.colorClaro1 }}>
          <span>© {new Date().getFullYear()} Todos los derechos reservados</span>
        </p>

        <div className="flex justify-center flex-wrap gap-4 text-[10px] font-black uppercase opacity-80" style={{ color: config.colorClaro1 }}>
          <span className="cursor-pointer hover:underline">Arrepentimiento</span> |
          <span className="cursor-pointer hover:underline">FAQ</span> |
          <span className="cursor-pointer hover:underline">Contacto</span> |
          <span className="cursor-pointer hover:underline">Envíos</span> |
          <span className="cursor-pointer hover:underline">Términos</span>
        </div>
      </footer>

      {/* ESPACIO RESERVADO para el footer fijo */}
      <div className="h-22.5" />

      {/* --- 5. FOOTER TIENDA DE TIENDAS (FIJO ABAJO SIEMPRE) --- */}
      <footer
        className="fixed bottom-0 left-0 w-full z-300 py-4 px-6 text-center shadow-[0_-10px_30px_rgba(0,0,0,0.3)] transition-all"
        style={{ backgroundColor: config.colorMedio1 }}
      >
        <p className="text-[11px] font-black text-white m-0 flex items-center justify-center gap-2">
          <a href="https://tienda-de-tiendas.vercel.app" target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">
            Diseño y Desarrollo web: Tienda de Tiendas <ExternalLink size={12} />
          </a>
        </p>
        <p className="text-[10px] text-white/80 m-0 uppercase font-bold tracking-tighter">
          Promo Micro Emp 50% off hasta Dic 2026
        </p>
        <p className="text-[10px] text-white/80 m-0 font-bold uppercase">
          <a href="mailto:tiendadtiendas@gmail.com">Tené tu Web en 2 días ✉️ Contacto</a>
        </p>
      </footer>

      {/* --- 6. BOTONES FLOTANTES DE NAVEGACIÓN --- */}
      
      {/* Botón Volver (Izquierda) */}
      <button 
        onClick={() => window.location.href = '/panel/ajustes'}
        className="fixed bottom-28 left-6 bg-black text-white p-4 rounded-full shadow-2xl border-2 border-white/20 active:scale-95 transition-all z-100 group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Botón WhatsApp (Derecha) */}
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-900/40 active:scale-95 transition-all z-100 animate-bounce"
      >
        <MessageCircle size={28} fill="white" className="text-[#25D366]" />
      </a>

    </div>
  );
}