"use client"
import NextLink from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  subLabel: string;
  subColor: string;
  icon: React.ReactNode;
}

export default function NavLink({ href, label, subLabel, subColor, icon }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NextLink href={href} className={`
      flex flex-col items-center justify-center gap-1 p-4 md:p-6 rounded-[2rem] transition-all shrink-0 border-2 min-w-[90px] md:min-w-[120px]
      ${isActive 
        ? 'bg-white border-slate-900 shadow-lg scale-105' 
        : 'border-transparent hover:bg-white/50 text-slate-500'}
    `}>
      {/* Fila 1: Icono y Nombre Principal (Ahora siempre visible) */}
      <div className="flex flex-col items-center gap-1">
        <div className={isActive ? 'text-slate-900' : 'text-slate-400'}>{icon}</div>
        <span className={`font-black text-[10px] md:text-xs uppercase ${isActive ? 'text-slate-900' : ''}`}>
          {label}
        </span>
      </div>
      
      {/* Fila 2: Subtítulo con su color correspondiente */}
      <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${subColor}`}>
        {subLabel}
      </span>
    </NextLink>
  );
}