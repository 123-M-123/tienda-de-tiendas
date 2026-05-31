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
  AlertCircle
} from "lucide-react";
import { getDriveDirectLink } from "@/lib/utils";

/**
 * 📦 PRODUCT TABLE - MOTOR DE GESTIÓN DE INVENTARIO
 * Soporta modo dual: 
 * 1. Clientes Reales (Escritura en Google Sheets)
 * 2. Invitados (Escritura en LocalStorage/Zustand)
 */
export default function ProductTable({ initialData }: { initialData: any[] }) {
  const config = useConfig();
  const [showModal, setShowModal] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  // 🛡️ PROTOCOLO DE HIDRATACIÓN: Evita errores de servidor/cliente en Next.js
  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 🚩 LÓGICA DE PERSISTENCIA ANTI-DUPLICADOS (INVITADO)
  const handleGuestAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const id = fd.get("id") as string;
    
    // Antes de agregar, eliminamos cualquier versión previa del mismo ID para evitar duplicación
    config.removeProductoInvitado(id); 

    const nuevoProd = {
      id: id,
      titulo: fd.get("titulo") as string,
      precio: Number(fd.get("precio")),
      img: fd.get("img") as string,
      cat: fd.get("cat") as string,
      desc: fd.get("desc") as string,
      stock: Number(fd.get("stock")),
    };

    config.addProductoInvitado(nuevoProd);
    setShowModal(false);
    setEditingProd(null);
  };

  if (!mounted) return null;

  // Selección de fuente de datos basada en el contexto del usuario
  const displayData = config.isGuestMode 
    ? config.productosInvitado.map(p => ["", p.id, p.titulo, p.precio, p.desc, p.img, p.cat, p.stock]) 
    : initialData;

  const openModal = (prod = null) => {
    setEditingProd(prod);
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      
      {/* BOTÓN SUPERIOR DE ALTA */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => openModal()} 
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-black text-xs uppercase shadow-xl hover:bg-orange-700 transition-all active:scale-95"
        >
          <Plus size={16} /> Nuevo Artículo {config.isGuestMode && `(${config.productosInvitado.length}/10)`}
        </button>
      </div>

      {/* CONTENEDOR DE TABLA PRINCIPAL */}
      <div className="rounded-xl border border-black shadow-2xl overflow-hidden bg-white">
        <div className="max-h-125 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white font-black uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4 text-center">Imagen</th>
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
                  
                  {/* MINIATURA DE PRODUCTO (CABLEADA A UTILS) */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-lg bg-white border border-black/10 overflow-hidden flex items-center justify-center shadow-sm">
                        {row[5] ? (
                          <img 
                            src={getDriveDirectLink(row[5], "200")} 
                            className="object-cover w-full h-full" 
                            alt="thumb" 
                            onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=Error+URL")}
                          />
                        ) : <ImageIcon size={18} className="text-slate-300" />}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold uppercase tracking-tighter">{row[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-700">
                    ${Number(row[3]).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black border border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm">
                      {row[7] || 0} U.
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => openModal(row)} 
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit3 size={18} />
                      </button>
                      
                      {/* Botón borrar solo habilitado para simulación local */}
                      {config.isGuestMode && (
                        <button 
                          onClick={() => { if(confirm('¿Eliminar de la simulación?')) config.removeProductoInvitado(row[1]) }} 
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                          title="Eliminar"
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

      {/* --- MODAL DE EDICIÓN CON Z-INDEX CORREGIDO [999] --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-999 flex items-center justify-center p-4 md:p-10">
          <div className="bg-[#faf7ed] p-8 rounded-4xl w-full max-w-lg shadow-2xl relative border-2 border-black text-black max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute right-8 top-8 text-slate-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-black mb-8 uppercase flex items-center gap-3 italic tracking-tighter border-b border-black/5 pb-4">
              <Box size={22} className="text-orange-600" /> 
              {editingProd ? "Actualizar Datos" : "Registrar Artículo"}
            </h3>
            
            <form 
              onSubmit={config.isGuestMode ? handleGuestAction : undefined} 
              action={config.isGuestMode ? undefined : async (fd) => { await saveProduct(fd, !!editingProd); setShowModal(false); }} 
              className="space-y-5"
            >
              {/* Preservación de identidad de vendedor */}
              <input type="hidden" name="vendedorOriginal" value={editingProd ? editingProd[0] : ""} />
              <input type="hidden" name="id" value={editingProd ? editingProd[1] : `P-${Date.now().toString().slice(-6)}`} />
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Nombre Comercial</label>
                <input name="titulo" defaultValue={editingProd?.[2] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold focus:border-orange-600 outline-none transition-all" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Precio Unitario ($)</label>
                  <input name="precio" type="number" defaultValue={editingProd?.[3] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold focus:border-orange-600 outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Stock Disponible</label>
                  <input name="stock" type="number" defaultValue={editingProd?.[7] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold focus:border-orange-600 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Categoría del Sistema</label>
                <input name="cat" defaultValue={editingProd?.[6] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold focus:border-orange-600 outline-none transition-all" placeholder="Ej: Remeras, Miel, Accesorios" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1"><ImageIcon size={12}/> Vínculo de Imagen (Drive)</label>
                <input name="img" defaultValue={editingProd?.[5] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold text-[10px] focus:border-orange-600 outline-none transition-all" placeholder="https://drive.google.com/..." />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1"><AlignLeft size={12}/> Descripción Técnica</label>
                <textarea name="desc" defaultValue={editingProd?.[4] || ""} className="w-full bg-white border-2 border-black/10 p-4 rounded-xl font-bold text-sm h-24 resize-none focus:border-orange-600 outline-none transition-all" />
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase text-xs shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-orange-600 transition-all active:translate-y-1 active:shadow-none"
              >
                {editingProd ? "Confirmar Cambios" : "Cargar al Sistema"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}