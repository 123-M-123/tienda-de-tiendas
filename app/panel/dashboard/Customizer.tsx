"use client"

import { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";
import { Palette, ImageIcon, Save, RefreshCcw } from "lucide-react";

export default function Customizer() {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);

  // 🔥 FIX DE HIDRATACIÓN: Solo renderiza cuando el cliente está listo
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-40 bg-slate-100 animate-pulse rounded-xl" />;

  const handleColorChange = (key: 'colorPrimario' | 'colorSecundario', value: string) => {
    config.setConfig({ [key]: value });
  };

  return (
    <div className="bg-[#faf7ed] p-6 rounded-xl border border-black shadow-lg space-y-6">
      <div className="flex items-center gap-2 border-b border-black/10 pb-2">
        <Palette size={20} className="text-red-600" />
        <h3 className="font-black uppercase text-xs tracking-widest text-black">Personalización en Vivo</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BLOQUE COLORES */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Color Primario</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={config.colorPrimario} 
                onChange={(e) => handleColorChange('colorPrimario', e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-black/10 bg-transparent"
              />
              <input 
                type="text" 
                value={config.colorPrimario} 
                onChange={(e) => handleColorChange('colorPrimario', e.target.value)}
                className="flex-1 px-4 text-xs font-mono font-bold uppercase rounded-lg border border-black/10 outline-none focus:border-red-600 bg-white text-black"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Color Secundario</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={config.colorSecundario} 
                onChange={(e) => handleColorChange('colorSecundario', e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-black/10 bg-transparent"
              />
              <input 
                type="text" 
                value={config.colorSecundario} 
                onChange={(e) => handleColorChange('colorSecundario', e.target.value)}
                className="flex-1 px-4 text-xs font-mono font-bold uppercase rounded-lg border border-black/10 outline-none focus:border-red-600 bg-white text-black"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE LOGO */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">URL del Logo (Link de Drive)</label>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-black/10 overflow-hidden">
                <img src={config.logoUrl} alt="Preview" className="max-w-[80%] max-h-[80%] object-contain" />
              </div>
              <input 
                type="text" 
                placeholder="Pegá el link de Drive"
                value={config.logoUrl}
                onChange={(e) => config.setConfig({ logoUrl: e.target.value })}
                className="flex-1 px-4 text-[10px] font-bold rounded-lg border border-black/10 outline-none focus:border-red-600 bg-white text-black"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button 
              onClick={() => config.resetConfig()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-[10px] font-black uppercase rounded-xl transition-all text-slate-700"
            >
              <RefreshCcw size={14} /> Reset
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white hover:bg-red-600 text-[10px] font-black uppercase rounded-xl transition-all shadow-lg"
            >
              <Save size={14} /> Publicar
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 bg-red-600/5 border border-red-600/10 rounded-lg">
        <p className="text-[9px] text-red-900 leading-tight font-medium uppercase italic">
          Modo Simulador activo: Los cambios son instantáneos.
        </p>
      </div>
    </div>
  )
}