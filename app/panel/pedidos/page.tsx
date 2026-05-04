import { getPanelData } from "@/lib/panelData";
import { ClipboardList, ExternalLink } from "lucide-react";

export default async function PedidosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const pedidos = await getPanelData("Pedidos", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
          <ClipboardList className="text-white" size={20} />
        </div>
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Validar Pedidos</h2>
      </div>
      
      {/* CONTENEDOR MAESTRO (EL "ENVOLTORIO") */}
      <div className="bg-[#F1F5F9] rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="max-h-150 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-[#F1F5F9] border-b border-slate-200">
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.15em]">
                <th className="px-8 py-5 font-bold text-slate-500">Fecha</th>
                <th className="px-8 py-5 font-bold text-slate-500">Producto</th>
                <th className="px-8 py-5 font-bold text-slate-500">Monto</th>
                <th className="px-8 py-5 font-bold text-slate-500 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pedidos.length > 0 ? (
                pedidos.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-white/50 transition-colors bg-white/30">
                    <td className="px-8 py-5 text-xs text-slate-400 font-medium">{row[1]}</td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-700">{row[2]}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">${Number(row[3]).toLocaleString()}</td>
                    <td className="px-8 py-5 text-center">
                      <a 
                        href={row[5]} 
                        target="_blank" 
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black hover:bg-blue-600 transition-all uppercase tracking-widest shadow-sm"
                      >
                        VER COMPROBANTE <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-slate-400 text-sm italic bg-white/30">
                    No se registran pedidos por transferencia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}