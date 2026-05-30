import { getPanelData } from "@/lib/panelData";
import ProductTable from "./ProductTable";
import { Box } from "lucide-react";

export default async function ProductosPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const productos = await getPanelData("Carga de productos", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-4 border-orange-600 pb-2">
        <Box size={24} className="text-orange-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">Gestión de Inventario</h2>
      </div>
      <ProductTable initialData={productos} />
    </div>
  );
}