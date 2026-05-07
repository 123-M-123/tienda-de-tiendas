import { auth } from "@/auth";
import { getPanelData } from "@/lib/panelData";
import { getAnalyticsData } from "@/lib/analyticsData";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes";
import { Wallet, ShoppingBag, Box, BarChart3, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const session = await auth();
  const vendedorSeleccionado = searchParams.vendedor;

  const pedidos = await getPanelData("Pedidos", vendedorSeleccionado) || [];
  const pagosMP = await getPanelData("webhoock MP", vendedorSeleccionado) || [];
  const productos = await getPanelData("Carga de productos", vendedorSeleccionado) || [];
  const analytics = await getAnalyticsData(vendedorSeleccionado);
  
  const totalVisitas = analytics.rows?.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  const totalMP = pagosMP.reduce((acc, cur) => acc + Number(cur[3] || 0), 0);

  return (
    <div className="space-y-8">
      {/* TÍTULO SECCIÓN */}
      <div className="inline-flex items-center gap-3 border-b-2 border-slate-900 pb-2">
        <BarChart3 size={24} className="text-slate-500" />
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Resumen de Pantalla</h2>
      </div>

      {/* GRILLA DE MÉTRICAS TRANSPARENTES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Visitas (30 días)" value={totalVisitas.toLocaleString()} icon={<BarChart3 size={50} />} colorClass="text-slate-500/10" accentColor="text-slate-600" />
        <MetricCard title="Pedidos Transf." value={pedidos.length} icon={<ShoppingBag size={50} />} colorClass="text-emerald-500/10" accentColor="text-emerald-600" />
        <MetricCard title="Ventas Online" value={`$${totalMP.toLocaleString()}`} icon={<Wallet size={50} />} colorClass="text-blue-500/10" accentColor="text-blue-600" />
        <MetricCard title="Artículos" value={productos.length} icon={<Box size={50} />} colorClass="text-orange-500/10" accentColor="text-orange-600" />
      </div>

      {/* TABLA MOVIMIENTOS ESTILO COMPARATIVA */}
      <div className="rounded-xl border border-slate-300 shadow-sm overflow-hidden mt-4">
        <div className="bg-slate-900 p-4 px-6 flex justify-between items-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">Movimientos Recientes</h3>
          <Link href="/panel/webhook" className="text-[10px] font-black text-blue-400 hover:text-white transition-all uppercase">VER TODO</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-slate-300">
              {pagosMP.slice(0, 5).map((p, i) => (
                <tr key={i} className="hover:bg-white/20 transition-colors">
                  <td className="px-8 py-4 text-[10px] text-slate-600 font-medium">{p[1]}</td>
                  <td className="px-8 py-4 text-sm font-bold text-slate-800">{p[2]}</td>
                  <td className="px-8 py-4 text-sm font-black text-slate-900 text-right">${Number(p[3]).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, colorClass, accentColor }: any) {
  return (
    <div className="px-5 py-4 rounded-xl border border-slate-300 relative overflow-hidden group">
      <div className={`absolute -right-2 -bottom-2 ${colorClass}`}>{icon}</div>
      <div className="relative z-10">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{title}</p>
        <p className={`text-xl font-black ${accentColor} tracking-tight`}>{value}</p>
      </div>
    </div>
  );
}