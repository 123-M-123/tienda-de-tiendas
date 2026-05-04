"use client"
import { useState } from "react";
import { saveProduct } from "@/lib/productActions";
import { Plus, Edit3, X, Box } from "lucide-react";

export default function ProductTable({ initialData }: { initialData: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);

  const openModal = (prod = null) => {
    setEditingProd(prod);
    setShowModal(true);
  };

  return (
    <>
      <button 
        onClick={() => openModal()}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-200"
      >
        <Plus size={16} /> Nuevo Artículo
      </button>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mt-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-4 font-bold">ID</th>
              <th className="px-8 py-4 font-bold">Título del Producto</th>
              <th className="px-8 py-4 font-bold">Precio</th>
              <th className="px-8 py-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {initialData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-5 text-[10px] font-mono text-slate-400">{row[1]}</td>
                <td className="px-8 py-5 text-sm font-semibold text-slate-700">{row[2]}</td>
                <td className="px-8 py-5 text-sm font-black text-slate-900">${Number(row[3]).toLocaleString()}</td>
                <td className="px-8 py-5 text-center">
                  <button onClick={() => openModal(row)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Edit3 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL MODERNO */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-[3rem] w-full max-w-lg shadow-2xl border border-slate-100 relative">
            <button onClick={() => setShowModal(false)} className="absolute right-8 top-8 text-slate-400 hover:text-slate-900">
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Box size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">
                {editingProd ? "Editar Artículo" : "Nuevo Artículo"}
              </h3>
            </div>
            
            <form action={async (fd) => {
              await saveProduct(fd, !!editingProd);
              setShowModal(false);
            }} className="space-y-5">
              {editingProd && <input type="hidden" name="id" value={editingProd[1]} />}
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Nombre del Producto</label>
                <input name="titulo" defaultValue={editingProd?.[2] || ""} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Precio (ARS)</label>
                  <input name="precio" type="number" defaultValue={editingProd?.[3] || ""} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold" required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Categoría</label>
                  <input name="cat" defaultValue={editingProd?.[6] || ""} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Link de Imagen</label>
                <input name="img" defaultValue={editingProd?.[5] || ""} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold text-xs" />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white p-4 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-100 hover:bg-slate-900 transition-all">
                  {editingProd ? "Actualizar" : "Publicar Ahora"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}