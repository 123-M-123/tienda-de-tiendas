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

  // 🛡️ REGLA DE ORO DE SEGURIDAD:
  // Si no sos Admin y el vendedor de la URL no sos vos mismo -> BLOQUEO TOTAL.
  if (!isAdmin && vendedorContexto !== userEmail) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldAlert size={60} className="text-red-600 mb-4" />
        <h2 className="text-xl font-black uppercase">Acceso Denegado</h2>
        <p className="text-sm text-slate-500 font-bold uppercase mt-2">No tenés permisos para editar esta tienda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-2 border-black pb-2">
        <Settings size={24} className="text-red-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">Configuración de Marca</h2>
      </div>
      
      <div className="bg-white/40 p-4 rounded-xl border border-black/5">
        <p className="text-[10px] font-black text-slate-500 uppercase leading-relaxed">
          Editando identidad de: <span className="text-red-600">{vendedorContexto}</span>
        </p>
      </div>

      <Customizer targetVendedor={vendedorContexto} />
    </div>
  );
}