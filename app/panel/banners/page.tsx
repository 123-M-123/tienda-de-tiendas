import { getPanelData } from "@/lib/panelData";
import BannerTable from "./BannerTable";

export default async function BannersPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  // Corregido a "Baners Publicidad" (una sola 'n')
  const banners = await getPanelData("Baners Publicidad", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Gestión de Publicidad</h2>
      <BannerTable initialData={banners} />
    </div>
  );
}