import { getPanelData } from "@/lib/panelData";

export default async function DashboardPage() {
  const pedidos = await getPanelData("Pedidos") || [];
  const pagosMP = await getPanelData("webhoock MP") || [];
  const productos = await getPanelData("Carga de productos") || [];

  const totalMP = pagosMP.reduce((acc: number, cur: any[]) => acc + Number(cur[3] || 0), 0);

  return (
    <div className="space-y-8">
      {/* Cards con estilo de etiqueta de precio o pizarra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ventas del Mes" value={`$${totalMP.toLocaleString()}`} sub="Mercado Pago" border="#E63946" />
        <StatCard title="Pedidos" value={pedidos.length} sub="Por Transferencia" border="#1A1A1A" />
        <StatCard title="Artículos" value={productos.length} sub="En Vidriera" border="#1A1A1A" />
        <StatCard title="Tráfico" value="GA4" sub="Visitas hoy" border="#E63946" />
      </div>

      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-none overflow-hidden">
        <div className="bg-[#1A1A1A] text-white p-4 font-bold uppercase tracking-widest text-sm">
          Últimos movimientos de caja
        </div>
        <table className="w-full text-left">
          <thead className="border-b-2 border-[#1A1A1A] bg-[#F4EFE0]">
            <tr>
              <th className="p-4 font-bold uppercase text-xs">Fecha</th>
              <th className="p-4 font-bold uppercase text-xs">Concepto</th>
              <th className="p-4 font-bold uppercase text-xs">Importe</th>
              <th className="p-4 font-bold uppercase text-xs">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D1C7B7]">
            {pagosMP.slice(0, 5).map((p, i) => (
              <tr key={i} className="hover:bg-[#FDF6E3]">
                <td className="p-4 text-sm">{p[1]}</td>
                <td className="p-4 text-sm font-medium">{p[2]}</td>
                <td className="p-4 text-sm font-black">${p[3]}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border ${p[4] === 'approved' ? 'bg-[#EDF7F3] border-[#1A7F5A] text-[#1A7F5A]' : 'bg-[#FFF8E1] border-[#7A5C00] text-[#7A5C00]'}`}>
                    {p[4].toUpperCase()}
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

function StatCard({ title, value, sub, border }: { title: string, value: any, sub: string, border: string }) {
  return (
    <div 
      style={{ borderTop: `4px solid ${border}` }}
      className="bg-white p-6 shadow-sm border border-[#D1C7B7] hover:shadow-md transition-shadow"
    >
      <p className="text-[10px] font-black uppercase text-[#6B6862] mb-1">{title}</p>
      <h3 className="text-3xl font-black">{value}</h3>
      <p className="text-xs text-[#9A9690] mt-2 italic">{sub}</p>
    </div>
  );
}