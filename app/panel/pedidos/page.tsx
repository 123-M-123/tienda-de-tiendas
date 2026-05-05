import { getPanelData } from "@/lib/panelData";
import { ClipboardList, ExternalLink } from "lucide-react";

export default async function PedidosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const pedidos = await getPanelData("Pedidos", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-slate-300 pb-2">
        <ClipboardList size={24} className="text-slate-500" />
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Validar Pedidos</h2>
      </div>
      
      <div className="bg-[#F1F5F9] rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="max-h-150 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-150">
            <thead className="sticky top-0 z-10 bg-[#F1F5F9] border-b border-slate-200">
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Fecha</th>
                <th className="px-6 py-4 font-bold">Producto</th>
                <th className="px-6 py-4 font-bold">Monto</th>
                <th className="px-6 py-4 font-bold text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pedidos.length > 0 ? (
                pedidos.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-white/50 transition-colors bg-white/30">
                    <td className="px-6 py-3 text-[10px] text-slate-500 font-medium whitespace-nowrap">{row[1]}</td>
                    {/* LIMITADOR DE TEXTO AQUÍ */}
                    <td className="px-6 py-3">
                      <p className="text-sm font-bold text-slate-700 leading-snug line-clamp-2 max-w-75">
                        {row[2]}
                      </p>
                    </td>
                    <td className="px-6 py-3 text-sm font-black text-slate-900 whitespace-nowrap">${Number(row[3]).toLocaleString()}</td>
                    <td className="px-6 py-3 text-center">
                      <a href={row[5]} target="_blank" className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black hover:bg-blue-600 transition-all uppercase">
                        RECIBO <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="p-20 text-center text-slate-400 italic text-sm">Sin pedidos registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}