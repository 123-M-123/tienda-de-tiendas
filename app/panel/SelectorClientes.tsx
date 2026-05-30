"use client"

import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Cliente {
  gaId: string;
  nombre: string;
  emailPrincipal: string;
}

export default function SelectorClientes({ clientes }: { clientes: Cliente[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const vendedorSeleccionado = searchParams.get("vendedor")?.toLowerCase();

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit mx-auto md:mx-0">
      {/* BOTÓN GLOBAL */}
      <NextLink 
        href={pathname} 
        className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${
          !vendedorSeleccionado 
            ? 'bg-slate-900 text-white shadow-md' 
            : 'text-slate-600 hover:bg-white'
        }`}
      >
        Global
      </NextLink>

      {/* BOTONES DE CLIENTES */}
      {clientes.map(cliente => {
        const isSelected = cliente.emailPrincipal.toLowerCase() === vendedorSeleccionado;
        
        return (
          <NextLink 
            key={cliente.gaId} 
            href={`${pathname}?vendedor=${cliente.emailPrincipal}`} 
            className={`px-3 py-1.5 whitespace-nowrap text-[9px] font-black uppercase rounded-lg border transition-all ${
              isSelected 
                ? 'bg-slate-900 text-white border-slate-950 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] scale-105' 
                : 'bg-white text-slate-600 border-slate-100 hover:text-blue-600'
            }`}
          >
            {cliente.nombre}
          </NextLink>
        );
      })}
    </div>
  );
}