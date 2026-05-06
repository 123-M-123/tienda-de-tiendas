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
      flex flex-col items-center md:items-start gap-0.5 p-3 md:px-5 md:py-3 rounded-2xl transition-all shrink-0 border-2
      ${isActive 
        ? 'bg-white border-slate-900 shadow-md' 
        : 'border-transparent hover:bg-white/50 text-slate-500'}
    `}>
      <div className="flex items-center gap-3">
        <div className={isActive ? 'text-slate-900' : 'text-slate-400'}>{icon}</div>
        <span className={`font-black text-[10px] md:text-sm uppercase hidden md:block ${isActive ? 'text-slate-900' : ''}`}>
          {label}
        </span>
      </div>
      <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-tighter md:ml-8 ${subColor}`}>
        {subLabel}
      </span>
    </NextLink>
  );
}