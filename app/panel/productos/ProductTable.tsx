"use client"
import { useState, useEffect } from "react";
import { saveProduct } from "@/lib/productActions";
import { useConfig } from "@/hooks/useConfig";
import { 
  Plus, 
  Edit3, 
  X, 
  Box, 
  Image as ImageIcon, 
  AlignLeft, 
  Trash2,
  ExternalLink 
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";

export default function ProductTable({ initialData }: { initialData: any[] }) {
  const config = useConfig();
  const [showModal, setShowModal] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 🛡️ Decidimos qué datos mostrar (Sheets para clientes, LocalStorage para invitados)
  const displayData = config.isGuestMode 
    ? config.productosInvitado.map(p => ["", p.id, p.titulo, p.precio, p.desc, p.img, p.cat, p.stock]) 
    : initialData;

  const openModal = (prod = null) => {
    setEditingProd(prod);
    setShowModal(true);
  };

  // 🚩 ACCIÓN PARA INVITADOS (Simulación)
  const handleGuestAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nuevoProd = {
      id: fd.get("id") as string,
      titulo: fd.get("titulo") as string,
      precio: Number(fd.get("precio")),
      img: fd.get("img") as string,
      cat: fd.get("cat") as string,
      desc: fd.get("desc") as string,
      stock: Number(fd.get("stock")),
    };
    config.addProductoInvitado(nuevoProd);
    setShowModal(false);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      {/* BOTÓN SUPERIOR */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => openModal()} 
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-black text-xs uppercase shadow-xl hover:bg-orange-700 transition-all active:scale-95"
        >
          <Plus size={16} /> Nuevo Artículo {config.isGuestMode && `(${config.productosInvitado.length}/10)`}
        </button>
      </div>

      {/* CONTENEDOR DE TABLA */}
      <div className="rounded-xl border border-black shadow-2xl overflow-hidden bg-white">
        <div className="max-h-125 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white font-black uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4 text-center">Imagen</th> {/* 🚩 NUEVA COLUMNA */}
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
              {displayData.map((row, i) => (
                <tr key={i} className="hover:bg-black/5 transition-colors text-black">
                  <td className="px-6 py-4 text-[10px] font-black opacity-40">{row[1]}</td>
                  
                  {/* MINIATURA DE PRODUCTO */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-lg bg-white border border-black/10 overflow-hidden flex items-center justify-center">
                        {row[5] ? (
                          <img 
                            src={getDriveDirectLink(row[5], "200")} 
                            className="object-cover w-full h-full" 
                            alt="thumb" 
                            onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=No+Image")}
                          />
                        ) : <ImageIcon size={18} className="text-slate-300" />}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold uppercase tracking-tighter">{row[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-700">${Number(row[3]).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black border border-emerald-400 bg-emerald-50 text-emerald-800">
                      {row[7] || 0} U.
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => openModal(row)} 
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      {config.isGuestMode && (
                        <button 
                          onClick={() => { if(confirm('¿Borrar producto de simulación?')) config.removeProductoInvitado(row[1]) }} 
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                        >
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

      {/* MODAL DE EDICIÓN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf7ed] p-8 rounded-2xl w-full max-w-lg shadow-2xl relative border-2 border-black text-black">
            <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-500 hover:text-black">
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-black mb-6 uppercase flex items-center gap-3 italic tracking-tighter">
              <Box size={22} className="text-orange-600" /> 
              {editingProd ? "Editar Artículo" : "Nuevo Artículo"}
            </h3>
            
            <form 
              onSubmit={config.isGuestMode ? handleGuestAction : undefined} 
              action={config.isGuestMode ? undefined : async (fd) => { await saveProduct(fd, !!editingProd); setShowModal(false); }} 
              className="space-y-4"
            >
              <input type="hidden" name="vendedorOriginal" value={editingProd ? editingProd[0] : ""} />
              <input type="hidden" name="id" value={editingProd ? editingProd[1] : `P-${Date.now().toString().slice(-6)}`} />
              
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Nombre del Producto</label>
                <input name="titulo" defaultValue={editingProd?.[2] || ""} className="w-full bg-white border-2 border-black/10 p-3 rounded-xl font-bold focus:border-orange-600 outline-none" required />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Precio ($)</label>
                  <input name="precio" type="number" defaultValue={editingProd?.[3] || ""} className="w-full bg-white border-2 border-black/10 p-3 rounded-xl font-bold focus:border-orange-600 outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Categoría</label>
                  <input name="cat" defaultValue={editingProd?.[6] || ""} className="w-full bg-white border-2 border-black/10 p-3 rounded-xl font-bold focus:border-orange-600 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Stock</label>
                  <input name="stock" type="number" defaultValue={editingProd?.[7] || ""} className="w-full bg-white border-2 border-black/10 p-3 rounded-xl font-bold focus:border-orange-600 outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Link Imagen (Drive)</label>
                <div className="flex gap-2">
                  <input name="img" defaultValue={editingProd?.[5] || ""} className="flex-1 bg-white border-2 border-black/10 p-3 rounded-xl font-bold text-[10px] focus:border-orange-600 outline-none" placeholder="https://drive..." />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Descripción Breve</label>
                <textarea name="desc" defaultValue={editingProd?.[4] || ""} className="w-full bg-white border-2 border-black/10 p-3 rounded-xl font-bold text-sm h-24 resize-none focus:border-orange-600 outline-none" />
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white p-5 rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] hover:bg-black transition-all active:translate-y-1 active:shadow-none">
                {editingProd ? "Guardar Cambios" : "Agregar Producto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}