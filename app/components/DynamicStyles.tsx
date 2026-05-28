"use client"

import { useEffect } from 'react'
import { useConfig } from '@/hooks/useConfig'

export default function DynamicStyles() {
  const { colorPrimario, colorSecundario } = useConfig()

  useEffect(() => {
    // Inyectamos las variables directamente en el elemento raíz (HTML)
    const root = document.documentElement;
    root.style.setProperty('--color-primario', colorPrimario);
    root.style.setProperty('--color-secundario', colorSecundario);
    
    // Log para debug (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Estilos actualizados:', { colorPrimario, colorSecundario });
    }
  }, [colorPrimario, colorSecundario])

  return null; // Este componente no renderiza nada visual
}