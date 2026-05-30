import { auth } from "@/auth";
import { ADMIN_EMAIL } from "@/lib/clientes";
import Customizer from "@/app/panel/dashboard/Customizer";
import { Settings, ShieldAlert } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AjustesPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();
  if (!userEmail) redirect("/login");

  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();
  const vendedorContexto = searchParams.vendedor?.trim().toLowerCase() || userEmail;

  if (!isAdmin && vendedorContexto !== userEmail) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldAlert size={60} className="text-red-600 mb-4" />
        <h2 className="text-xl font-black uppercase">Acceso Denegado</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-4 border-red-600 pb-2">
        <Settings size={24} className="text-red-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">Identidad & Branding</h2>
      </div>
      
      <div className="bg-white/40 p-4 rounded-xl border border-black/5">
        <p className="text-[10px] font-black text-slate-500 uppercase">
          Configuración activa para: <span className="text-red-600">{vendedorContexto}</span>
        </p>
      </div>

      <Customizer targetVendedor={vendedorContexto} />
    </div>
  );
}