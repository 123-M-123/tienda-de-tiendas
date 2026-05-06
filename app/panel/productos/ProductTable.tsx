"use client"
import { useState } from "react";
import { saveProduct } from "@/lib/productActions";
import { Plus, Edit3, X, Box, Image as ImageIcon, AlignLeft } from "lucide-react";

export default function ProductTable({ initialData }: { initialData: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);

  const openModal = (prod = null) => {
    setEditingProd(prod);
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={() => openModal()}
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-sm"
      >
        <Plus size={16} /> Nuevo Artículo
      </button>

      {/* CONTENEDOR CON SCROLL Y ALTURA LIMITADA */}
      <div className="bg-[#F1F5F9] rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="sticky top-0 z-10 bg-[#F1F5F9] border-b border-slate-200">
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest">
                <th className="px-8 py-4 font-bold">ID</th>
                <th className="px-8 py-4 font-bold">Producto</th>
                <th className="px-8 py-4 font-bold">Precio</th>
                <th className="px-8 py-4 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialData.map((row, i) => (
                <tr key={i} className="hover:bg-white/50 transition-colors bg-white/30">
                  <td className="px-8 py-4 text-[10px] font-mono text-slate-400">{row[1]}</td>
                  <td className="px-8 py-4 text-sm font-bold text-slate-700 truncate max-w-[250px]">{row[2]}</td>
                  <td className="px-8 py-4 text-sm font-black text-slate-900">${Number(row[3]).toLocaleString()}</td>
                  <td className="px-8 py-4 text-center">
                    <button onClick={() => openModal(row)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL EDITAR / NUEVO */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-[3rem] w-full max-w-lg shadow-2xl relative border border-slate-100">
            <button onClick={() => setShowModal(false)} className="absolute right-8 top-8 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
               <Box className="text-blue-500" /> {editingProd ? "Editar Artículo" : "Nuevo Artículo"}
            </h3>

            <form action={async (fd) => { await saveProduct(fd, !!editingProd); setShowModal(false); }} className="space-y-4">
              {/* ID oculto para edición, o generado para nuevo */}
              <input type="hidden" name="id" value={editingProd ? editingProd[1] : `P-${Date.now().toString().slice(-6)}`} />
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest">Nombre del Producto</label>
                <input name="titulo" defaultValue={editingProd?.[2] || ""} className="w-full bg-[#F1F5F9] border-none p-4 rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest">Precio ($)</label>
                  <input name="precio" type="number" defaultValue={editingProd?.[3] || ""} className="w-full bg-[#F1F5F9] border-none p-4 rounded-2xl font-bold text-slate-700 outline-none" required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest">Categoría</label>
                  <input name="cat" defaultValue={editingProd?.[6] || ""} className="w-full bg-[#F1F5F9] border-none p-4 rounded-2xl font-bold text-slate-700 outline-none" placeholder="Ej: Mieles" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest flex items-center gap-1">
                  <ImageIcon size={10} /> URL Imagen (Drive/Web)
                </label>
                <input name="img" defaultValue={editingProd?.[5] || ""} className="w-full bg-[#F1F5F9] border-none p-4 rounded-2xl font-bold text-slate-500 text-xs outline-none" />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest flex items-center gap-1">
                  <AlignLeft size={10} /> Descripción
                </label>
                <textarea name="desc" defaultValue={editingProd?.[4] || ""} className="w-full bg-[#F1F5F9] border-none p-4 rounded-2xl font-bold text-slate-700 text-sm h-24 outline-none resize-none" />
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white p-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                {editingProd ? "Guardar Cambios" : "Publicar Artículo"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}