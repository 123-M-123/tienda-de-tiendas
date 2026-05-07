import { getPanelData } from "@/lib/panelData";
import { ClipboardList, ExternalLink } from "lucide-react";

export default async function PedidosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const pedidos = await getPanelData("Pedidos", searchParams.vendedor) || [];
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-emerald-700 pb-2">
        <ClipboardList size={24} className="text-slate-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black">Validar Pedidos</h2>
      </div>
      
      <div className="rounded-xl border border-black shadow-2xl overflow-hidden">
        <div className="max-h-125 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Monto</th>
                <th className="px-6 py-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
              {pedidos.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-transparent transition-colors">
                  <td className="px-6 py-4 text-[10px] text-slate-600 font-bold border-r border-black/5">{row[1]}</td>
                  <td className="px-6 py-4 text-sm font-bold text-black border-r border-black/5">{row[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-black">${Number(row[3]).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <a href={row[5]} target="_blank" className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-[9px] font-black hover:bg-emerald-700 transition-all uppercase shadow-md">
                      RECIBO <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}