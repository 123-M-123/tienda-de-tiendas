"use client"

import { useConfig } from "@/hooks/useConfig";
import { Palette, ImageIcon, Save, RefreshCcw } from "lucide-react";

export default function Customizer() {
  const config = useConfig();

  const handleColorChange = (key: 'colorPrimario' | 'colorSecundario', value: string) => {
    config.setConfig({ [key]: value });
  };

  return (
    <div className="bg-[#faf7ed] p-6 rounded-xl border border-black shadow-lg space-y-6">
      <div className="flex items-center gap-2 border-b border-black/10 pb-2">
        <Palette size={20} className="text-red-600" />
        <h3 className="font-black uppercase text-xs tracking-widest">Personalización en Vivo</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* COLORES */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Color Primario (Botones/Links)</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={config.colorPrimario} 
                onChange={(e) => handleColorChange('colorPrimario', e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-black/10"
              />
              <input 
                type="text" 
                value={config.colorPrimario} 
                onChange={(e) => handleColorChange('colorPrimario', e.target.value)}
                className="flex-1 px-4 text-xs font-mono font-bold uppercase rounded-lg border border-black/10 outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Color Secundario (Fondo Header)</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={config.colorSecundario} 
                onChange={(e) => handleColorChange('colorSecundario', e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-black/10"
              />
              <input 
                type="text" 
                value={config.colorSecundario} 
                onChange={(e) => handleColorChange('colorSecundario', e.target.value)}
                className="flex-1 px-4 text-xs font-mono font-bold uppercase rounded-lg border border-black/10 outline-none focus:border-red-600"
              />
            </div>
          </div>
        </div>

        {/* LOGO Y PREVIEW */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">URL del Logo (Drive)</label>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-black/10">
                <img src={config.logoUrl} alt="Logo" className="max-w-[80%] max-h-[80%] object-contain" />
              </div>
              <input 
                type="text" 
                placeholder="Pegá el link de Drive acá"
                value={config.logoUrl}
                onChange={(e) => config.setConfig({ logoUrl: e.target.value })}
                className="flex-1 px-4 text-[10px] font-bold rounded-lg border border-black/10 outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button 
              onClick={() => config.resetConfig()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-[10px] font-black uppercase rounded-xl transition-all"
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
        <p className="text-[9px] text-red-900 leading-tight">
          <strong>Modo Simulador:</strong> Los cambios que hagas se guardan solo en tu navegador. Al darle a <strong>Publicar</strong>, se enviarán a la Google Sheet (Solo Clientes).
        </p>
      </div>
    </div>
  )
}