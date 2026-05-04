import { getPanelData } from "@/lib/panelData";
import { ClipboardList, ExternalLink, Calendar, Tag } from "lucide-react";

export default async function PedidosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const pedidos = await getPanelData("Pedidos", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Validar Pedidos</h2>
      
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-4 font-bold">Fecha</th>
              <th className="px-8 py-4 font-bold">Producto</th>
              <th className="px-8 py-4 font-bold">Monto</th>
              <th className="px-8 py-4 font-bold text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pedidos.length > 0 ? (
              pedidos.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-5 text-xs text-slate-500">{row[1]}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-slate-700">{row[2]}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">${Number(row[3]).toLocaleString()}</td>
                  <td className="px-8 py-5 text-center">
                    <a href={row[5]} target="_blank" className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-blue-600 transition-all uppercase">
                      Ver Recibo <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-20 text-center text-slate-300 text-sm italic">No hay pedidos pendientes.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}