import { auth } from "@/auth";
import { ADMIN_EMAIL, esUsuarioAutorizado } from "@/lib/clientes";
import Customizer from "@/app/panel/dashboard/Customizer";
import { Settings, ShieldAlert, Ghost } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AjustesPage({ searchParams }: { searchParams: { vendedor?: string } }) {
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();
  if (!userEmail) redirect("/login");

  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();
  const isCliente = esUsuarioAutorizado(userEmail);
  const vendedorContexto = searchParams.vendedor?.trim().toLowerCase() || userEmail;

  // 🛡️ SEGURIDAD 1: Si un usuario común intenta entrar a la config del Admin -> BLOQUEO
  if (!isAdmin && vendedorContexto === ADMIN_EMAIL.trim().toLowerCase()) {
    redirect("/panel/ajustes"); // Lo pateamos a su propia config
  }

  // 🛡️ SEGURIDAD 2: Si no es Admin y intenta editar a OTRO cliente -> BLOQUEO
  if (!isAdmin && vendedorContexto !== userEmail) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldAlert size={60} className="text-red-600 mb-4" />
        <h2 className="text-xl font-black uppercase italic">Acceso Restringido</h2>
        <p className="text-xs font-bold text-slate-500 uppercase mt-2">Solo podés editar tu propia marca.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 border-b-4 border-red-600 pb-2">
        <Settings size={24} className="text-red-600" />
        <h2 className="text-xl font-black uppercase tracking-tight text-black italic">
          {isCliente ? "Identidad de Marca" : "Simulador de Diseño"}
        </h2>
      </div>
      
      {!isCliente && (
        <div className="bg-amber-100 border-2 border-amber-400 p-4 rounded-xl flex items-center gap-4">
          <Ghost size={30} className="text-amber-600" />
          <div>
            <p className="text-[10px] font-black text-amber-800 uppercase">Modo Invitado Activo</p>
            <p className="text-[9px] font-bold text-amber-700 uppercase">Diseñá tu web aquí. Los cambios son temporales hasta que solicites tu alta.</p>
          </div>
        </div>
      )}

      <div className="bg-white/40 p-4 rounded-xl border border-black/5">
        <p className="text-[10px] font-black text-slate-500 uppercase">
          Configuración para: <span className="text-red-600">{vendedorContexto}</span>
        </p>
      </div>

      {/* Pasamos si es invitado o cliente al componente */}
      <Customizer targetVendedor={vendedorContexto} isGuest={!isCliente} />
    </div>
  );
}