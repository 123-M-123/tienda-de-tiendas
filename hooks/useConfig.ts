import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  tiendaNombre: string;
  logoUrl: string;
  logoSize: number; // 🚩 NUEVA VARIABLE
  previewUrl: string;
  colorPrimario: string;
  colorSecundario: string;
  waNumero: string;
  igUser: string;
  version: string;
  setConfig: (config: Partial<ConfigState>) => void;
  resetConfig: () => void;
}

const defaultConfig = {
  tiendaNombre: "Tienda de Tiendas",
  logoUrl: "/logo-nuevo.png",
  logoSize: 80, // Tamaño inicial en px
  previewUrl: "/preview.jpg",
  colorPrimario: "#dc2626",
  colorSecundario: "#000000",
  waNumero: "5491153778475",
  igUser: "tiendadetiendas",
  version: "1.0",
};

export const useConfig = create<ConfigState>()(
  persist(
    (set) => ({
      ...defaultConfig,
      setConfig: (newConfig) => set((state) => ({ ...state, ...newConfig })),
      resetConfig: () => set(defaultConfig),
    }),
    { name: 'saas-config-storage' }
  )
);