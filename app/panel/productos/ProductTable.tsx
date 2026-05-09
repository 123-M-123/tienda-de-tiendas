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
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl"
      >
        <Plus size={16} /> Nuevo Artículo
      </button>

      <div className="rounded-xl border border-black shadow-2xl overflow-hidden">
        <div className="max-h-125 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
              {initialData.map((row, i) => (
                <tr key={i} className="hover:bg-transparent transition-colors">
                  <td className="px-6 py-4 text-[10px] font-black text-slate-500 border-r border-black/5">{row[1]}</td>
                  <td className="px-6 py-4 text-sm font-bold text-black border-r border-black/5">{row[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-black border-r border-black/5">${Number(row[3]).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center border-r border-black/5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${Number(row[7]) > 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-400' : 'bg-amber-100 text-amber-800 border-amber-400'}`}>
                      {row[7] || 0} U.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => openModal(row)} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all">
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf7ed] p-8 rounded-xl w-full max-w-lg shadow-2xl relative border border-black">
            <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-500 hover:text-black transition-colors">
              <X size={24} />
            </button>
            <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
               <Box size={20} /> {editingProd ? "Editar Artículo" : "Nuevo Artículo"}
            </h3>
            
            <form action={async (fd) => { await saveProduct(fd, !!editingProd); setShowModal(false); }} className="space-y-4">
              {/* CAMPO VITAL: Preserva el email original del vendedor durante la edición */}
              <input type="hidden" name="vendedorOriginal" value={editingProd ? editingProd[0] : ""} />
              
              <input type="hidden" name="id" value={editingProd ? editingProd[1] : `P-${Date.now().toString().slice(-6)}`} />
              
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 block">Nombre</label>
                <input name="titulo" defaultValue={editingProd?.[2] || ""} className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black focus:border-black outline-none" required />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 block">Precio</label><input name="precio" type="number" defaultValue={editingProd?.[3] || ""} className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black focus:border-black outline-none" required /></div>
                <div><label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 block">Categoría</label><input name="cat" defaultValue={editingProd?.[6] || ""} className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black focus:border-black outline-none" /></div>
                <div><label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 block">Stock</label><input name="stock" type="number" defaultValue={editingProd?.[7] || ""} className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black focus:border-black outline-none" /></div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 flex items-center gap-1">
                  <ImageIcon size={10} /> Link Imagen
                </label>
                <input name="img" defaultValue={editingProd?.[5] || ""} className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black text-xs focus:border-black outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 mb-1 flex items-center gap-1">
                  <AlignLeft size={10} /> Descripción
                </label>
                <textarea name="desc" defaultValue={editingProd?.[4] || ""} className="w-full bg-white border border-black/20 p-3 rounded-lg font-bold text-black text-sm h-20 outline-none resize-none focus:border-black" />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-lg">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}