import { getPanelData } from "@/lib/panelData";
import ProductTable from "./ProductTable"; // Componente de cliente

export default async function ProductosPage() {
  const productos = await getPanelData("Carga de productos") || [];

  return (
    <div className="bg-white rounded-xl border border-[#E2E0DC] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Mis Productos</h2>
        {/* Este botón activará el modal en el componente de cliente */}
      </div>

      <ProductTable initialData={productos} />
    </div>
  );
}