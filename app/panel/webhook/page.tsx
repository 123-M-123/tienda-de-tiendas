import { getPanelData } from "@/lib/panelData";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default async function WebhookPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const ventas = await getPanelData("webhoock MP", searchParams.vendedor) || [];
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-blue-700 pb-2">
        <CreditCard size={24} className="text-slate-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black">Pagos Online</h2>
      </div>
      
      <div className="rounded-xl border border-black shadow-2xl overflow-hidden">
        <div className="max-h-125 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Detalle</th>
                <th className="px-6 py-4">Importe</th>
                <th className="px-6 py-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
              {ventas.map((v: any, i: number) => (
                <tr key={i} className="hover:bg-transparent transition-colors">
                  <td className="px-6 py-4 text-[10px] text-slate-600 font-bold border-r border-black/5">{v[1]}</td>
                  <td className="px-6 py-4 text-sm font-bold text-black border-r border-black/5">{v[2]}</td>
                  <td className="px-6 py-4 text-sm font-black text-black">${Number(v[3]).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[9px] font-black border border-emerald-400 uppercase">
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