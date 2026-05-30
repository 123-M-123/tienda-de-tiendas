import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  // --- IDENTIDAD & METADATA ---
  nombreCorto: string;
  nombreMedio: string;
  nombreLargo: string;
  metaDescripcion: string;

  // --- PALETA DE 9 COLORES ---
  colorOscuro1: string; colorOscuro2: string; colorOscuro3: string;
  colorMedio1: string;  colorMedio2: string;  colorMedio3: string;
  colorClaro1: string;  colorClaro2: string;  colorClaro3: string;

  // --- REDES SOCIALES ---
  waUser: string;
  igUser: string;
  ttUser: string;
  publicEmail: string;

  // --- FINANZAS & PAGOS ---
  cbu: string;
  cvu: string;
  alias: string;
  descuentoEfectivo: number;

  // --- LOGÍSTICA ---
  envioLocal: number;
  envioNacional: number;

  // --- ESTRUCTURA DE CATEGORÍAS ---
  categoriasLanding: string; // Ej: "remeras,pantalones,buzos"
  logoUrl: string;
  logoSize: number;
  navButtonSize: number;  // Tamaño botones en el header/sidebar
  pageButtonSize: number; // Tamaño botones en las páginas internas
  buttonRadius: number;

  // --- ACCIONES ---
  setConfig: (config: Partial<ConfigState>) => void;
  resetConfig: () => void;
}

const defaultConfig = {
  nombreCorto: "Tienda",
  nombreMedio: "Tienda de Tiendas",
  nombreLargo: "Tienda de Tiendas SaaS Global",
  metaDescripcion: "Tu plataforma de ventas definitiva",

  colorOscuro1: "#000000", colorOscuro2: "#1a1a1a", colorOscuro3: "#333333",
  colorMedio1: "#dc2626",  colorMedio2: "#ef4444",  colorMedio3: "#f87171",
  colorClaro1: "#ffffff",  colorClaro2: "#f3f4f6",  colorClaro3: "#e5e7eb",

  waUser: "5491153778475",
  igUser: "tiendadetiendas",
  ttUser: "tiendadetiendas",
  publicEmail: "info@tiendadetiendas.com",

  cbu: "", cvu: "", alias: "",
  descuentoEfectivo: 10,

  envioLocal: 0,
  envioNacional: 0,

  categoriasLanding: "",
  logoUrl: "/logo-nuevo.png",
  logoSize: 80,
  navButtonSize: 100,
  pageButtonSize: 150,
  buttonRadius: 12,
};

export const useConfig = create<ConfigState>()(
  persist(
    (set) => ({
      ...defaultConfig,
      setConfig: (newConfig) => set((state) => ({ ...state, ...newConfig })),
      resetConfig: () => set(defaultConfig),
    }),
    { name: 'saas-master-config' }
  )
);