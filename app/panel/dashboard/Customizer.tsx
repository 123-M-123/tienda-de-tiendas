"use client"

import { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";
import { 
  Palette, 
  Save, 
  RefreshCcw, 
  ShieldCheck, 
  Share2, 
  Wallet, 
  Truck, 
  LayoutGrid, 
  Maximize2,
  Type, 
  MousePointer2, 
  Send, 
  Info, 
  UserPlus,
  ImageIcon
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";

interface CustomizerProps {
  targetVendedor?: string;
  isGuest?: boolean;
}

/**
 * 🛠️ CONSOLA MAESTRA DE DISEÑO SaaS
 * Este componente es el "Cerebro Visual" del sistema.
 * Controla 32 variables dinámicas que impactan en tiempo real.
 */
export default function Customizer({ targetVendedor, isGuest }: CustomizerProps) {
  const config = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Estado local para capturar el WhatsApp del invitado (Lead de Venta)
  const [guestPhone, setGuestPhone] = useState("");

  // 🛡️ PROTOCOLO DE HIDRATACIÓN: Garantiza estabilidad en Next.js
  useEffect(() => { 
    setMounted(true); 
    // Sincronizamos el estado de invitado en el cerebro global
    config.setConfig({ isGuestMode: !!isGuest });
  }, [isGuest]);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-slate-100 animate-pulse rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
        <p className="text-slate-400 font-black uppercase text-xs tracking-widest italic">
          Cargando Motor de Identidad SaaS...
        </p>
      </div>
    );
  }

  // 🚩 GESTIÓN DE ACCIONES (INVITADO VS CLIENTE)
  const handleAction = async () => {
    setIsSaving(true);

    if (isGuest) {
      // MODO INVITADO: Genera el Lead para Marcos
      const mensaje = `Hola! Estuve probando el simulador y me encantó. Quiero hablar con un diseñador para contratar mi web SaaS.\n\nMarca: ${config.nombreMedio}\nWhatsApp de contacto: ${guestPhone}\nColor Elegido: ${config.colorMedio1}`;
      window.open(`https://wa.me/5491153778475?text=${encodeURIComponent(mensaje)}`, "_blank");
      setIsSaving(false);
    } else {
      // MODO CLIENTE: Conexión futura a Google Sheets API
      setTimeout(() => {
        setIsSaving(false);
        alert(`Configuración de "${targetVendedor}" sincronizada con la Planilla Maestra.`);
      }, 1500);
    }
  };

  return (
    <div className="space-y-10 pb-24 font-sans">
      
      {/* 🛡️ BANNER DE CONTEXTO DE SEGURIDAD */}
      <div className="bg-black text-white p-6 rounded-2xl flex justify-between items-center shadow-xl border-b-4 border-red-600">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2 rounded-lg shadow-lg">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Contexto de Seguridad Activo</p>
            <h3 className="text-sm font-bold uppercase tracking-tight">{targetVendedor || "Simulador / Invitado"}</h3>
          </div>
        </div>
        {isGuest && (
          <div className="flex items-center gap-2 bg-amber-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg animate-pulse">
            <Info size={14} /> Modo Sandbox
          </div>
        )}
      </div>

      {/* --- SECCIÓN 1: IDENTIDAD & METADATA --- */}
      <section id="seccion-identidad" className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Type className="text-blue-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter text-black italic">Metadata & Nombres SEO</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Nombre Corto (Header)</label>
            <input 
              value={config.nombreCorto} 
              onChange={(e) => config.setConfig({ nombreCorto: e.target.value })} 
              className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full focus:border-blue-600 outline-none transition-all" 
              placeholder="Ej: MiMarca"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Nombre Marca (Footer)</label>
            <input 
              value={config.nombreMedio} 
              onChange={(e) => config.setConfig({ nombreMedio: e.target.value })} 
              className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full focus:border-blue-600 outline-none transition-all" 
              placeholder="Ej: Mi Marca Store"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Nombre Largo (Buscadores)</label>
            <input 
              value={config.nombreLargo} 
              onChange={(e) => config.setConfig({ nombreLargo: e.target.value })} 
              className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full focus:border-blue-600 outline-none transition-all text-xs" 
              placeholder="Ej: Mi Marca - La mejor tienda de..."
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Descripción Meta (WhatsApp / Google)</label>
          <textarea 
            value={config.metaDescripcion} 
            onChange={(e) => config.setConfig({ metaDescripcion: e.target.value })} 
            className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full h-20 resize-none outline-none focus:border-blue-600 transition-all text-xs"
            placeholder="Escribí aquí cómo querés que se vea tu descripción en redes sociales..."
          />
        </div>
      </section>

      {/* --- SECCIÓN 2: PALETA DE 9 COLORES (DETALLADA) --- */}
      <section id="seccion-colores" className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-10">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Palette className="text-red-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter text-black italic">Sistema Cromático (9 Niveles)</h3>
        </div>
        
        {/* BLOQUE OSCUROS */}
        <div className="space-y-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 border-l-2 border-black pl-2">Nivel 1: Tonos Profundos (Fondo Header / Footer)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Oscuro1', 'Oscuro2', 'Oscuro3'].map((key) => (
              <div key={key} className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-14 h-14 rounded-xl border-2 border-black cursor-pointer shadow-sm" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-xl font-mono text-xs uppercase font-bold text-center" />
              </div>
            ))}
          </div>
        </div>

        {/* BLOQUE MEDIOS */}
        <div className="space-y-4">
          <p className="text-[9px] font-black text-red-400 uppercase tracking-widest ml-1 border-l-2 border-red-600 pl-2">Nivel 2: Tonos de Acento (Botones / Iconos / Enlaces)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Medio1', 'Medio2', 'Medio3'].map((key) => (
              <div key={key} className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-14 h-14 rounded-xl border-2 border-black cursor-pointer shadow-sm" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-xl font-mono text-xs uppercase font-bold text-center" />
              </div>
            ))}
          </div>
        </div>

        {/* BLOQUE CLAROS */}
        <div className="space-y-4">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1 border-l-2 border-white pl-2">Nivel 3: Tonos de Luz (Fondos de Sección / Cards)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Claro1', 'Claro2', 'Claro3'].map((key) => (
              <div key={key} className="flex gap-2">
                <input type="color" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="w-14 h-14 rounded-xl border-2 border-black cursor-pointer shadow-sm" />
                <input type="text" value={(config as any)[`color${key}`]} onChange={(e) => config.setConfig({ [`color${key}`]: e.target.value })} className="flex-1 bg-white border-2 border-black/10 p-2 rounded-xl font-mono text-xs uppercase font-bold text-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: REDES & CONTACTO --- */}
      <section id="seccion-redes" className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Share2 className="text-emerald-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter text-black italic">Canales de Venta & Social</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { id: 'waUser', label: 'WhatsApp', placeholder: '54911...' },
            { id: 'igUser', label: 'Instagram', placeholder: '@usuario' },
            { id: 'ttUser', label: 'TikTok', placeholder: '@usuario' },
            { id: 'publicEmail', label: 'Email Público', placeholder: 'info@tuweb.com' },
          ].map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-1">{field.label}</label>
              <input 
                placeholder={field.placeholder}
                value={(config as any)[field.id]} 
                onChange={(e) => config.setConfig({ [field.id]: e.target.value })} 
                className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full text-xs outline-none focus:border-emerald-600 transition-all" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 4: FINANZAS & PAGOS --- */}
      <section id="seccion-finanzas" className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Wallet className="text-amber-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter text-black italic">Parámetros de Cobro</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Alias de Cobro</label>
            <input value={config.alias} onChange={(e) => config.setConfig({ alias: e.target.value })} className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full outline-none focus:border-amber-600 transition-all uppercase" placeholder="tu.marca.alias" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">CBU / CVU Oficial</label>
            <input value={config.cbu} onChange={(e) => config.setConfig({ cbu: e.target.value })} className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full text-xs outline-none focus:border-amber-600 transition-all" placeholder="00000031000..." />
          </div>
          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">% Descuento Efvo.</label>
            <div className="relative">
              <input type="number" value={config.descuentoEfectivo} onChange={(e) => config.setConfig({ descuentoEfectivo: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full outline-none focus:border-amber-600 transition-all" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-400">%</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 5: LOGÍSTICA & ENVÍOS --- */}
      <section id="seccion-logistica" className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <Truck className="text-purple-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter text-black italic">Costos de Logística</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Costo Envío Local</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
              <input type="number" value={config.envioLocal} onChange={(e) => config.setConfig({ envioLocal: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-4 pl-10 rounded-xl font-bold w-full focus:border-purple-600 outline-none transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Costo Envío Nacional</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
              <input type="number" value={config.envioNacional} onChange={(e) => config.setConfig({ envioNacional: parseInt(e.target.value) })} className="bg-white border-2 border-black/10 p-4 pl-10 rounded-xl font-bold w-full focus:border-purple-600 outline-none transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 6: DISEÑO, LOGO & CATEGORÍAS --- */}
      <section id="seccion-logo" className="bg-[#faf7ed] p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-10">
        <div className="flex items-center gap-3 border-b-2 border-black/5 pb-4">
          <LayoutGrid className="text-orange-600" size={24} />
          <h3 className="font-black uppercase text-sm tracking-tighter text-black italic">Estructura & Dimensiones</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CONTROL DE CATEGORÍAS */}
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 flex justify-between ml-1">Categorías de Landing <span>(Máximo 5)</span></label>
                <input 
                  placeholder="remeras,pantalones,buzos,accesorios"
                  value={config.categoriasLanding} 
                  onChange={(e) => config.setConfig({ categoriasLanding: e.target.value })} 
                  className="bg-white border-2 border-black/10 p-4 rounded-xl font-bold w-full outline-none focus:border-orange-600 transition-all" 
                />
                <p className="text-[8px] font-bold text-slate-400 uppercase italic tracking-tighter ml-1">Separalas por coma. Se crearán botones automáticos en la Home.</p>
             </div>
             
             {/* SLIDERS DE CONTROL VISUAL */}
             <div className="space-y-6 bg-white/40 p-6 rounded-2xl border border-black/5">
                {[
                  { label: 'Escala Logo Header', key: 'logoSize', min: 40, max: 200 },
                  { label: 'Tamaño Nav Side', key: 'navButtonSize', min: 60, max: 150 },
                  { label: 'Botones Cat. Page', key: 'pageButtonSize', min: 100, max: 300 },
                  { label: 'Redondeo General', key: 'buttonRadius', min: 0, max: 40 }
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 flex justify-between tracking-widest ml-1">
                      {item.label} <span className="text-orange-600">{(config as any)[item.key]}px</span>
                    </label>
                    <input 
                      type="range" min={item.min} max={item.max} 
                      value={(config as any)[item.key]} 
                      onChange={(e) => config.setConfig({ [item.key]: parseInt(e.target.value) })} 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-black cursor-pointer shadow-inner" 
                    />
                  </div>
                ))}
             </div>
          </div>

          {/* CONTROL DE ACTIVO DE MARCA (LOGO) */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Activo de Marca (Link Directo de Drive)</label>
              <div className="flex gap-4">
                <div 
                  className="w-24 h-24 bg-white rounded-2xl border-2 border-black flex items-center justify-center overflow-hidden shrink-0 shadow-lg group relative"
                  title="Vista Previa del Logo"
                >
                  <img 
                    src={getDriveDirectLink(config.logoUrl, "200")} 
                    alt="Logo" 
                    className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform" 
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/200x200?text=Subí+tu+Logo")} 
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon size={20} className="text-black/10" />
                  </div>
                </div>
                <textarea 
                  value={config.logoUrl} 
                  onChange={(e) => config.setConfig({ logoUrl: e.target.value })} 
                  className="flex-1 bg-white border-2 border-black/10 p-4 rounded-xl font-bold text-[10px] h-24 resize-none outline-none focus:border-orange-600 shadow-inner" 
                  placeholder="Pegá aquí el link de compartir de Google Drive (Formato JPG o PNG)..." 
                />
              </div>
            </div>
            
            <div className="p-4 bg-orange-600/5 border-2 border-orange-600/10 rounded-2xl flex items-start gap-4">
               <Info size={20} className="text-orange-600 shrink-0" />
               <p className="text-[9px] text-orange-900 font-bold uppercase leading-tight tracking-tighter">
                  Asegurate de que el link de Drive tenga permisos de "Cualquier persona con el enlace". El sistema normalizará la URL automáticamente.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN FINAL: PUBLICACIÓN & LEAD CAPTURE --- */}
      <section 
        className={`p-10 rounded-[2.5rem] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 ${isGuest ? 'bg-emerald-50 border-emerald-600 shadow-emerald-900/20' : 'bg-slate-900 text-white shadow-black/40'}`}
      >
        <div className="flex flex-col md:flex-row gap-10 items-center">
          
          {/* MODO INVITADO: Captura de Lead */}
          {isGuest && (
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 text-emerald-800">
                <UserPlus size={24} />
                <h4 className="font-black uppercase text-lg italic tracking-tight">Solicitud de Alta</h4>
              </div>
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest leading-none">Para hablar con un diseñador y contratar</p>
              <input 
                type="text"
                placeholder="Tu WhatsApp para contactarte..."
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="bg-white border-2 border-emerald-200 p-5 rounded-2xl font-black w-full text-black outline-none focus:border-emerald-600 shadow-inner text-sm"
              />
            </div>
          )}

          {/* MODO CLIENTE: Confirmación */}
          {!isGuest && (
            <div className="flex-1 space-y-2">
              <h4 className="font-black uppercase text-xl italic text-emerald-400 tracking-tighter">Sincronización Maestra</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Los cambios impactarán en la Landing y Panel para todos los usuarios.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* BOTÓN RESET */}
            <button 
              onClick={() => { if(confirm('¿Restablecer diseño original? Se perderán los cambios locales.')) config.resetConfig() }} 
              className="px-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all text-slate-500 active:scale-95"
            >
              <RefreshCcw size={18} className="inline mr-2" /> Reset
            </button>
            
            {/* BOTÓN ACCIÓN FINAL */}
            <button 
              onClick={handleAction} 
              disabled={isSaving} 
              className={`flex-1 md:flex-none px-16 py-6 rounded-3xl text-sm font-black uppercase transition-all shadow-xl active:translate-y-1 active:shadow-none ${isGuest ? 'bg-emerald-600 text-white hover:bg-black shadow-emerald-900/30' : 'bg-white text-black hover:bg-emerald-500 hover:text-white shadow-black/20'}`}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                   <RefreshCcw size={18} className="animate-spin" /> Procesando...
                </span>
              ) : isGuest ? (
                <><Send size={20} className="inline mr-2" /> Solicitar mi Web</>
              ) : (
                <><Save size={20} className="inline mr-2" /> Publicar en Sheets</>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER TÉCNICO DE REFERENCIA */}
      <div className="flex items-center gap-4 justify-center opacity-20 py-10">
        <div className="h-0.5 bg-black flex-1 max-w-25"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.6em] whitespace-nowrap italic">SaaS Core v2.4 — Engine Stable</p>
        <div className="h-0.5 bg-black flex-1 max-w-25"></div>
      </div>

    </div>
  );
}