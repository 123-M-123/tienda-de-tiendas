"use client"

import { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";
import { 
  Palette, 
  Save, 
  RefreshCcw, 
  Info,
  Maximize2,
  Image as ImageIcon
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";

interface CustomizerProps {
  targetVendedor?: string;
}

export default function Customizer({ targetVendedor }: CustomizerProps) {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 🛡️ SEGURIDAD DE HIDRATACIÓN
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-slate-100 animate-pulse rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
        <span className="text-slate-400 font-black uppercase text-[10px]">Cargando motor de diseño...</span>
      </div>
    );
  }

  const handlePublish = async () => {
    setIsSaving(true);
    // Lógica para guardar en Sheets (Próximo paso)
    setTimeout(() => {
      setIsSaving(false);
      alert("Configuración de estilo sincronizada localmente.");
    }, 1000);
  };

  return (
    <div className="bg-[#faf7ed] p-6 md:p-10 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-10 mt-6">
      
      {/* 1. ENCABEZADO DE SECCIÓN */}
      <div className="flex items-center justify-between border-b-2 border-black/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-3 rounded-xl shadow-lg">
            <Palette size={28} className="text-white" />
          </div>
          <div>
            <h3 className="font-black uppercase text-base tracking-tighter text-black">
              Personalización de Identidad
            </h3>
            <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">
              Editando: {targetVendedor || "Sesión Local"}
            </p>
          </div>
        </div>
        
        {isSaving && (
          <div className="flex items-center gap-2 text-red-600 animate-pulse">
            <RefreshCcw size={16} className="animate-spin" />
            <span className="text-[10px] font-black uppercase">Guardando...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* COLUMNA IZQUIERDA: COLORES Y TAMAÑO */}
        <div className="space-y-8">
          
          {/* COLOR PRIMARIO */}
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-black uppercase text-slate-600 ml-1">
              Color Primario <span className="text-red-500">(Acentos y Botones)</span>
            </label>
            <div className="flex gap-3">
              <input 
                type="color" 
                value={config.colorPrimario} 
                onChange={(e) => config.setConfig({ colorPrimario: e.target.value })} 
                className="w-16 h-16 rounded-xl cursor-pointer border-2 border-black bg-transparent p-1" 
              />
              <input 
                type="text" 
                value={config.colorPrimario} 
                onChange={(e) => config.setConfig({ colorPrimario: e.target.value })} 
                className="flex-1 px-5 py-2 text-sm font-mono font-bold uppercase rounded-xl border-2 border-black/10 bg-white text-black outline-none focus:border-red-600 transition-all" 
              />
            </div>
          </div>

          {/* COLOR SECUNDARIO */}
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-black uppercase text-slate-600 ml-1">
              Color Secundario <span className="text-slate-400">(Fondos y Detalles)</span>
            </label>
            <div className="flex gap-3">
              <input 
                type="color" 
                value={config.colorSecundario} 
                onChange={(e) => config.setConfig({ colorSecundario: e.target.value })} 
                className="w-16 h-16 rounded-xl cursor-pointer border-2 border-black bg-transparent p-1" 
              />
              <input 
                type="text" 
                value={config.colorSecundario} 
                onChange={(e) => config.setConfig({ colorSecundario: e.target.value })} 
                className="flex-1 px-5 py-2 text-sm font-mono font-bold uppercase rounded-xl border-2 border-black/10 bg-white text-black outline-none focus:border-red-600 transition-all" 
              />
            </div>
          </div>

          {/* TAMAÑO DEL LOGO (SLIDER) */}
          <div className="flex flex-col gap-4 p-4 bg-white/50 rounded-xl border border-black/5">
            <label className="text-[11px] font-black uppercase text-slate-600 flex items-center gap-2">
              <Maximize2 size={16} className="text-red-600" />
              Tamaño Visual del Logo: <span className="text-black ml-auto">{config.logoSize}px</span>
            </label>
            <input 
              type="range" 
              min="40" 
              max="250" 
              step="5"
              value={config.logoSize}
              onChange={(e) => config.setConfig({ logoSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600 border border-black/10"
            />
            <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-tighter">
              <span>Escala Mínima</span>
              <span>Escala Máxima</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: ASSETS Y ACCIONES */}
        <div className="space-y-8">
          
          {/* URL LOGO DRIVE */}
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-black uppercase text-slate-600 ml-1">
              URL del Logo <span className="text-slate-400">(Google Drive PNG)</span>
            </label>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border-2 border-black overflow-hidden shadow-md shrink-0 relative group">
                <img 
                  src={getDriveDirectLink(config.logoUrl, "200")} 
                  alt="Logo Preview" 
                  className="max-w-[85%] max-h-[85%] object-contain"
                  onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon size={16} className="text-black/20" />
                </div>
              </div>
              <textarea 
                value={config.logoUrl} 
                onChange={(e) => config.setConfig({ logoUrl: e.target.value })} 
                className="flex-1 px-5 py-3 text-[10px] font-bold rounded-xl border-2 border-black/10 bg-white text-black outline-none focus:border-red-600 transition-all resize-none h-20"
                placeholder="Pegá aquí el link de compartir de Google Drive..."
              />
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <button 
              onClick={() => config.resetConfig()}
              className="px-6 py-5 bg-slate-200 hover:bg-slate-300 text-[11px] font-black uppercase rounded-2xl transition-all text-slate-700 border-2 border-transparent active:scale-95"
            >
              <RefreshCcw size={18} className="inline-block mr-2" />
              Restaurar Valores
            </button>
            
            <button 
              onClick={handlePublish}
              disabled={isSaving}
              className="px-6 py-5 bg-black text-white hover:bg-red-600 text-[11px] font-black uppercase rounded-2xl transition-all shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] active:translate-y-1 active:shadow-none disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Publicar Cambios
            </button>
          </div>

          {/* INFO BOX */}
          <div className="p-4 bg-red-600/5 border-2 border-red-600/10 rounded-2xl flex items-start gap-4">
            <Info size={20} className="text-red-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-[10px] text-red-900 font-black uppercase tracking-tighter">Panel de Sincronización</p>
              <p className="text-[9px] text-red-800/60 font-bold leading-tight uppercase">
                Cualquier ajuste en los colores o el logo impactará globalmente en tu instancia SaaS al presionar publicar.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}