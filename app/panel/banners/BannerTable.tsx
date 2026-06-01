"use client"

import { useState, useEffect } from "react";
import { saveBanner } from "@/lib/bannerActions";
import { useConfig } from "@/hooks/useConfig";
import { getDriveDirectLink } from "@/lib/utils";
import { 
  Plus, 
  Edit3, 
  X, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Layout, 
  Trash2 
} from "lucide-react";

export default function BannerTable({ initialData }: { initialData: any[] }) {
  const config = useConfig();
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 🚩 FUNCIÓN RECUPERADA: Abre el modal para editar o crear
  const openModal = (banner = null) => {
    setEditingBanner(banner);
    setShowModal(true);
  };

  const displayData = config.isGuestMode 
    ? config.bannersInvitado.map(b => ["", b.img, b.ubicacion, b.linkDestino])
    : initialData;

  const handleGuestAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    config.addBannerInvitado({
      img: fd.get("img") as string,
      ubicacion: fd.get("ubicacion") as string,
      linkDestino: fd.get("linkDestino") as string,
    });
    setShowModal(false);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      <button 
        onClick={() => openModal()} 
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-black text-xs uppercase shadow-xl hover:bg-orange-700 transition-all"
      >
        <Plus size={16} /> Nuevo Banner {config.isGuestMode && `(${config.bannersInvitado.length})`}
      </button>

      <div className="rounded-xl border border-black shadow-2xl overflow-hidden bg-white">
        <div className="max-h-125 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white font-black uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">Ubicación (Palabra Clave)</th>
                <th className="px-6 py-4 text-center">Miniatura</th>
                <th className="px-6 py-4">Link Destino</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
              {displayData.map((row, i) => (
                <tr key={i} className="hover:bg-black/5 transition-colors text-black">
                  <td className="px-6 py-4 text-sm font-bold uppercase">{row[2]}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-10 rounded border border-black/10 overflow-hidden bg-white flex items-center justify-center shadow-sm">
                        {row[1] ? (
                          <img 
                            src={getDriveDirectLink(row[1], "200")} 
                            className="object-cover w-full h-full" 
                            alt="thumb" 
                            onError={(e) => (e.currentTarget.src = "https://placehold.co/200x120?text=Error")} 
                          />
                        ) : <ImageIcon size={20} className="text-slate-300" />}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold opacity-50 truncate max-w-40">{row[3] || "Sin link"}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                       <button onClick={() => openModal(row)} className="p-2 text-slate-600 hover:text-blue-600 transition-all">
                         <Edit3 size={18} />
                       </button>
                       {config.isGuestMode && (
                         <button onClick={() => config.removeBannerInvitado(row[2])} className="p-2 text-slate-400 hover:text-red-600 transition-all">
                           <Trash2 size={18} />
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        /* 🚩 CLASE CANÓNICA: z-999 */
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-999 flex items-center justify-center p-4">
          {/* 🚩 CLASE CANÓNICA: rounded-4xl */}
          <div className="bg-[#faf7ed] p-8 rounded-4xl w-full max-w-lg shadow-2xl relative border-2 border-black text-black">
            <button onClick={() => setShowModal(false)} className="absolute right-8 top-8 text-slate-400 hover:text-black"><X size={24} /></button>
            <h3 className="text-xl font-black mb-8 uppercase flex items-center gap-3 italic border-b border-black/5 pb-4">
              <ImageIcon size={22} className="text-purple-600" /> {editingBanner ? "Editar Publicidad" : "Nueva Publicidad"}
            </h3>
            <form onSubmit={config.isGuestMode ? handleGuestAction : undefined} action={config.isGuestMode ? undefined : async (fd) => { await saveBanner(fd, !!editingBanner); setShowModal(false); }} className="space-y-4">
              <input type="hidden" name="vendedorOriginal" value={editingBanner ? editingBanner[0] : ""} />
              <div><label className="text-[10px] font-black text-slate-500 uppercase">Ubicación (Palabra Clave)</label><input name="ubicacion" defaultValue={editingBanner?.[2] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold" required /></div>
              <div><label className="text-[10px] font-black text-slate-500 uppercase">Link Imagen Drive</label><input name="img" defaultValue={editingBanner?.[1] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold text-xs" required /></div>
              <div><label className="text-[10px] font-black text-slate-500 uppercase">Link Destino</label><input name="linkDestino" defaultValue={editingBanner?.[3] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold text-xs" /></div>
              <button type="submit" className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase text-xs shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all">Guardar Banner</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}