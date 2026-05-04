import { auth, signOut } from "@/auth";
import Link from "next/link";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes";
import { 
  LayoutDashboard, ClipboardList, CreditCard, 
  Package, Store, BarChart3, LogOut, ChevronDown 
} from "lucide-react";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userEmail = session?.user?.email;
  const isAdmin = userEmail === ADMIN_EMAIL;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row text-[#1A1A1A] font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 flex-1">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
              <Store className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Tienda de Tiendas</h1>
          </div>
          
          <nav className="flex flex-col gap-1">
            <NavLink href="/panel/dashboard" label="Resumen" icon={<LayoutDashboard size={20} />} />
            <NavLink href="/panel/analytics" label="Métricas" icon={<BarChart3 size={20} />} />
            <NavLink href="/panel/pedidos" label="Pedidos" icon={<ClipboardList size={20} />} />
            <NavLink href="/panel/webhook" label="Pagos Online" icon={<CreditCard size={20} />} />
            <NavLink href="/panel/productos" label="Productos" icon={<Package size={20} />} />
          </nav>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col">
        {/* HEADER UNIFICADO */}
        <header className="bg-white/70 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100 p-4 md:px-10 flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* LADO IZQUIERDO: SELECTOR ADMIN */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar max-w-75 md:max-w-full">
                <Link href="/panel/dashboard" className="px-3 py-1.5 text-[9px] font-black uppercase rounded-lg hover:bg-white transition-all">Global</Link>
                {Object.entries(CLIENTES).map(([email, info]) => (
                  <Link 
                    key={email} 
                    href={`?vendedor=${email}`} 
                    className="px-3 py-1.5 whitespace-nowrap text-[9px] font-black uppercase rounded-lg bg-white shadow-sm border border-slate-100 hover:text-blue-600 transition-all"
                  >
                    {info.nombre}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* LADO DERECHO: PERFIL Y LOGOUT */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase leading-none">{session?.user?.name}</p>
                <p className="text-[9px] text-slate-400 font-bold">{userEmail}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black border border-slate-200">
                {userEmail?.[0].toUpperCase()}
              </div>
            </div>

            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                <LogOut size={20} />
              </button>
            </form>
          </div>
        </header>

        <section className="p-6 md:p-10">
          {children}
        </section>
      </main>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F1F5F9] text-slate-500 hover:text-slate-900 transition-all font-bold text-sm">
      {icon} {label}
    </Link>
  );
}