import { auth, signOut } from "@/auth";
import Link from "next/link";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes";
import { 
  LayoutDashboard, ClipboardList, CreditCard, 
  Package, Store, BarChart3, LogOut, User 
} from "lucide-react";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userEmail = session?.user?.email;
  const isAdmin = userEmail === ADMIN_EMAIL;

  return (
    <div className="min-h-screen bg-[#e6dcb7] flex flex-col text-[#1A1A1A] font-sans">
      
      {/* 1. BARRA SUPERIOR (LOGO + PERFIL) - SIEMPRE ARRIBA */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 md:px-8 py-3 flex justify-between items-center shadow-sm">
        {/* Logo Izquierda */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
            <Store className="text-white" size={18} />
          </div>
          <h1 className="text-lg font-black tracking-tighter uppercase hidden xs:block">Tienda de Tiendas</h1>
        </div>

        {/* Perfil y Logout Derecha */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-3 pr-2 md:pr-4 border-r border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase leading-none">{session?.user?.name || 'Vendedor'}</p>
              <p className="text-[9px] text-slate-400 font-bold">{userEmail}</p>
            </div>
            {/* Círculo inicial */}
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-black shadow-lg">
              {userEmail?.[0].toUpperCase()}
            </div>
          </div>

          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <button type="submit" className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
              <LogOut size={20} />
            </button>
          </form>
        </div>
      </header>

      {/* 2. CUERPO DEL PANEL (SIDEBAR + CONTENIDO) */}
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* SIDEBAR (Menú de navegación) */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-100 flex flex-col p-4 md:p-6 gap-2">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto no-scrollbar">
            <NavLink href="/panel/dashboard" label="Resumen" icon={<LayoutDashboard size={18} />} />
            <NavLink href="/panel/analytics" label="Métricas" icon={<BarChart3 size={18} />} />
            <NavLink href="/panel/pedidos" label="Pedidos" icon={<ClipboardList size={18} />} />
            <NavLink href="/panel/webhook" label="Pagos" icon={<CreditCard size={18} />} />
            <NavLink href="/panel/productos" label="Productos" icon={<Package size={18} />} />
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col min-w-0">
          
          {/* SEGUNDO HEADER (Solo para el Selector de Admin si corresponde) */}
          {isAdmin && (
            <div className="bg-white/50 backdrop-blur-sm border-b border-slate-100 p-3 md:px-10 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl border border-slate-200 w-fit">
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
            </div>
          )}

          {/* ÁREA DE LAS PÁGINAS */}
          <section className="p-4 md:p-10 flex-1">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 md:p-4 rounded-2xl hover:bg-[#F1F5F9] text-slate-500 hover:text-slate-900 transition-all font-bold text-xs md:text-sm whitespace-nowrap">
      {icon} <span className="hidden xs:block">{label}</span>
    </Link>
  );
}