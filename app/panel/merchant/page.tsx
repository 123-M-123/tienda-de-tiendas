import { getPanelData } from "@/lib/panelData";
import { ShoppingBag, CheckCircle2 } from "lucide-react";

export default async function MerchantPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const productos = await getPanelData("Carga de productos", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-blue-900 pb-2">
        <ShoppingBag size={24} className="text-blue-900" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">Google Merchant Center</h2>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
        <h3 className="text-sm font-black text-blue-900 uppercase">Estado del Feed</h3>
        <p className="text-xs text-blue-800 font-bold mt-1">Sincronización activa con Google Shopping</p>
      </div>

      <div className="rounded-xl border border-black shadow-2xl overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900 text-white font-black uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Precio</th>
              <th className="px-6 py-4 text-center">Estado Google</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {productos.map((p, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-xs font-bold text-black">{p[2]}</td>
                <td className="px-6 py-4 text-xs font-black text-black">${p[3]}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase">
                    <CheckCircle2 size={12} /> Indexado
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}