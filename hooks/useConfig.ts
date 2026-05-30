import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 🛡️ ESTA INTERFAZ DEBE TENER TODO PARA QUE NO HAYA ERRORES
interface ConfigState {
  // Identidad & Metadata
  nombreCorto: string;
  nombreMedio: string;
  nombreLargo: string;
  tiendaNombre: string; // Alias para el Header
  metaDescripcion: string;
  
  // Assets
  logoUrl: string;
  logoSize: number;
  previewUrl: string;
  version: string;
  
  // Paleta de 9 Colores
  colorOscuro1: string; colorOscuro2: string; colorOscuro3: string;
  colorMedio1: string;  colorMedio2: string;  colorMedio3: string;
  colorClaro1: string;  colorClaro2: string;  colorClaro3: string;
  colorPrimario: string; // Para compatibilidad
  colorSecundario: string;

  // Diseño de Interfaz
  buttonRadius: number;
  categoryMode: 'pill' | 'card' | 'line';
  fontSizeBase: number;
  navButtonSize: number;
  pageButtonSize: number;

  // Redes Sociales
  waUser: string;
  igUser: string;
  ttUser: string;
  publicEmail: string;

  // Finanzas & Pagos (🚩 AQUÍ ESTABAN TUS ERRORES)
  cbu: string;
  cvu: string;
  alias: string;
  descuentoEfectivo: number;

  // Logística (🚩 AQUÍ ESTABAN TUS ERRORES)
  envioLocal: number;
  envioNacional: number;

  // Estructura
  categoriasLanding: string;

  // Acciones
  setConfig: (config: Partial<ConfigState>) => void;
  resetConfig: () => void;
}

const defaultConfig = {
  nombreCorto: "Tienda",
  nombreMedio: "Tienda de Tiendas",
  nombreLargo: "Tienda de Tiendas SaaS Global",
  tiendaNombre: "Tienda de Tiendas",
  metaDescripcion: "Tu plataforma de ventas definitiva",
  logoUrl: "/logo-nuevo.png",
  logoSize: 80,
  previewUrl: "/preview-2.jpg",
  version: "1.0",
  
  colorOscuro1: "#000000", colorOscuro2: "#1a1a1a", colorOscuro3: "#333333",
  colorMedio1: "#dc2626",  colorMedio2: "#ef4444",  colorMedio3: "#f87171",
  colorClaro1: "#ffffff",  colorClaro2: "#f3f4f6",  colorClaro3: "#e5e7eb",
  colorPrimario: "#dc2626",
  colorSecundario: "#000000",

  buttonRadius: 12,
  categoryMode: 'pill' as const,
  fontSizeBase: 16,
  navButtonSize: 100,
  pageButtonSize: 150,

  waUser: "5491153778475",
  igUser: "tiendadetiendas",
  ttUser: "tiendadetiendas",
  publicEmail: "info@tiendadetiendas.com",

  cbu: "", 
  cvu: "", 
  alias: "",
  descuentoEfectivo: 10,

  envioLocal: 0,
  envioNacional: 0,

  categoriasLanding: "",
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