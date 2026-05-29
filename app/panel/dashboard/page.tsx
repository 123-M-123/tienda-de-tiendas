import { auth } from "@/auth";
import { getPanelData } from "@/lib/panelData";
import { getAnalyticsData } from "@/lib/analyticsData";
import { BarChart3, ShoppingBag, Wallet, Box } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const session = await auth();
  const vendedorSeleccionado = searchParams.vendedor;

  // Traemos los datos
  const pedidos = await getPanelData("Pedidos", vendedorSeleccionado) || [];
  const pagosMP = await getPanelData("webhoock MP", vendedorSeleccionado) || [];
  const productos = await getPanelData("Carga de productos", vendedorSeleccionado) || [];
  const analytics = await getAnalyticsData(vendedorSeleccionado);
  
  const totalVisitas = analytics.rows?.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  const totalMP = pagosMP.reduce((acc, cur) => acc + Number(cur[3] || 0), 0);

  return (
    <div className="space-y-8">
      {/* GRILLA DE MÉTRICAS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Visitas" value={totalVisitas.toLocaleString()} icon={<BarChart3 size={70} />} colorClass="text-slate-900/20" accentColor="text-slate-800" />
        <MetricCard title="Pedidos" value={pedidos.length} icon={<ShoppingBag size={70} />} colorClass="text-emerald-900/20" accentColor="text-emerald-700" />
        <MetricCard title="Ventas" value={`$${totalMP.toLocaleString()}`} icon={<Wallet size={70} />} colorClass="text-blue-900/20" accentColor="text-blue-700" />
        <MetricCard title="Artículos" value={productos.length} icon={<Box size={70} />} colorClass="text-orange-900/20" accentColor="text-orange-700" />
      </section>

      {/* TABLA DE MOVIMIENTOS */}
      <section className="rounded-xl border border-black shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-4 px-6 flex justify-between items-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">Movimientos Recientes</h3>
          <Link href="/panel/webhook" className="text-[10px] font-black text-blue-400 hover:text-white uppercase">VER TODO</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-black/10 bg-[#faf7ed]">
              {pagosMP.slice(0, 5).map((p, i) => (
                <tr key={i} className="hover:bg-black/5 transition-colors">
                  <td className="px-8 py-4 text-[10px] text-slate-600 font-bold border-r border-black/5">{p[1]}</td>
                  <td className="px-8 py-4 text-sm font-bold text-black border-r border-black/5">{p[2]}</td>
                  <td className="px-8 py-4 text-sm font-black text-black text-right">${Number(p[3]).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ title, value, icon, colorClass, accentColor }: any) {
  return (
    <div className="bg-[#faf7ed] px-5 py-4 rounded-xl border border-black shadow-lg relative overflow-hidden group">
      <div className={`absolute -right-2 -bottom-2 ${colorClass} group-hover:scale-110 transition-transform`}>{icon}</div>
      <div className="relative z-10 text-black">
        <p className="text-[9px] font-black opacity-50 uppercase tracking-widest mb-0.5">{title}</p>
        <p className={`text-xl font-black ${accentColor} tracking-tight`}>{value}</p>
      </div>
    </div>
  );
}