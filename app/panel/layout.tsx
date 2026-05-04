import { auth } from "@/auth";
import Link from "next/link";
import { 
  LayoutDashboard, ClipboardList, CreditCard, 
  Package, Store, UserCircle, BarChart3, LogOut 
} from "lucide-react";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row text-slate-900 font-sans">
      
      {/* SIDEBAR MINIMALISTA */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 flex-1">
          <div className="mb-12 flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Store className="text-white" size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Tienda de Tiendas</h1>
          </div>
          
          <nav className="flex flex-col gap-2">
            <NavLink href="/panel/dashboard" label="Resumen" icon={<LayoutDashboard size={20} />} />
            <NavLink href="/panel/analytics" label="Métricas" icon={<BarChart3 size={20} />} />
            <NavLink href="/panel/pedidos" label="Pedidos" icon={<ClipboardList size={20} />} />
            <NavLink href="/panel/webhook" label="Pagos Online" icon={<CreditCard size={20} />} />
            <NavLink href="/panel/productos" label="Productos" icon={<Package size={20} />} />
          </nav>
        </div>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
              {session?.user?.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{session?.user?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-400 truncate">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all font-semibold text-sm">
      {icon}
      {label}
    </Link>
  );
}