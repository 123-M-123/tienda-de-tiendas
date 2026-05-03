// app/panel/dashboard/page.tsx
import { auth } from "@/auth";
import { getPanelData } from "@/lib/panelData";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes"; // Cambiado a CLIENTES
import Link from "next/link";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { vendedor?: string };
}) {
  const session = await auth();
  const isAdmin = session?.user?.email === ADMIN_EMAIL;
  const vendedorSeleccionado = searchParams.vendedor;

  const pedidos = await getPanelData("Pedidos", vendedorSeleccionado);
  const pagosMP = await getPanelData("webhoock MP", vendedorSeleccionado);
  const productos = await getPanelData("Carga de productos", vendedorSeleccionado);

  const totalMP = pagosMP.reduce((acc, cur) => acc + Number(cur[3] || 0), 0);

  return (
    <div className="space-y-6">
      {/* SELECTOR MAESTRO (Solo para Admin) */}
      {isAdmin && (
        <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
          <span className="font-black text-xs uppercase">👁️ Vista de Administrador:</span>
          <div className="flex flex-wrap gap-2">
            <Link href="/panel/dashboard" className={`px-3 py-1 border text-[10px] font-bold ${!vendedorSeleccionado ? 'bg-black text-white' : 'bg-white'}`}>TODOS</Link>
            {Object.entries(CLIENTES).map(([email, info]) => (
              <Link 
                key={email} 
                href={`/panel/dashboard?vendedor=${email}`}
                className={`px-3 py-1 border text-[10px] font-bold ${vendedorSeleccionado === email ? 'bg-[#E63946] text-white' : 'bg-white'}`}
              >
                {info.nombre.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MÉTRICAS (Cards con tu estilo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Cobrado Mercado Pago</p>
          <p className="text-3xl font-black">${totalMP.toLocaleString()}</p>
        </div>
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Pedidos Transferencia</p>
          <p className="text-3xl font-black">{pedidos.length}</p>
        </div>
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Artículos en Venta</p>
          <p className="text-3xl font-black">{productos.length}</p>
        </div>
      </div>

      {/* TABLA DE MOVIMIENTOS */}
      <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="bg-black text-white p-3 text-xs font-bold uppercase tracking-widest">
          Últimos Movimientos {vendedorSeleccionado ? ` - ${CLIENTES[vendedorSeleccionado]?.nombre}` : "(Global)"}
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F4EFE0] border-b-2 border-black">
              <th className="p-3 text-[10px] font-black uppercase">Fecha</th>
              <th className="p-3 text-[10px] font-black uppercase">Detalle</th>
              <th className="p-3 text-[10px] font-black uppercase">Importe</th>
            </tr>
          </thead>
          <tbody>
            {pagosMP.length > 0 ? (
              pagosMP.slice(0, 10).map((p, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 text-xs">{p[1]}</td>
                  <td className="p-3 text-xs font-bold">{p[2]}</td>
                  <td className="p-3 text-xs font-black">${Number(p[3]).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={3} className="p-10 text-center text-gray-400 italic">No hay movimientos registrados</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}