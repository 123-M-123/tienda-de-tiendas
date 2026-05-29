// lib/utils.ts - REEMPLAZO FUSIONADO
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- 🚀 NUEVAS FUNCIONES PARA EL SAAS ---

export function getDriveDirectLink(url: string, size: string = "1000") {
  if (!url || !url.includes("drive.google.com")) return url;
  
  // Captura el ID de cualquier formato de link de Drive
  const match = url.match(/\/d\/(.+?)(?:\/|$)|\/file\/d\/(.+?)\/|id=(.+?)(?:&|$)/);
  const fileId = match ? (match[1] || match[2] || match[3]) : null;
  
  if (!fileId) return url;
  
  // Retorna el link de alto rendimiento (lh3)
  return `https://lh3.googleusercontent.com/d/${fileId}=s${size}`;
}

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}