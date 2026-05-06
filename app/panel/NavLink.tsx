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
      flex flex-col items-center justify-center gap-0.5 p-2 md:p-3 rounded-xl transition-all shrink-0 border-2 min-w-[85px] md:min-w-[110px]
      ${isActive 
        ? 'bg-white border-slate-900 shadow-sm' 
        : 'border-transparent hover:bg-white/40 text-slate-500'}
    `}>
      {/* Fila 1: Label */}
      <div className="flex items-center gap-1.5">
        <div className={isActive ? 'text-slate-900' : 'text-slate-400'}>{icon}</div>
        <span className={`font-black text-[10px] uppercase ${isActive ? 'text-slate-900' : ''}`}>
          {label}
        </span>
      </div>
      
      {/* Fila 2: SubLabel (Mismo tamaño, todo Mayúsculas) */}
      <span className={`text-[10px] font-bold uppercase tracking-tighter ${subColor}`}>
        {subLabel}
      </span>
    </NextLink>
  );
}