"use client"

import { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";
import { 
  Palette, 
  ImageIcon, 
  Save, 
  RefreshCcw, 
  Info,
  CheckCircle2
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";

/**
 * COMPONENTE CUSTOMIZER - SECCIÓN DE BRANDING DINÁMICO
 * Este componente permite al administrador y clientes potenciales
 * modificar la identidad visual de la tienda en tiempo real.
 */
export default function Customizer() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 🛡️ SOLUCIÓN AL ERROR DE HIDRATACIÓN (NEXT.JS + ZUSTAND PERSIST)
  // Evita que el servidor intente renderizar datos que solo existen en el navegador.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-slate-200/50 animate-pulse rounded-2xl border border-dashed border-slate-300 flex items-center justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-tighter text-xs">Cargando motor de diseño...</p>
      </div>
    );
  }

  // Manejador de cambios de color centralizado
  const handleColorChange = (key: 'colorPrimario' | 'colorSecundario', value: string) => {
    config.setConfig({ [key]: value });
  };

  // Función para simular el guardado (Próximo paso: Conexión con Sheets)
  const handlePublish = async () => {
    setIsSaving(true);
    // Aquí irá la llamada a lib/configActions.ts
    setTimeout(() => {
      setIsSaving(false);
      alert("Configuración aplicada localmente. (Conexión a Sheets en proceso)");
    }, 1000);
  };

  return (
    <div className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 mt-6">
      
      {/* CABECERA DEL COMPONENTE */}
      <div className="flex items-center justify-between border-b-2 border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg shadow-md">
            <Palette size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-black uppercase text-sm tracking-tighter text-black">
              Personalización en Vivo
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase">
              SaaS Identity Manager
            </p>
          </div>
        </div>
        
        {isSaving && (
          <div className="flex items-center gap-2 text-red-600 animate-bounce">
            <RefreshCcw size={14} className="animate-spin" />
            <span className="text-[10px] font-black uppercase">Sincronizando...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* COLUMNA IZQUIERDA: PALETA DE COLORES */}
        <div className="space-y-6">
          <div className="group">
            <label className="text-[11px] font-black uppercase text-slate-600 block mb-3 ml-1 tracking-widest">
              Color Primario <span className="text-red-500">(Botones y Títulos)</span>
            </label>
            <div className="flex gap-3">
              <input 
                type="color" 
                value={config.colorPrimario} 
                onChange={(e) => handleColorChange('colorPrimario', e.target.value)}
                className="w-14 h-14 rounded-xl cursor-pointer border-2 border-black shadow-sm bg-transparent"
              />
              <input 
                type="text" 
                value={config.colorPrimario} 
                onChange={(e) => handleColorChange('colorPrimario', e.target.value)}
                className="flex-1 px-5 text-sm font-mono font-bold uppercase rounded-xl border-2 border-black/10 focus:border-red-600 outline-none transition-all bg-white text-black"
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[11px] font-black uppercase text-slate-600 block mb-3 ml-1 tracking-widest">
              Color Secundario <span className="text-slate-400">(Fondos y Acabados)</span>
            </label>
            <div className="flex gap-3">
              <input 
                type="color" 
                value={config.colorSecundario} 
                onChange={(e) => handleColorChange('colorSecundario', e.target.value)}
                className="w-14 h-14 rounded-xl cursor-pointer border-2 border-black shadow-sm bg-transparent"
              />
              <input 
                type="text" 
                value={config.colorSecundario} 
                onChange={(e) => handleColorChange('colorSecundario', e.target.value)}
                className="flex-1 px-5 text-sm font-mono font-bold uppercase rounded-xl border-2 border-black/10 focus:border-red-600 outline-none transition-all bg-white text-black"
              />
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: LOGO Y ACCIONES */}
        <div className="space-y-6">
          <div>
            <label className="text-[11px] font-black uppercase text-slate-600 block mb-3 ml-1 tracking-widest">
              Asset de Marca <span className="text-slate-400">(URL Logo PNG)</span>
            </label>
            <div className="flex gap-3">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border-2 border-black overflow-hidden shrink-0 shadow-sm">
                <img 
                  src={getDriveDirectLink(config.logoUrl, "200")} 
                  alt="Preview" 
                  className="max-w-[80%] max-h-[80%] object-contain"
                  onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")}
                />
              </div>
              <input 
                type="text" 
                placeholder="Pegá el link de Drive aquí..."
                value={config.logoUrl}
                onChange={(e) => config.setConfig({ logoUrl: e.target.value })}
                className="flex-1 px-5 text-xs font-bold rounded-xl border-2 border-black/10 focus:border-red-600 outline-none transition-all bg-white text-black"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={() => config.resetConfig()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-200 hover:bg-slate-300 text-[11px] font-black uppercase rounded-2xl transition-all text-slate-700 border border-black/5"
            >
              <RefreshCcw size={16} /> Restaurar Default
            </button>
            
            <button 
              onClick={handlePublish}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white hover:bg-red-600 text-[11px] font-black uppercase rounded-2xl transition-all shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-y-1 active:shadow-none disabled:opacity-50"
            >
              <Save size={16} /> Publicar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER DE ESTADO */}
      <div className="p-4 bg-red-600/5 border-2 border-red-600/10 rounded-2xl flex items-start gap-4">
        <div className="bg-red-600 rounded-full p-1 mt-0.5">
          <Info size={14} className="text-white" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-red-900 leading-tight font-black uppercase tracking-tighter">
            Modo Simulador Activo
          </p>
          <p className="text-[9px] text-red-800/70 font-medium leading-tight">
            Los cambios en colores y logo son visibles instantáneamente en tu sesión. 
            Al hacer clic en <span className="font-bold">Publicar</span>, se guardarán en la Planilla Maestra para todos los usuarios.
          </p>
        </div>
      </div>
    </div>
  );
}