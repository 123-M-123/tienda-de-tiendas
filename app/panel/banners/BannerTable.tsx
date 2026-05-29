"use client"

import { useState } from "react";
import { saveBanner } from "@/lib/bannerActions";
import { getDriveDirectLink } from "@/lib/utils"; // 🚀 Importado para arreglar miniaturas
import { 
  Plus, 
  Edit3, 
  X, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Layout 
} from "lucide-react";

export default function BannerTable({ initialData }: { initialData: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);

  const openModal = (banner = null) => {
    setEditingBanner(banner);
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      {/* BOTÓN NUEVO BANNER */}
      <button 
        onClick={() => openModal()}
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl"
      >
        <Plus size={16} /> Nuevo Banner
      </button>

      {/* CONTENEDOR DE TABLA */}
      <div className="rounded-xl border border-black shadow-2xl overflow-hidden">
        <div className="max-h-125 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">Ubicación (ID)</th>
                <th className="px-6 py-4 text-center">Imagen</th>
                <th className="px-6 py-4">Link Destino</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
              {initialData.map((row, i) => (
                <tr key={i} className="hover:bg-black/5 transition-colors">
                  {/* UBICACIÓN */}
                  <td className="px-6 py-4 text-sm font-bold text-black border-r border-black/5">
                    {row[2]}
                  </td>

                  {/* IMAGEN (Miniatura Corregida) */}
                  <td className="px-6 py-4 text-center border-r border-black/5">
                    <div className="flex justify-center">
                       {row[1] ? (
                         <img 
                          src={getDriveDirectLink(row[1], "200")} 
                          className="w-12 h-8 object-cover rounded border border-black/20 bg-white" 
                          alt="banner"
                          onError={(e) => (e.currentTarget.src = "https://placehold.co/200x120?text=Error+Link")}
                        />
                       ) : <ImageIcon size={20} className="text-slate-300" />}
                    </div>
                  </td>

                  {/* LINK DESTINO */}
                  <td className="px-6 py-4 text-[10px] text-slate-500 border-r border-black/5 truncate max-w-37.5">
                    {row[3] || "Sin link"}
                  </td>

                  {/* ACCIONES */}
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => openModal(row)} 
                      className="p-2 text-slate-600 hover:text-blue-600 rounded-lg transition-all hover:bg-white"
                    >
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDICIÓN / CREACIÓN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf7ed] p-8 rounded-xl w-full max-w-lg shadow-2xl relative border border-black">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute right-6 top-6 text-slate-500 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3 uppercase tracking-tighter border-b border-black/5 pb-2">
               <Layout size={20} className="text-red-600" /> 
               {editingBanner ? "Editar Banner" : "Nuevo Banner"}
            </h3>

            <form 
              action={async (fd) => { 
                await saveBanner(fd, !!editingBanner); 
                setShowModal(false); 
              }} 
              className="space-y-4"
            >
              <input type="hidden" name="vendedorOriginal" value={editingBanner ? editingBanner[0] : ""} />
              
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 block">Ubicación / ID (ej: hero-miel)</label>
                <input 
                  name="ubicacion" 
                  defaultValue={editingBanner?.[2] || ""} 
                  className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black focus:border-black outline-none" 
                  placeholder="feria-1, hero-miel, etc" 
                  required 
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 flex items-center gap-1">
                  <ImageIcon size={10} /> Link Imagen Drive
                </label>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded border-2 border-black/10 bg-white flex items-center justify-center overflow-hidden shrink-0">
                    {editingBanner?.[1] ? (
                      <img src={getDriveDirectLink(editingBanner[1], "100")} className="object-cover w-full h-full" alt="preview" />
                    ) : <ImageIcon size={16} className="text-slate-300" />}
                  </div>
                  <input 
                    name="img" 
                    defaultValue={editingBanner?.[1] || ""} 
                    className="flex-1 bg-white border border-black/20 p-3 rounded-lg font-bold text-black text-xs focus:border-black outline-none" 
                    placeholder="Pegá el link de Drive acá"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 flex items-center gap-1">
                  <LinkIcon size={10} /> Link Destino (Opcional)
                </label>
                <input 
                  name="linkDestino" 
                  defaultValue={editingBanner?.[3] || ""} 
                  className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black text-xs focus:border-black outline-none" 
                  placeholder="https://tu-tienda.com/producto/..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 text-white p-4 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-lg mt-4 active:scale-95"
              >
                Guardar Banner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}