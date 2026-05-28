import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  tiendaNombre: string;
  logoUrl: string;
  previewUrl: string; // Nueva variable para OG Image
  colorPrimario: string;
  colorSecundario: string;
  waNumero: string;
  version: string;    // Para el manejo de cache (?v=)
  isSimulador: boolean;
  setConfig: (config: Partial<ConfigState>) => void;
  resetConfig: () => void;
}

const defaultConfig = {
  tiendaNombre: "Tienda de Tiendas",
  logoUrl: "/logo-nuevo.png",
  previewUrl: "/preview.jpg",
  colorPrimario: "#dc2626",
  colorSecundario: "#000000",
  waNumero: "5491153778475",
  version: "1.0",
  isSimulador: false,
};

export const useConfig = create<ConfigState>()(
  persist(
    (set) => ({
      ...defaultConfig,
      setConfig: (newConfig) => set((state) => ({ ...state, ...newConfig })),
      resetConfig: () => set(defaultConfig),
    }),
    {
      name: 'saas-config-storage',
    }
  )
);