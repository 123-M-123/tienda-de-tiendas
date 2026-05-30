"use client"

import { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";
import { 
  Palette, Save, RefreshCcw, ShieldCheck, 
  Share2, Wallet, Truck, LayoutGrid, Maximize2,
  Type, MousePointer2
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";

export default function Customizer({ targetVendedor }: { targetVendedor?: string }) {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-full h-screen bg-slate-100 animate-pulse rounded-2xl border-2 border-dashed border-slate-300" />;

  const handlePublish = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Configuración Maestra sincronizada localmente.");
    }, 1500);
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* --- SECCIÓN 1: IDENTIDAD & METADATA --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <ShieldCheck className="text-blue-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Metadata & SEO</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Nombre Corto</label>
            <input value={config.nombreCorto} onChange={(e) => config.setConfig({ nombreCorto: e.target.value })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Nombre Mediano (Marca)</label>
            <input value={config.nombreMedio} onChange={(e) => config.setConfig({ nombreMedio: e.target.value })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Nombre Largo (SEO)</label>
            <input value={config.nombreLargo} onChange={(e) => config.setConfig({ nombreLargo: e.target.value })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500">Descripción para Google/WhatsApp</label>
          <textarea value={config.metaDescripcion} onChange={(e) => config.setConfig({ metaDescripcion: e.target.value })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full h-20 resize-none" />
        </div>
      </section>

      {/* --- SECCIÓN 2: PALETA DE 9 COLORES --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Palette className="text-red-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Sistema de Colores (9 Tonos)</h3>
        </div>
        
        {/* FILA OSCUROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Oscuro1', 'Oscuro2', 'Oscuro3'].map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400">Tono {key}</label>
              <div className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-12 h-12 rounded-lg border-2 border-black/10" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-lg font-mono text-xs uppercase" />
              </div>
            </div>
          ))}
        </div>
        {/* FILA MEDIOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Medio1', 'Medio2', 'Medio3'].map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-[10px] font-black uppercase text-red-400">Tono {key}</label>
              <div className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-12 h-12 rounded-lg border-2 border-black/10" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-lg font-mono text-xs uppercase" />
              </div>
            </div>
          ))}
        </div>
        {/* FILA CLAROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Claro1', 'Claro2', 'Claro3'].map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-300">Tono {key}</label>
              <div className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-12 h-12 rounded-lg border-2 border-black/10" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-lg font-mono text-xs uppercase" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 3: REDES & CONTACTO --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Share2 className="text-emerald-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Conectividad Social</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['waUser', 'igUser', 'ttUser', 'publicEmail'].map((field) => (
            <div key={field} className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500">{field.replace('User', '')}</label>
              <input value={(config as any)[field]} onChange={(e) => config.setConfig({ [field]: e.target.value })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full text-xs" />
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 4: FINANZAS & PAGOS --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Wallet className="text-amber-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Datos de Cobro</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500">Alias</label><input value={config.alias} onChange={(e) => config.setConfig({ alias: e.target.value })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" /></div>
          <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500">CBU</label><input value={config.cbu} onChange={(e) => config.setConfig({ cbu: e.target.value })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full text-xs" /></div>
          <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500">% Desc. Transf.</label><input type="number" value={config.descuentoEfectivo} onChange={(e) => config.setConfig({ descuentoEfectivo: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" /></div>
        </div>
      </section>

      {/* --- SECCIÓN 5: LOGÍSTICA & ENVÍOS --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Truck className="text-purple-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Logística</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500">Envío Local ($)</label><input type="number" value={config.envioLocal} onChange={(e) => config.setConfig({ envioLocal: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" /></div>
          <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500">Envío Nacional ($)</label><input type="number" value={config.envioNacional} onChange={(e) => config.setConfig({ envioNacional: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" /></div>
        </div>
      </section>

      {/* --- SECCIÓN 6: DISEÑO DE BOTONES & CATEGORÍAS --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <LayoutGrid className="text-orange-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Estructura & Dimensiones</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 flex justify-between">Categorías Landing <span>(Separadas por coma)</span></label>
                <input value={config.categoriasLanding} onChange={(e) => config.setConfig({ categoriasLanding: e.target.value })} placeholder="ej: remeras,pantalones,buzos" className="bg-white border-2 border-black/10 p-3 rounded-xl font-bold w-full" />
             </div>
             {/* SLIDERS */}
             {[
               { label: 'Tamaño Logo Header', key: 'logoSize', min: 40, max: 200 },
               { label: 'Botones Navegación', key: 'navButtonSize', min: 60, max: 150 },
               { label: 'Botones en Páginas', key: 'pageButtonSize', min: 100, max: 300 }
             ].map((item) => (
               <div key={item.key} className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 flex justify-between">{item.label} <span>{(config as any)[item.key]}px</span></label>
                 <input type="range" min={item.min} max={item.max} value={(config as any)[item.key]} onChange={(e) => config.setConfig({ [item.key]: parseInt(e.target.value) })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-black" />
               </div>
             ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500">URL del Logo (Drive)</label>
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-white rounded-xl border-2 border-black flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <img src={getDriveDirectLink(config.logoUrl, "200")} alt="Logo" className="max-w-[80%] max-h-[80%] object-contain" onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")} />
                </div>
                <textarea value={config.logoUrl} onChange={(e) => config.setConfig({ logoUrl: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-3 rounded-xl font-bold text-[10px] h-20 resize-none" placeholder="Link de Drive..." />
              </div>
            </div>
            <button onClick={handlePublish} disabled={isSaving} className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] hover:bg-red-600 transition-all active:translate-y-1 active:shadow-none">
              {isSaving ? "Sincronizando..." : "PUBLICAR CONFIGURACIÓN"}
            </button>
            <button onClick={() => config.resetConfig()} className="w-full text-slate-400 font-black uppercase text-[10px] hover:text-black transition-colors">
              Restaurar valores de fábrica
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}