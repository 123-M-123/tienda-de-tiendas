"use client"

import { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";
import { 
  Palette, Save, RefreshCcw, ShieldCheck, 
  Share2, Wallet, Truck, LayoutGrid, Maximize2,
  Type, MousePointer2, Send, Info, UserPlus
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";

interface CustomizerProps {
  targetVendedor?: string;
  isGuest?: boolean;
}

export default function Customizer({ targetVendedor, isGuest }: CustomizerProps) {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Estado local para capturar el WhatsApp del invitado (Lead)
  const [guestPhone, setGuestPhone] = useState("");

  useEffect(() => { 
    setMounted(true); 
    // Sincronizamos el modo en el cerebro global
    config.setConfig({ isGuestMode: !!isGuest });
  }, [isGuest]);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-slate-100 animate-pulse rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
        <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Iniciando Consola de Diseño...</p>
      </div>
    );
  }

  // 🚩 LÓGICA DE ACCIÓN FINAL
  const handleAction = async () => {
    setIsSaving(true);

    if (isGuest) {
      // MODO INVITADO: Mandamos Lead por WhatsApp
      const mensaje = `
🚀 *SOLICITUD DE ALTA SAAS*
--------------------------
👤 *Contacto:* ${guestPhone || 'No proveído'}
🏷️ *Marca:* ${config.nombreMedio}
🎨 *Color:* ${config.colorMedio1}
🖼️ *Logo:* ${config.logoUrl}
🧱 *Categorías:* ${config.categoriasLanding}
      `;
      window.open(`https://wa.me/5491153778475?text=${encodeURIComponent(mensaje)}`, "_blank");
      setIsSaving(false);
    } else {
      // MODO CLIENTE: Aquí irá la conexión a Google Sheets
      setTimeout(() => {
        setIsSaving(false);
        alert(`Configuración de "${targetVendedor}" guardada en Planilla Maestra.`);
      }, 1500);
    }
  };

  return (
    <div className="space-y-10 pb-24 font-sans">
      
      {/* 🛡️ CABECERA DE SEGURIDAD */}
      <div className="bg-black text-white p-6 rounded-2xl flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2 rounded-lg">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Contexto de Seguridad</p>
            <h3 className="text-sm font-bold uppercase">{targetVendedor || "Sesión de Invitado"}</h3>
          </div>
        </div>
        {isGuest && (
          <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase">Modo Simulador</span>
        )}
      </div>

      {/* --- SECCIÓN 1: IDENTIDAD & METADATA --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Type className="text-blue-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Metadata & Nombres SEO</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Nombre Corto (Header)</label>
            <input 
              value={config.nombreCorto} 
              onChange={(e) => config.setConfig({ nombreCorto: e.target.value })} 
              className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full focus:border-blue-600 outline-none transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Nombre Marca (Footer)</label>
            <input 
              value={config.nombreMedio} 
              onChange={(e) => config.setConfig({ nombreMedio: e.target.value })} 
              className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full focus:border-blue-600 outline-none transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Nombre Largo (Google)</label>
            <input 
              value={config.nombreLargo} 
              onChange={(e) => config.setConfig({ nombreLargo: e.target.value })} 
              className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full focus:border-blue-600 outline-none transition-all text-xs" 
            />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: PALETA DE 9 COLORES --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Palette className="text-red-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Sistema Cromático (9 Tonos)</h3>
        </div>
        
        {/* BLOQUE OSCUROS */}
        <div className="space-y-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tonos Profundos (Header/Sidebar/Footer)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Oscuro1', 'Oscuro2', 'Oscuro3'].map((key) => (
              <div key={key} className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-14 h-14 rounded-xl border-2 border-black/10 cursor-pointer" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-xl font-mono text-xs uppercase font-bold" />
              </div>
            ))}
          </div>
        </div>

        {/* BLOQUE MEDIOS */}
        <div className="space-y-4">
          <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">Tonos de Marca (Botones/Links/Iconos)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Medio1', 'Medio2', 'Medio3'].map((key) => (
              <div key={key} className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-14 h-14 rounded-xl border-2 border-black/10 cursor-pointer" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-xl font-mono text-xs uppercase font-bold" />
              </div>
            ))}
          </div>
        </div>

        {/* BLOQUE CLAROS */}
        <div className="space-y-4">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Tonos de Fondo (Secciones/Cards)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Claro1', 'Claro2', 'Claro3'].map((key) => (
              <div key={key} className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-14 h-14 rounded-xl border-2 border-black/10 cursor-pointer" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-xl font-mono text-xs uppercase font-bold" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: REDES & CONTACTO --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Share2 className="text-emerald-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Canales de Venta</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'waUser', label: 'WhatsApp', placeholder: '54911...' },
            { id: 'igUser', label: 'Instagram', placeholder: '@usuario' },
            { id: 'ttUser', label: 'TikTok', placeholder: '@usuario' },
            { id: 'publicEmail', label: 'Email Público', placeholder: 'info@...' },
          ].map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500">{field.label}</label>
              <input 
                placeholder={field.placeholder}
                value={(config as any)[field.id]} 
                onChange={(e) => config.setConfig({ [field.id]: e.target.value })} 
                className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full text-xs outline-none focus:border-emerald-600" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 4: FINANZAS & PAGOS --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Wallet className="text-amber-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Finanzas & Descuentos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black uppercase text-slate-500">Alias de Cobro</label>
            <input value={config.alias} onChange={(e) => config.setConfig({ alias: e.target.value })} className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full outline-none focus:border-amber-600" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500">CBU / CVU</label>
            <input value={config.cbu} onChange={(e) => config.setConfig({ cbu: e.target.value })} className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full text-xs outline-none focus:border-amber-600" />
          </div>
          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black uppercase text-slate-500">% Desc. Transf.</label>
            <input type="number" value={config.descuentoEfectivo} onChange={(e) => config.setConfig({ descuentoEfectivo: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full outline-none focus:border-amber-600" />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 5: LOGÍSTICA & ENVÍOS --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Truck className="text-purple-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Costos de Logística</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Envío Local (Cadetería)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">$</span>
              <input type="number" value={config.envioLocal} onChange={(e) => config.setConfig({ envioLocal: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-4 pl-8 rounded-xl font-bold w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500">Envío Nacional (Correo)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">$</span>
              <input type="number" value={config.envioNacional} onChange={(e) => config.setConfig({ envioNacional: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-4 pl-8 rounded-xl font-bold w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 6: DISEÑO & CATEGORÍAS --- */}
      <section className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <LayoutGrid className="text-orange-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter">Estructura & Dimensiones</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 flex justify-between">Categorías Landing <span>(Máx 5)</span></label>
                <input 
                  placeholder="remeras,pantalones,accesorios"
                  value={config.categoriasLanding} 
                  onChange={(e) => config.setConfig({ categoriasLanding: e.target.value })} 
                  className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full outline-none focus:border-orange-600" 
                />
                <p className="text-[8px] font-bold text-slate-400 uppercase italic">Escribí las categorías separadas por coma exactamente como en el Excel.</p>
             </div>
             
             <div className="space-y-6">
                {[
                  { label: 'Escala del Logo Header', key: 'logoSize', min: 40, max: 200 },
                  { label: 'Botones Navegación', key: 'navButtonSize', min: 60, max: 150 },
                  { label: 'Botones en Páginas', key: 'pageButtonSize', min: 100, max: 300 },
                  { label: 'Redondeo (Border Radius)', key: 'buttonRadius', min: 0, max: 40 }
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 flex justify-between">
                      {item.label} <span>{(config as any)[item.key]}px</span>
                    </label>
                    <input 
                      type="range" min={item.min} max={item.max} 
                      value={(config as any)[item.key]} 
                      onChange={(e) => config.setConfig({ [item.key]: parseInt(e.target.value) })} 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-black cursor-pointer" 
                    />
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500">Activo de Marca (Link Drive)</label>
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-white rounded-2xl border-2 border-black flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                  <img 
                    src={getDriveDirectLink(config.logoUrl, "200")} 
                    alt="Logo" 
                    className="max-w-[85%] max-h-[85%] object-contain" 
                    onError={(e) => (e.currentTarget.src = "/logo-nuevo.png")} 
                  />
                </div>
                <textarea 
                  value={config.logoUrl} 
                  onChange={(e) => config.setConfig({ logoUrl: e.target.value })} 
                  className="flex-1 bg-white border-2 border-black/10 p-4 rounded-xl font-bold text-[10px] h-24 resize-none outline-none focus:border-orange-600" 
                  placeholder="Pegá el link de Drive aquí..." 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN FINAL: GUARDADO & LEAD CAPTURE --- */}
      <section className={`p-8 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${isGuest ? 'bg-emerald-50' : 'bg-slate-900 text-white'}`}>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {isGuest && (
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700">
                <UserPlus size={20} />
                <h4 className="font-black uppercase text-sm italic">Guardar mi progreso</h4>
              </div>
              <input 
                type="text"
                placeholder="Tu WhatsApp (Para hablar con un diseñador)"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="bg-white border-2 border-emerald-200 p-4 rounded-xl font-bold w-full text-black outline-none focus:border-emerald-600 shadow-inner"
              />
            </div>
          )}

          {!isGuest && (
            <div className="flex-1">
              <h4 className="font-black uppercase text-sm italic text-emerald-400">Publicación Oficial</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Los cambios se guardarán en la Planilla Maestra de Google.</p>
            </div>
          )}

          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={() => { if(confirm('¿Seguro? Se perderán los cambios no publicados.')) config.resetConfig() }} 
              className="px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all text-slate-400"
            >
              <RefreshCcw size={16} className="inline mr-2" /> Reset
            </button>
            
            <button 
              onClick={handleAction} 
              disabled={isSaving} 
              className={`flex-1 md:flex-none px-12 py-5 rounded-2xl text-xs font-black uppercase transition-all shadow-lg active:translate-y-1 active:shadow-none ${isGuest ? 'bg-emerald-600 text-white hover:bg-black' : 'bg-white text-black hover:bg-emerald-500 hover:text-white'}`}
            >
              {isSaving ? (
                "Procesando..."
              ) : isGuest ? (
                <><Send size={18} className="inline mr-2" /> Solicitar mi Web</>
              ) : (
                <><Save size={18} className="inline mr-2" /> Publicar en Sheets</>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* BLOQUE DE INFO FINAL */}
      <div className="flex items-center gap-3 justify-center opacity-30">
        <div className="h-px bg-black flex-1"></div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em]">Tienda de Tiendas Engine 2024</p>
        <div className="h-px bg-black flex-1"></div>
      </div>

    </div>
  );
}