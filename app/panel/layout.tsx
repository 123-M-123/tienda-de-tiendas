import { auth } from "@/auth";
import Link from "next/link";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  return (
    <div className="min-h-screen bg-[#F4EFE0] flex flex-col md:flex-row text-[#1A1A1A]">
      {/* Sidebar con el estilo del Toldo */}
      <aside className="w-full md:w-64 bg-white border-r border-[#D1C7B7] flex flex-col">
        {/* Cabecera del Sidebar con franjas rojas y blancas */}
        <div className="h-4 w-full flex">
           {[...Array(10)].map((_, i) => (
             <div key={i} className={`flex-1 h-full ${i % 2 === 0 ? 'bg-[#E63946]' : 'bg-white'}`} />
           ))}
        </div>
        
        <div className="p-6">
          <div className="mb-10 text-center">
            <img src="/logo-tienda-de-tiendas.png" alt="Logo" className="mx-auto w-32" />
            <p className="text-[10px] uppercase tracking-widest mt-2 text-[#6B6862]">Panel de Gestión</p>
          </div>
          
          <nav className="flex flex-col gap-1">
            <NavLink href="/panel/dashboard" label="Métricas" icon="📊" activeColor="#E63946" />
            <NavLink href="/panel/pedidos" label="Pedidos" icon="📩" activeColor="#E63946" />
            <NavLink href="/panel/webhook" label="Pagos Online" icon="💳" activeColor="#E63946" />
            <NavLink href="/panel/productos" label="Mis Productos" icon="📦" activeColor="#E63946" />
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12">
        <header className="flex justify-between items-center mb-8 border-b border-[#D1C7B7] pb-4">
          <div>
            <span className="text-sm uppercase tracking-tighter text-[#6B6862]">Bienvenido al mostrador</span>
            <h2 className="text-xl font-black">{session?.user?.name || "Comerciante"}</h2>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-[#D1C7B7] text-xs font-bold shadow-sm">
            {session?.user?.email}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label, icon, activeColor }: { href: string, label: string, icon: string, activeColor: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F4EFE0] transition-all group">
      <span className="text-lg">{icon}</span>
      <span className="font-bold group-hover:text-[#E63946]">{label}</span>
    </Link>
  );
}