import { getPanelData } from "@/lib/panelData";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default async function WebhookPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const ventas = await getPanelData("webhoock MP", searchParams.vendedor) || [];
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-blue-600 pb-2">
        <CreditCard size={24} className="text-slate-500" />
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Pagos Online</h2>
      </div>
      
      <div className="rounded-xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="max-h-125 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white text-[10px] uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Detalle</th>
                <th className="px-6 py-4">Importe</th>
                <th className="px-6 py-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {ventas.map((v: any, i: number) => (
                <tr key={i} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4 text-[10px] text-slate-600 font-medium">{v[1]}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 line-clamp-2 max-w-62.5">{v[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">${Number(v[3]).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50/50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black border border-emerald-200 uppercase">
                      <CheckCircle2 size={10} /> {v[4]}
                    </span>
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