import { auth } from "@/auth";
import { ADMIN_EMAIL } from "./clientes";
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getPanelData(pestaña: string, targetEmail?: string) {
  const session = await auth();
  if (!session?.user?.email) return [];

  const userEmail = session.user.email.trim().toLowerCase();
  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();
  const emailAFiltrar = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;

  try {
    const token = await getGoogleAccessToken();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(pestaña)}!A2:G1000`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });

    const data = await res.json();
    const rows = (data.values as any[][]) || [];

    if (isAdmin && !targetEmail) return rows;

    // Filtro mejorado: trim y lowercase en ambos lados para evitar errores de tipeo
    return rows.filter(row => 
      row[0] && row[0].toString().trim().toLowerCase() === emailAFiltrar
    );
  } catch (error) {
    console.error("Error en getPanelData:", error);
    return [];
  }
}