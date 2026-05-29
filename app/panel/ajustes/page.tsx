import Customizer from "@/app/panel/dashboard/Customizer";
import { Settings } from "lucide-react";

export default function AjustesPage() {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-black pb-2">
        <Settings size={24} className="text-red-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">Configuración de Marca</h2>
      </div>
      
      <p className="text-xs font-bold text-slate-500 uppercase max-w-2xl leading-relaxed">
        Personalizá los colores y el logo de tu tienda. Estos cambios se reflejan en tiempo real en la landing page principal.
      </p>

      <Customizer />
    </div>
  );
}