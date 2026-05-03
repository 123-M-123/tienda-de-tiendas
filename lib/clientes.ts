// lib/clientes.ts

export const ADMIN_EMAIL = "marcosmarti1980@gmail.com";

// Definimos la estructura para que no tire error de "unknown"
export interface ClienteInfo {
  nombre: string;
  gaId: string;
}

export const CLIENTES: Record<string, ClienteInfo> = {
  "tecnoeg@gmail.com": { nombre: "Tecno EG", gaId: "534564663" },
  "merakibiju@gmail.com": { nombre: "Meraki", gaId: "534733481" },
  "mbcompras@gmail.com": { nombre: "MB Compras", gaId: "534715172" },
  "elcampito@gmail.com": { nombre: "El Campito", gaId: "534606659" },
};