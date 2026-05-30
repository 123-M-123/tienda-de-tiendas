"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useConfig } from '@/hooks/useConfig'
import { Sparkles, ChevronRight } from 'lucide-react'

export default function CategoryNav({ productos }: { productos: any[] }) {
  const config = useConfig()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted || !productos) return null

  // 🪄 Extraemos categorías únicas de los productos (Lógica automática)
  const catMap = new Map()
  productos.forEach(p => {
    if (p.categoria && !catMap.has(p.categoriaSlug)) {
      catMap.set(p.categoriaSlug, p.categoria)
    }
  })
  const categorias = Array.from(catMap.entries())

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <div className={`
        flex flex-wrap gap-4 justify-center
        ${config.categoryMode === 'pill' ? 'flex-row' : ''}
        ${config.categoryMode === 'card' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6' : ''}
        ${config.categoryMode === 'line' ? 'flex-col items-start' : ''}
      `}>
        
        {categorias.map(([slug, label]) => (
          <Link 
            key={slug} 
            href={`/categoria/${slug}`}
            style={{ 
              borderRadius: `${config.buttonRadius}px`,
              borderColor: config.categoryMode === 'pill' ? config.colorPrimario : 'transparent'
            }}
            className={`
              group transition-all duration-300 flex items-center gap-3
              ${config.categoryMode === 'pill' ? 'px-6 py-2 border-2 text-white font-bold bg-black hover:scale-105' : ''}
              ${config.categoryMode === 'card' ? 'bg-white p-4 shadow-lg border border-black/5 hover:-translate-y-2' : ''}
              ${config.categoryMode === 'line' ? 'w-full py-3 border-b border-black/10 hover:pl-4' : ''}
            `}
          >
            {/* ICONO PNG O FALLBACK (Lógica de Glamour) */}
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
               <img 
                src={`/icons/${slug}.png`} 
                alt="" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                onError={(e) => (e.currentTarget.style.display = 'none')} 
              />
               <Sparkles size={20} style={{ color: config.colorPrimario }} className="absolute opacity-0 group-hover:opacity-100" />
            </div>

            <span className={`
              font-black uppercase tracking-tighter
              ${config.categoryMode === 'line' ? 'text-lg' : 'text-xs'}
            `}>
              {label}
            </span>

            {config.categoryMode === 'line' && <ChevronRight className="ml-auto opacity-20" />}
          </Link>
        ))}
      </div>
    </div>
  )
}