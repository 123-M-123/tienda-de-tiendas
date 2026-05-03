// lib/panelData.ts
import { auth } from "@/auth";
import { ADMIN_EMAIL } from "./clientes"; // Asegurate que el archivo se llame clientes.ts
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getPanelData(pestaña: string, targetEmail?: string) {
  const session = await auth();
  
  // Seguridad: Si no hay sesión, no devolvemos nada
  if (!session?.user?.email) return [];

  const userEmail = session.user.email;
  const isAdmin = userEmail === ADMIN_EMAIL;

  // Lógica de Identidad: 
  // Si sos admin y elegiste a alguien en el selector, filtramos por ese mail. 
  // Si sos cliente, siempre filtramos por TU mail (userEmail).
  const emailAFiltrar = (isAdmin && targetEmail) ? targetEmail : userEmail;

  try {
    // Usamos la función centralizada para el token
    const token = await getGoogleAccessToken();
    
    // Construimos la URL para la API de Google Sheets (rango A2 hasta G1000)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(pestaña)}!A2:G1000`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 } // Forzamos a Next.js a no cachear para ver datos en tiempo real
    });

    const data = await res.json();
    
    // Si la planilla está vacía o hay error, devolvemos un array vacío
    const rows = (data.values as any[][]) || [];

    // --- LÓGICA DE FILTRADO MAESTRO ---
    
    // 1. Si es Admin y NO seleccionó a nadie en el dropdown, ve el TOTAL (todas las filas)
    if (isAdmin && !targetEmail) return rows;

    // 2. Si es un Cliente (o Admin viendo a un cliente específico), 
    // filtramos solo las filas donde la Columna A coincida con el mail.
    return rows.filter(row => row[0] === emailAFiltrar);

  } catch (error) {
    console.error("Error en getPanelData:", error);
    return [];
  }
}