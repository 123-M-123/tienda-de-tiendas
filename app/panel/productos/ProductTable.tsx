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
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-sm"
      >
        <Plus size={16} /> Nuevo Artículo
      </button>

      // ... (mismo encabezado y imports)

      {/* CONTENEDOR CON SCROLL - Sin bg-white */}
      <div className="rounded-xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="max-h-125 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white text-[10px] uppercase font-bold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {initialData.map((row, i) => (
                <tr key={i} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-500">{row[1]}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 line-clamp-2 max-w-62.5">{row[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">${Number(row[3]).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${Number(row[7]) > 0 ? 'bg-emerald-50/50 text-emerald-700 border-emerald-200' : 'bg-amber-50/50 text-amber-700 border-amber-200'}`}>
                      {row[7] || 0} U.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => openModal(row)} className="p-2 text-slate-500 hover:text-blue-600 rounded-lg transition-all">
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

// ... (resto del modal igual)

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl relative border border-slate-100">
            <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
               <Box className="text-slate-400" /> {editingProd ? "Editar Artículo" : "Nuevo Artículo"}
            </h3>
            <form action={async (fd) => { await saveProduct(fd, !!editingProd); setShowModal(false); }} className="space-y-4">
              <input type="hidden" name="id" value={editingProd ? editingProd[1] : `P-${Date.now().toString().slice(-6)}`} />
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Nombre</label>
                <input name="titulo" defaultValue={editingProd?.[2] || ""} className="w-full bg-slate-50 border-slate-200 p-3 rounded-xl font-bold" required />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Precio</label><input name="precio" type="number" defaultValue={editingProd?.[3] || ""} className="w-full bg-slate-50 border-slate-200 p-3 rounded-xl font-bold" required /></div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Categoría</label><input name="cat" defaultValue={editingProd?.[6] || ""} className="w-full bg-slate-50 border-slate-200 p-3 rounded-xl font-bold" /></div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Stock</label><input name="stock" type="number" defaultValue={editingProd?.[7] || ""} className="w-full bg-slate-50 border-slate-200 p-3 rounded-xl font-bold" /></div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 flex items-center gap-1">
                  <ImageIcon size={10} /> Link Imagen
                </label>
                <input name="img" defaultValue={editingProd?.[5] || ""} className="w-full bg-slate-50 border-slate-200 p-3 rounded-xl font-bold text-xs" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 flex items-center gap-1">
                  <AlignLeft size={10} /> Descripción
                </label>
                <textarea name="desc" defaultValue={editingProd?.[4] || ""} className="w-full bg-slate-50 border-slate-200 p-3 rounded-xl font-bold text-sm h-20 outline-none resize-none" />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}