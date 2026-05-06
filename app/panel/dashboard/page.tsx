import { auth } from "@/auth";
import { getPanelData } from "@/lib/panelData";
import { getAnalyticsData } from "@/lib/analyticsData";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes";
import { Wallet, ShoppingBag, Box, BarChart3, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const session = await auth();
  const vendedorSeleccionado = searchParams.vendedor;

  // Traemos todos los datos necesarios
  const pedidos = await getPanelData("Pedidos", vendedorSeleccionado) || [];
  const pagosMP = await getPanelData("webhoock MP", vendedorSeleccionado) || [];
  const productos = await getPanelData("Carga de productos", vendedorSeleccionado) || [];
  const analytics = await getAnalyticsData(vendedorSeleccionado);
  
  const totalVisitas = analytics.rows?.reduce((acc: number, row: any) => acc + Number(row.metricValues[1].value), 0) || 0;
  const totalMP = pagosMP.reduce((acc, cur) => acc + Number(cur[3] || 0), 0);

  return (
    <div className="space-y-6">
      {/* GRILLA DE MÉTRICAS REORDENADA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. ANALYTICS */}
        <MetricCard 
          title="Visitas (30 días)" 
          value={totalVisitas.toLocaleString()} 
          icon={<BarChart3 size={60} />}
          colorClass="text-slate-500/10" 
          accentColor="text-slate-600"
        />

        {/* 2. PEDIDOS (OFF-LINE) */}
        <MetricCard 
          title="Pedidos Transf." 
          value={pedidos.length} 
          icon={<ShoppingBag size={60} />}
          colorClass="text-emerald-500/10"
          accentColor="text-emerald-600"
        />

        {/* 3. VENTAS MP (ON-LINE) */}
        <MetricCard 
          title="Ventas Online" 
          value={`$${totalMP.toLocaleString()}`} 
          icon={<Wallet size={60} />}
          colorClass="text-blue-500/10" 
          accentColor="text-blue-600"
        />

        {/* 4. PRODUCTOS (GESTIÓN) */}
        <MetricCard 
          title="Artículos" 
          value={productos.length} 
          icon={<Box size={60} />}
          colorClass="text-orange-500/10"
          accentColor="text-orange-600"
        />
      </div>

      {/* TABLA DE MOVIMIENTOS (Sin cambios en lógica, solo visual) */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mt-4">
        <div className="p-6 px-8 flex justify-between items-center border-b border-slate-50">
          <h3 className="text-base font-bold text-slate-800 uppercase tracking-tighter">Movimientos Recientes</h3>
          <Link href="/panel/webhook" className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
            VER TODO <ChevronRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-slate-50">
              {pagosMP.slice(0, 5).map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-4 text-xs text-slate-400">{p[1]}</td>
                  <td className="px-8 py-4 text-sm font-semibold text-slate-700">{p[2]}</td>
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
    <div className="bg-white px-5 py-4 rounded-[1.8rem] border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute -right-2 -bottom-2 ${colorClass}`}>{icon}</div>
      <div className="relative z-10">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{title}</p>
        <p className={`text-xl font-black ${accentColor} tracking-tight`}>{value}</p>
      </div>
    </div>
  );
}