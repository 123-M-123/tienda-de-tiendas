"use client"
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  subLabel: string;
  subColor: string;
  icon: React.ReactNode;
}

export default function NavLink({ href, label, subLabel, subColor, icon }: NavLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const vendedor = searchParams.get("vendedor");

  const isActive = pathname === href;
  const finalHref = vendedor ? `${href}?vendedor=${vendedor}` : href;

  return (
    <NextLink href={finalHref} className={`
      flex flex-col items-center justify-center gap-0.5 p-2 md:p-3 rounded-xl transition-all shrink-0 border-2 min-w-21.25 md:min-w-27.5
      ${isActive 
        ? 'bg-white border-slate-900 shadow-sm scale-105' 
        : 'border-transparent hover:bg-white/40 text-slate-500'}
    `}>
      <div className="flex items-center gap-1.5">
        <div className={isActive ? 'text-slate-900' : 'text-slate-400'}>{icon}</div>
        <span className={`font-black text-[9px] md:text-[10px] uppercase ${isActive ? 'text-slate-900' : ''}`}>
          {label}
        </span>
      </div>
      <span className={`text-[8px] md:text-[9px] font-bold uppercase tracking-tighter ${isActive ? subColor : 'text-slate-400'}`}>
        {subLabel}
      </span>
    </NextLink>
  );
}