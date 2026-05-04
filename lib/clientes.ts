// lib/clientes.ts

export const ADMIN_EMAIL = "marcosmarti1980@gmail.com";

// Definimos la estructura para que no tire error de "unknown"
export interface ClienteInfo {
  nombre: string;
  gaId: string;
}

export const CLIENTES: Record<string, ClienteInfo> = {
  "marcosrenemarti@gmail.com": { nombre: "Tecno EG", gaId: "534564663" },
  "mguiyemo@gmail.com": { nombre: "Tecno EG", gaId: "534564663" },
  "marielabasualdo1985@gmail.com": { nombre: "Meraki", gaId: "534733481" },
  "axel2002@gmail.com": { nombre: "MB Compras", gaId: "534715172" },
  "mateomarti3072@gmail.com": { nombre: "MB Compras", gaId: "534715172" },
  "elianamarti90@gmail.com": { nombre: "El Campito", gaId: "534606659" },
"exequiel.devita@gmail.com": { nombre: "El Campito", gaId: "534606659" },

};