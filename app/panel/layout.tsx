import { auth, signOut } from "@/auth";
import NextLink from "next/link";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes";
import { 
  LayoutDashboard, ClipboardList, CreditCard, 
  Package, Store, BarChart3, LogOut 
} from "lucide-react";
import NavLink from "./NavLink"; // Importamos el componente que creamos arriba

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userEmail = session?.user?.email || "";
  const isAdmin = userEmail.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();

  // --- TU BLINDAJE LÍNEA 16 (RESTAURADO) ---
  const [emailUser, emailDomain] = userEmail.includes('@') 
    ? userEmail.split('@') 
    : ["Usuario", "cargando..."];

  return (
    <div className="min-h-screen bg-[#e6dcb7] flex flex-col text-[#1A1A1A] font-sans">
      
      {/* 1. BARRA SUPERIOR (PANEL DE CONTROL + PERFIL) */}
      <header className="bg-white border-b border-slate-300 sticky top-0 z-50 px-4 md:px-8 py-2 flex justify-between items-center shadow-md">
        
        {/* Identificación: PANEL DE CONTROL en negro y 2 renglones */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md shrink-0">
            <Store className="text-white" size={16} />
          </div>
          <div className="flex flex-col text-[10px] md:text-xs font-black uppercase leading-[1.1] text-black tracking-tighter">
            <span>PANEL DE</span>
            <span>CONTROL</span>
          </div>
        </div>

        {/* Perfil y Salir */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
            <div className="text-right flex flex-col justify-center leading-none">
              <p className="text-[10px] md:text-[11px] font-black text-black break-all">
                {emailUser}
              </p>
              <p className="text-[8px] md:text-[9px] text-slate-500 font-bold">
                {emailDomain !== "cargando..." ? `@${emailDomain}` : emailDomain}
              </p>
            </div>
            
            {/* --- TU BLINDAJE LÍNEA 53 (RESTAURADO) --- */}
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-sm shrink-0">
              {userEmail?.[0]?.toUpperCase() || "U"}
            </div>
          </div>

          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <button type="submit" className="p-2 text-slate-400 hover:text-red-600 transition-all shrink-0">
              <LogOut size={18} />
            </button>
          </form>
        </div>
      </header>

      {/* 2. SELECTOR DE ADMIN (Misma lógica de socios) */}
      {isAdmin && (
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-300 px-4 py-2 overflow-x-auto no-scrollbar shadow-sm">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit mx-auto md:mx-0">
            <NextLink href="/panel/dashboard" className="px-3 py-1.5 text-[9px] font-black uppercase rounded-lg hover:bg-white transition-all">Global</NextLink>
            {Array.from(new Set(Object.values(CLIENTES).map(c => c.gaId))).map(gaId => {
              const cliente = Object.values(CLIENTES).find(c => c.gaId === gaId);
              const emailAsociado = Object.keys(CLIENTES).find(key => CLIENTES[key].gaId === gaId);
              return (
                <NextLink key={gaId} href={`?vendedor=${emailAsociado}`} className="px-3 py-1.5 whitespace-nowrap text-[9px] font-black uppercase rounded-lg bg-white shadow-sm border border-slate-100 hover:text-blue-600 transition-all">
                  {cliente?.nombre}
                </NextLink>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-1">
        
        {/* 3. NAVEGACIÓN CON SUBTÍTULOS Y COLORES */}
        <aside className="w-full md:w-64 bg-white/50 md:bg-white border-r border-slate-200 p-2 md:p-6">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar justify-around md:justify-start">
            <NavLink 
              href="/panel/dashboard" 
              label="Resumen" 
              subLabel="escritorio" 
              subColor="text-black" 
              icon={<LayoutDashboard size={20} />} 
            />
            <NavLink 
              href="/panel/analytics" 
              label="Métricas" 
              subLabel="google" 
              subColor="text-slate-400" 
              icon={<BarChart3 size={20} />} 
            />
            <NavLink 
              href="/panel/pedidos" 
              label="Pedidos" 
              subLabel="off-line" 
              subColor="text-emerald-600" 
              icon={<ClipboardList size={20} />} 
            />
            <NavLink 
              href="/panel/webhook" 
              label="Pagos" 
              subLabel="on-line" 
              subColor="text-blue-600" 
              icon={<CreditCard size={20} />} 
            />
            <NavLink 
              href="/panel/productos" 
              label="Productos" 
              subLabel="gestión" 
              subColor="text-orange-600" 
              icon={<Package size={20} />} 
            />
          </nav>
        </aside>

        {/* 4. CONTENIDO (Fondo Beige e6dcb7) */}
        <main className="flex-1 p-4 md:p-10 min-w-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}