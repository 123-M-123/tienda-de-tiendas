import { auth } from "@/auth";
import Link from "next/link";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col md:flex-row">
      {/* Sidebar con Inline Styles para asegurar consistencia */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E2E0DC] p-6">
        <div className="mb-8">
          <img src="/logo-tienda.png" alt="Logo" className="h-10 w-auto" />
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/panel/dashboard" className="p-3 rounded-lg hover:bg-[#EEF3FC] text-[#1C1B19] font-medium">📊 Dashboard</Link>
          <Link href="/panel/pedidos" className="p-3 rounded-lg hover:bg-[#EDF7F3] text-[#1C1B19] font-medium">📩 Pedidos</Link>
          <Link href="/panel/webhook" className="p-3 rounded-lg hover:bg-[#EDF7FD] text-[#1C1B19] font-medium">💳 Pagos MP</Link>
          <Link href="/panel/productos" className="p-3 rounded-lg hover:bg-[#FFF8E1] text-[#1C1B19] font-medium">📦 Productos</Link>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold text-[#1C1B19]">Panel de Control</h1>
          <div className="text-sm text-[#6B6862]">{session?.user?.email}</div>
        </header>
        {children}
      </main>
    </div>
  );
}