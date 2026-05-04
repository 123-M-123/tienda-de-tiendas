import { getPanelData } from "@/lib/panelData";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default async function WebhookPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const ventas = await getPanelData("webhoock MP", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
          <CreditCard className="text-white" size={20} />
        </div>
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Pagos Online (MP)</h2>
      </div>
      
      {/* CONTENEDOR MAESTRO (EL "ENVOLTORIO") */}
      <div className="bg-[#F1F5F9] rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="max-h-150 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="sticky top-0 z-10 bg-[#F1F5F9] border-b border-slate-200">
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.15em]">
                <th className="px-8 py-5 font-bold text-slate-500">Fecha</th>
                <th className="px-8 py-5 font-bold text-slate-500">Detalle del Pago</th>
                <th className="px-8 py-5 font-bold text-slate-500 text-right">Monto</th>
                <th className="px-8 py-5 font-bold text-slate-500 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ventas.length > 0 ? (
                ventas.map((v: any, i: number) => (
                  <tr key={i} className="hover:bg-white/50 transition-colors bg-white/30">
                    <td className="px-8 py-5 text-xs text-slate-400 font-medium">{v[1]}</td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-700">{v[2]}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900 text-right">${Number(v[3]).toLocaleString()}</td>
                    <td className="px-8 py-5 text-center">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black border border-emerald-100 uppercase tracking-wider">
                        <CheckCircle2 size={10} /> {v[4]}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-slate-400 text-sm italic bg-white/30">
                    No se registran ventas con tarjeta aún.
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