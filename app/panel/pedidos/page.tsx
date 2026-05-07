import { getPanelData } from "@/lib/panelData";
import { ClipboardList, ExternalLink } from "lucide-react";

export default async function PedidosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const pedidos = await getPanelData("Pedidos", searchParams.vendedor) || [];
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-emerald-600 pb-2">
        <ClipboardList size={24} className="text-slate-500" />
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Validar Pedidos</h2>
      </div>
      
      {/* Contenedor Transparente */}
      <div className="rounded-xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="max-h-125 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white">
              <tr className="text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Monto</th>
                <th className="px-6 py-4 text-center">Acción</th>
              </tr>
            </thead>
            {/* Cuerpo sin fondo para que mande el beige de la página */}
            <tbody className="divide-y divide-slate-300">
              {pedidos.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4 text-[10px] text-slate-600 font-medium">{row[1]}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 line-clamp-2 max-w-62.5">{row[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">${Number(row[3]).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <a href={row[5]} target="_blank" className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-[9px] font-black hover:bg-emerald-600 transition-all uppercase">
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