// lib/clientes.ts

export const ADMIN_EMAIL = "marcosmarti1980@gmail.com";

export interface ClienteInfo {
  nombre: string;
  gaId: string;
}

export const CLIENTES: Record<string, ClienteInfo> = {
  // TECNO EG
  "tiendadtiendas@gmail.com": { nombre: "Tecno EG", gaId: "534564663" },
  "mguiyemo@gmail.com":        { nombre: "Tecno EG", gaId: "534564663" },

  // MERAKI
  "marielabasualdo1985@gmail.com": { nombre: "Meraki", gaId: "534733481" },
  "mateolucamarti3072@gmail.com":  { nombre: "Meraki", gaId: "534733481" },

  // MB COMPRAS
  "axel2002@gmail.com":              { nombre: "MB Compras", gaId: "534715172" },
  "tallergraficobuongusto@gmail.com": { nombre: "MB Compras", gaId: "534715172" },

  // EL CAMPITO
  "elianamarti90@gmail.com":   { nombre: "El Campito", gaId: "534606659" },
  "exequiel.devita@gmail.com": { nombre: "El Campito", gaId: "534606659" },

  // GLAMOUR
  "gla_142@hotmail.com": { nombre: "Glamour", gaId: "537730087" },
};

// 🔐 HELPER PARA WHITELISTING
export const esUsuarioAutorizado = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const emailLower = email.toLowerCase();
  return emailLower === ADMIN_EMAIL || !!CLIENTES[emailLower];
};

// 🏷️ HELPER PARA OBTENER NOMBRE DE TIENDA
export const getNombreTienda = (email: string): string => {
  return CLIENTES[email.toLowerCase()]?.nombre || "Tienda de Tiendas";
};