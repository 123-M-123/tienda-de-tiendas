import { getPanelData } from "@/lib/panelData";
import ProductTable from "./ProductTable";

export default async function ProductosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  // Ahora la lista de productos también responde al selector de Admin
  const productos = await getPanelData("Carga de productos", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Gestión de Inventario</h2>
      <ProductTable initialData={productos} />
    </div>
  );
}