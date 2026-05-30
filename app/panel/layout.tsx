import { auth, signOut } from "@/auth";
import { ADMIN_EMAIL, CLIENTES } from "@/lib/clientes";
import { 
  LayoutDashboard, ClipboardList, CreditCard, 
  Package, Store, BarChart3, LogOut, Image, Settings, ShoppingBag 
} from "lucide-react";
import NavLink from "./NavLink";
import SelectorClientes from "./SelectorClientes";
import { Suspense } from "react";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userEmail = session?.user?.email || "";
  const isAdmin = userEmail.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();

  const clientesUnicos = Array.from(
    new Map(Object.entries(CLIENTES).map(([email, info]) => [info.gaId, { ...info, emailPrincipal: email }])).values()
  );

  return (
    <div className="min-h-screen bg-[#e6dcb7] flex flex-col text-[#1A1A1A] font-sans">
      
      {/* BARRA SUPERIOR */}
      <header className="bg-white border-b border-slate-300 sticky top-0 z-50 px-4 md:px-8 py-2 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
            <Store className="text-white" size={16} />
          </div>
          <div className="flex flex-col text-[10px] md:text-xs font-black uppercase leading-[1.1] text-black">
            <span>PANEL DE</span><span>CONTROL</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 pr-2 border-r border-slate-200 text-right">
            <p className="text-[10px] font-black text-black">{userEmail.split('@')[0]}</p>
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black uppercase">
              {userEmail?.[0]}
            </div>
          </div>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <button type="submit" className="p-2 text-slate-400 hover:text-red-600 transition-all"><LogOut size={18} /></button>
          </form>
        </div>
      </header>

      {/* SELECTOR DE WEBS */}
      {isAdmin && (
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-300 px-4 py-2 overflow-x-auto no-scrollbar shadow-sm">
          <Suspense fallback={<div className="h-8 w-40 bg-slate-100 animate-pulse rounded-lg" />}>
            <SelectorClientes clientes={clientesUnicos} />
          </Suspense>
        </div>
      )}

      <div className="flex flex-col flex-1">
        {/* NAVEGACIÓN NORMALIZADA */}
        <aside className="w-full bg-white/50 border-b border-slate-200 p-2 md:p-4 overflow-x-auto no-scrollbar">
          <nav className="flex flex-row gap-2 md:gap-4 justify-start md:justify-center">
            <NavLink href="/panel/dashboard" label="PANTALLA" subLabel="RESUMEN" subColor="text-slate-900" icon={<LayoutDashboard size={18} />} />
            <NavLink href="/panel/analytics" label="MÉTRICAS" subLabel="GOOGLE" subColor="text-slate-400" icon={<BarChart3 size={18} />} />
            <NavLink href="/panel/pedidos" label="PEDIDOS" subLabel="OFF-LINE" subColor="text-emerald-600" icon={<ClipboardList size={18} />} />
            <NavLink href="/panel/webhook" label="PAGOS" subLabel="ON-LINE" subColor="text-blue-600" icon={<CreditCard size={18} />} />
            <NavLink href="/panel/productos" label="PRODUCTOS" subLabel="GESTIÓN" subColor="text-orange-600" icon={<Package size={18} />} />
            <NavLink href="/panel/banners" label="PUBLICIDAD" subLabel="BANNERS" subColor="text-purple-600" icon={<Image size={18} />} />
            <NavLink href="/panel/merchant" label="MERCHANT" subLabel="GOOGLE" subColor="text-blue-900" icon={<ShoppingBag size={18} />} />
            <NavLink href="/panel/ajustes" label="ESTILO" subLabel="BRANDING" subColor="text-red-600" icon={<Settings size={18} />} />
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-10 min-w-0 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}