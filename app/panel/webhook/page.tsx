import { getPanelData } from "@/lib/panelData";
import { CreditCard, Calendar, Package, DollarSign } from "lucide-react";

export default async function WebhookPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const vendedor = searchParams.vendedor;
  const ventas = await getPanelData("webhoock MP", vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-4 border-[#E63946] pb-2">
        <CreditCard size={32} className="text-[#E63946]" />
        <h2 className="text-2xl font-black uppercase">Pagos Online (MP)</h2>
      </div>
      
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F4EFE0] border-b-2 border-black">
              <th className="p-4 text-[10px] font-black uppercase flex items-center gap-2"><Calendar size={12}/> Fecha</th>
              <th className="p-4 text-[10px] font-black uppercase"><Package size={12} className="inline mr-1"/> Detalle</th>
              <th className="p-4 text-[10px] font-black uppercase"><DollarSign size={12} className="inline mr-1"/> Monto</th>
              <th className="p-4 text-[10px] font-black uppercase text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ventas.length > 0 ? (
              ventas.map((v: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-xs text-gray-600">{v[1]}</td>
                  <td className="p-4 text-sm font-bold uppercase">{v[2]}</td>
                  <td className="p-4 text-sm font-black">${Number(v[3]).toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className="bg-[#EDF7F3] text-[#1A7F5A] px-3 py-1 rounded-full text-[10px] font-black border border-[#1A7F5A] uppercase">
                      {v[4]}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-20 text-center text-gray-400 italic">
                  No se registran ventas con tarjeta para este criterio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}