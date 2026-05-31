"use client"

import { useConfig } from "@/hooks/useConfig";
import { useEffect, useState } from "react";
import { ShoppingBag, Star, ArrowLeft, ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";
import DynamicStyles from "@/app/components/DynamicStyles";

export default function PreviewPage() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen font-sans transition-all duration-500"
      style={{ backgroundColor: config.colorClaro1 }}
    >
      <DynamicStyles />

      {/* --- HEADER SIMULADO --- */}
      <header className="sticky top-0 z-50 py-6 border-b shadow-sm transition-all" style={{ backgroundColor: config.colorOscuro1, borderBottomColor: config.colorMedio1 + '30' }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div style={{ height: `${config.logoSize}px` }} className="flex items-center">
            <img 
              src={config.logoUrl} 
              className="h-full w-auto object-contain" 
              onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")}
              alt="Logo Preview" 
            />
          </div>
          <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest" style={{ color: config.colorClaro1 }}>
             <span className="cursor-pointer hover:opacity-70">Colección</span>
             <span className="cursor-pointer hover:opacity-70">Nosotros</span>
             <span className="cursor-pointer hover:opacity-70">Contacto</span>
          </nav>
          <div className="p-2 relative" style={{ color: config.colorClaro1 }}>
            <ShoppingBag size={24} />
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black" style={{ backgroundColor: config.colorMedio1, color: 'white' }}>0</span>
          </div>
        </div>
      </header>

      {/* --- HERO SIMULADO --- */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6" style={{ color: config.colorOscuro1 }}>
          {config.nombreLargo}
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-xl font-medium opacity-60 mb-10" style={{ color: config.colorOscuro2 }}>
          {config.metaDescripcion}
        </p>
        <button 
          style={{ backgroundColor: config.colorMedio1, borderRadius: `${config.buttonRadius}px` }}
          className="px-10 py-5 text-white font-black uppercase text-sm shadow-xl hover:scale-105 transition-all"
        >
          Explorar Productos
        </button>
      </section>

      {/* --- GRILLA DE PRODUCTOS (LOS 10 DE MENTIRA) --- */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12 border-l-8 pl-4" style={{ borderColor: config.colorMedio1 }}>
          <h2 className="text-2xl font-black uppercase italic" style={{ color: config.colorOscuro1 }}>Lanzamientos</h2>
          <span className="text-xs font-bold uppercase opacity-40">Simulación de catálogo</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {config.productosInvitado.length === 0 ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-black/10 rounded-3xl">
              <p className="text-slate-400 font-bold uppercase text-xs">Cargá productos en el panel para verlos aquí.</p>
            </div>
          ) : config.productosInvitado.map((p) => (
            <div 
              key={p.id} 
              className="group transition-all"
              style={{ backgroundColor: config.colorClaro2, borderRadius: `${config.buttonRadius}px` }}
            >
              <div className="aspect-square overflow-hidden mb-4 relative" style={{ borderRadius: `${config.buttonRadius}px` }}>
                <img src={getDriveDirectLink(p.img, "500")} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.titulo} />
                <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full text-[10px] font-black text-white" style={{ backgroundColor: config.colorMedio1 }}>
                   ${p.precio.toLocaleString()}
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">{p.cat}</p>
                <h3 className="font-bold text-sm uppercase tracking-tighter" style={{ color: config.colorOscuro1 }}>{p.titulo}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER SIMULADO --- */}
      <footer className="py-20 mt-20" style={{ backgroundColor: config.colorOscuro1 }}>
        <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
           <h2 className="text-3xl font-black uppercase" style={{ color: config.colorClaro1 }}>{config.nombreCorto}</h2>
           <div className="flex justify-center gap-6">
              <Instagram size={24} style={{ color: config.colorMedio1 }} />
              <MessageCircle size={24} style={{ color: config.colorMedio1 }} />
           </div>
           <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: config.colorOscuro3 }}>
              Powered by Tienda de Tiendas Engine
           </p>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE VOLVER */}
      <button 
        onClick={() => window.close()}
        className="fixed bottom-10 right-10 bg-black text-white p-4 rounded-full shadow-2xl border-2 border-white/20 active:scale-95 transition-all z-100"
      >
        <ArrowLeft size={24} />
      </button>
    </div>
  );
}