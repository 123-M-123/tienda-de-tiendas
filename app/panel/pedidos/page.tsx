import { getPanelData } from "@/lib/panelData";
import { ClipboardList, ExternalLink, Calendar, Tag, DollarSign } from "lucide-react";

export default async function PedidosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const vendedor = searchParams.vendedor;
  const pedidos = await getPanelData("Pedidos", vendedor) || [];

  return (
    <div className="space-y-6">
    <div className="inline-flex items-center gap-3 border-b-4 border-[#E63946] pb-2">
        <ClipboardList size={32} className="text-[#E63946]" />
        <h2 className="text-2xl font-black uppercase">Validar Pedidos</h2>
      </div>
      
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F4EFE0] border-b-2 border-black">
            <tr>
              <th className="p-4 text-[10px] font-black uppercase flex items-center gap-2"><Calendar size={12}/> Fecha</th>
              <th className="p-4 text-[10px] font-black uppercase"><Tag size={12} className="inline mr-1"/> Producto</th>
              <th className="p-4 text-[10px] font-black uppercase"><DollarSign size={12} className="inline mr-1"/> Monto</th>
              <th className="p-4 text-[10px] font-black uppercase text-center">Comprobante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pedidos.length > 0 ? (
              pedidos.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-xs text-gray-600">{row[1]}</td>
                  <td className="p-4 text-sm font-bold uppercase">{row[2]}</td>
                  <td className="p-4 text-sm font-black">${Number(row[3]).toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <a 
                      href={row[5]} 
                      target="_blank" 
                      className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded text-[10px] font-black hover:bg-[#E63946] transition-colors"
                    >
                      VER IMAGEN <ExternalLink size={10} />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-20 text-center text-gray-400 italic">
                  No hay pedidos por transferencia registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}