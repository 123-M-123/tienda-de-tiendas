import { getPanelData } from "@/lib/panelData";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default async function WebhookPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const ventas = await getPanelData("webhoock MP", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Historial de Pagos Online</h2>
      
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-4 font-bold">Fecha</th>
              <th className="px-8 py-4 font-bold">Detalle del Cobro</th>
              <th className="px-8 py-4 font-bold">Importe</th>
              <th className="px-8 py-4 font-bold text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ventas.length > 0 ? (
              ventas.map((v: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-5 text-xs text-slate-500">{v[1]}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-slate-700">{v[2]}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">${Number(v[3]).toLocaleString()}</td>
                  <td className="px-8 py-5 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100 uppercase">
                      <CheckCircle2 size={10} /> {v[4]}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-20 text-center text-slate-300 text-sm italic">No se registran ventas online.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}