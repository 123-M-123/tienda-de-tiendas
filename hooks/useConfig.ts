import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductoSimulado {
  id: string; titulo: string; precio: number; img: string; cat: string; desc: string; stock: number;
}

interface ConfigState {
  isGuestMode: boolean;
  nombreCorto: string; nombreMedio: string; nombreLargo: string;
  tiendaNombre: string; metaDescripcion: string;
  logoUrl: string; logoSize: number; previewUrl: string; version: string;
  colorOscuro1: string; colorOscuro2: string; colorOscuro3: string;
  colorMedio1: string;  colorMedio2: string;  colorMedio3: string;
  colorClaro1: string;  colorClaro2: string;  colorClaro3: string;
  colorPrimario: string; colorSecundario: string;
  buttonRadius: number; categoryMode: 'pill' | 'card' | 'line';
  fontSizeBase: number; navButtonSize: number; pageButtonSize: number;
  waUser: string; igUser: string; ttUser: string; publicEmail: string;
  cbu: string; cvu: string; alias: string; descuentoEfectivo: number;
  envioLocal: number; envioNacional: number; categoriasLanding: string;
  
  productosInvitado: ProductoSimulado[];
  addProductoInvitado: (p: ProductoSimulado) => void;
  removeProductoInvitado: (id: string) => void;

  // 🚩 WISHLIST (FAVORITOS)
  wishlist: string[];
  toggleWishlist: (id: string) => void;

  setConfig: (config: Partial<ConfigState>) => void;
  resetConfig: () => void;
}

const defaultConfig = {
  isGuestMode: true,
  nombreCorto: "Tienda", nombreMedio: "Mi Tienda SaaS", nombreLargo: "Mi Nueva Tienda Online",
  tiendaNombre: "Mi Tienda", metaDescripcion: "Diseñada con Tienda de Tiendas",
  logoUrl: "/logo-nuevo.png", logoSize: 80, previewUrl: "/preview-2.jpg", version: "1.0",
  colorOscuro1: "#000000", colorOscuro2: "#1a1a1a", colorOscuro3: "#333333",
  colorMedio1: "#dc2626",  colorMedio2: "#ef4444",  colorMedio3: "#f87171",
  colorClaro1: "#ffffff",  colorClaro2: "#f3f4f6",  colorClaro3: "#e5e7eb",
  colorPrimario: "#dc2626", colorSecundario: "#000000",
  buttonRadius: 12, categoryMode: 'pill' as const,
  fontSizeBase: 16, navButtonSize: 100, pageButtonSize: 150,
  waUser: "5491153778475", igUser: "", ttUser: "", publicEmail: "",
  cbu: "", cvu: "", alias: "", descuentoEfectivo: 10,
  envioLocal: 0, envioNacional: 0, categoriasLanding: "",
  productosInvitado: [],
  wishlist: [],
};

export const useConfig = create<ConfigState>()(
  persist(
    (set) => ({
      ...defaultConfig,
      addProductoInvitado: (p) => set((state) => ({
        productosInvitado: state.productosInvitado.length < 10 ? [...state.productosInvitado, p] : state.productosInvitado
      })),
      removeProductoInvitado: (id) => set((state) => ({
        productosInvitado: state.productosInvitado.filter(p => p.id !== id)
      })),
      toggleWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.includes(id) 
          ? state.wishlist.filter(item => item !== id) 
          : [...state.wishlist, id]
      })),
      setConfig: (newConfig) => set((state) => ({ ...state, ...newConfig })),
      resetConfig: () => set(defaultConfig),
    }),
    { name: 'saas-master-config' }
  )
);