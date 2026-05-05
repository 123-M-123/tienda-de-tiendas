import { auth } from "@/auth";
import { getPanelData } from "@/lib/panelData";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes";
import { Wallet, ShoppingBag, Box, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const session = await auth();
  const isAdmin = session?.user?.email === ADMIN_EMAIL;
  const vendedorSeleccionado = searchParams.vendedor;

  const pedidos = await getPanelData("Pedidos", vendedorSeleccionado);
  const pagosMP = await getPanelData("webhoock MP", vendedorSeleccionado);
  const productos = await getPanelData("Carga de productos", vendedorSeleccionado);

  const totalMP = pagosMP.reduce((acc, cur) => acc + Number(cur[3] || 0), 0);

  return (
    <div className="space-y-6">
      {/* SELECTOR MAESTRO - Sutil y profesional */}
      {isAdmin && (
        <div className="bg-white/50 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar max-w-fit">
          <Link href="/panel/dashboard" className={`px-4 py-1.5 rounded-xl text-[11px] font-bold transition-all ${!vendedorSeleccionado ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>GLOBAL</Link>
          {Object.entries(CLIENTES).map(([email, info]) => (
            <Link 
              key={email} 
              href={`/panel/dashboard?vendedor=${email}`}
              className={`px-4 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${vendedorSeleccionado === email ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {info.nombre.toUpperCase()}
            </Link>
          ))}
        </div>
      )}

      {/* MÉTRICAS CHATAS CON ICONO TRASLÚCIDO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard 
          title="Ventas Mercado Pago" 
          value={`$${totalMP.toLocaleString()}`} 
          icon={<Wallet size={80} />}
          colorClass="text-blue-500/10" 
          accentColor="text-blue-600"
        />
        <MetricCard 
          title="Pedidos Transferencia" 
          value={pedidos.length} 
          icon={<ShoppingBag size={80} />}
          colorClass="text-emerald-500/10"
          accentColor="text-emerald-600"
        />
        <MetricCard 
          title="Artículos Activos" 
          value={productos.length} 
          icon={<Box size={80} />}
          colorClass="text-amber-500/10"
          accentColor="text-amber-600"
        />
      </div>

      {/* TABLA ESTILO CARD MODERNA */}
      <div className="bg-white rounded-2rem border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-6 px-8 flex justify-between items-center border-b border-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-800">Movimientos Recientes</h3>
            <p className="text-[11px] text-slate-400 uppercase tracking-tighter">Últimas transacciones registradas</p>
          </div>
          <Link href="/panel/webhook" className="group flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all">
            VER TODO <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.15em] bg-slate-50/50">
                <th className="px-8 py-3 font-bold">Fecha</th>
                <th className="px-8 py-3 font-bold">Producto</th>
                <th className="px-8 py-3 font-bold text-right">Monto</th>
              </tr>
            </thead>
           <tbody className="divide-y divide-slate-50">
  {pagosMP.length > 0 ? (
    pagosMP.slice(0, 5).map((p, i) => (
      <tr key={i} className="hover:bg-slate-50/30 transition-colors">
        <td className="px-8 py-3 text-[10px] text-slate-400 font-medium whitespace-nowrap">{p[1]}</td>
        <td className="px-8 py-3">
          <p className="text-sm font-semibold text-slate-700 line-clamp-1 max-w-50">
            {p[2]}
          </p>
        </td>
        <td className="px-8 py-3 text-sm font-black text-slate-900 text-right whitespace-nowrap">
          ${Number(p[3]).toLocaleString()}
        </td>
      </tr>
    ))
  ) : (
                <tr><td colSpan={3} className="p-16 text-center text-slate-300 text-xs italic">Sin movimientos recientes</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, colorClass, accentColor }: any) {
  return (
    <div className="bg-white px-6 py-5 rounded-[1.8rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
      {/* Icono gigante al fondo */}
      <div className={`absolute -right-2 -bottom-4 ${colorClass} group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <p className={`text-2xl font-black ${accentColor} tracking-tight`}>{value}</p>
      </div>
    </div>
  );
}