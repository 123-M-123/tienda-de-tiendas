import { getPanelData } from "@/lib/panelData";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default async function WebhookPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const ventas = await getPanelData("webhoock MP", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-slate-300 pb-2">
        <CreditCard size={24} className="text-slate-500" />
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Pagos Online</h2>
      </div>
      
      <div className="bg-[#F1F5F9] rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="max-h-150 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-150">
            <thead className="sticky top-0 z-10 bg-[#F1F5F9] border-b border-slate-200">
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Fecha</th>
                <th className="px-6 py-4 font-bold">Detalle</th>
                <th className="px-6 py-4 font-bold">Importe</th>
                <th className="px-6 py-4 font-bold text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ventas.length > 0 ? (
                ventas.map((v: any, i: number) => (
                  <tr key={i} className="hover:bg-white/50 transition-colors bg-white/30">
                    <td className="px-6 py-3 text-[10px] text-slate-500 font-medium whitespace-nowrap">{v[1]}</td>
                    <td className="px-6 py-3">
                      <p className="text-sm font-bold text-slate-700 leading-snug line-clamp-2 max-w-75">
                        {v[2]}
                      </p>
                    </td>
                    <td className="px-6 py-3 text-sm font-black text-slate-900 whitespace-nowrap">${Number(v[3]).toLocaleString()}</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black border border-emerald-100 uppercase">
                        <CheckCircle2 size={10} /> {v[4]}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="p-20 text-center text-slate-400 italic text-sm">Sin ventas online.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}