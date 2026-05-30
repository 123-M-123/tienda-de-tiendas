import { getPanelData } from "@/lib/panelData";
import BannerTable from "./BannerTable";
import { Image } from "lucide-react";

export default async function BannersPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const banners = await getPanelData("Baners Publicidad", searchParams.vendedor) || [];

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-4 border-purple-600 pb-2">
        <Image size={24} className="text-purple-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">Gestión de Publicidad</h2>
      </div>
      <BannerTable initialData={banners} />
    </div>
  );
}