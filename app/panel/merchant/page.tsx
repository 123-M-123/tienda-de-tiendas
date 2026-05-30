import { getMerchantProducts } from "@/lib/merchantData";
import { ShoppingBag, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default async function MerchantPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const googleProducts = await getMerchantProducts(searchParams.vendedor);

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-4 border-blue-900 pb-2">
        <ShoppingBag size={24} className="text-blue-900" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">Google Merchant Center</h2>
      </div>

      <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <h3 className="text-sm font-black text-blue-900 uppercase">Sincronización Content API</h3>
          <p className="text-[10px] text-blue-800 font-bold uppercase mt-1 italic opacity-70">Estado real en Google Shopping</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-blue-900 leading-none">{googleProducts.length}</p>
          <p className="text-[9px] font-black text-blue-500 uppercase mt-1">Productos</p>
        </div>
      </div>

      <div className="rounded-xl border border-black shadow-2xl overflow-hidden bg-white">
        <table className="w-full text-left border-collapse min-w-175">
          <thead className="bg-slate-900 text-white font-black uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4">Producto (Data Oficial)</th>
              <th className="px-6 py-4 text-center">Estado Google</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
            {googleProducts.length === 0 ? (
              <tr><td colSpan={2} className="p-20 text-center text-slate-400 font-bold uppercase text-xs">Esperando respuesta de Merchant API...</td></tr>
            ) : googleProducts.map((p: any, i: number) => (
              <tr key={i} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 border-r border-black/5">
                  <p className="text-xs font-bold text-black uppercase">{p.title || p.id}</p>
                  <p className="text-[8px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">SKU: {p.id}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  {p.status === 'approved' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-black border border-emerald-400 uppercase">
                      <CheckCircle2 size={10} /> Online
                    </span>
                  )}
                  {p.status === 'disapproved' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-[9px] font-black border border-red-400 uppercase">
                      <AlertCircle size={10} /> Rechazado
                    </span>
                  )}
                  {p.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[9px] font-black border border-amber-400 uppercase">
                      <Clock size={10} /> Revisando
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}