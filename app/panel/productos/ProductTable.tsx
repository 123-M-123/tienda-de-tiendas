"use client"
import { useState } from "react";
import { saveProduct } from "@/lib/productActions";

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
        className="mb-4 bg-[#2D6BE4] text-white px-4 py-2 rounded-lg font-bold text-sm"
      >
        + Nuevo Producto
      </button>

      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-[#F9F9F8] border-b border-[#E2E0DC]">
            <th className="p-3">ID</th>
            <th className="p-3">Título</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((row, i) => (
            <tr key={i} className="border-b border-[#F0EFEA] hover:bg-[#FDFDFB]">
              <td className="p-3 font-mono text-xs">{row[1]}</td>
              <td className="p-3 font-bold">{row[2]}</td>
              <td className="p-3">${row[3]}</td>
              <td className="p-3">
                <button onClick={() => openModal(row)} className="text-[#2D6BE4] hover:underline">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL CON INLINE STYLES PROPIOS */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '16px',
            width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <h3 className="text-xl font-bold mb-4">
              {editingProd ? "Editar Producto" : "Nuevo Producto"}
            </h3>
            
            <form action={async (fd) => {
              await saveProduct(fd, !!editingProd);
              setShowModal(false);
            }} className="flex flex-col gap-4">
              
              {editingProd && <input type="hidden" name="id" value={editingProd[1]} />}

              <div>
                <label className="block text-xs font-bold text-[#6B6862] mb-1">TÍTULO</label>
                <input name="titulo" defaultValue={editingProd?.[2] || ""} className="w-full border border-[#E2E0DC] p-2 rounded-lg" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#6B6862] mb-1">PRECIO</label>
                  <input name="precio" type="number" defaultValue={editingProd?.[3] || ""} className="w-full border border-[#E2E0DC] p-2 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6B6862] mb-1">CATEGORÍA</label>
                  <input name="cat" defaultValue={editingProd?.[6] || ""} className="w-full border border-[#E2E0DC] p-2 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B6862] mb-1">URL IMAGEN (DRIVE)</label>
                <input name="img" defaultValue={editingProd?.[5] || ""} className="w-full border border-[#E2E0DC] p-2 rounded-lg" />
              </div>

              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 bg-[#1A7F5A] text-white p-3 rounded-xl font-bold">Guardar Producto</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-[#F7F6F3] text-[#6B6862] p-3 rounded-xl font-bold">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}