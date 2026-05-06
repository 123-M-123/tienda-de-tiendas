import { auth } from "@/auth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getPanelData(pestaña: string, targetEmail?: string) {
  const session = await auth();
  if (!session?.user?.email) return [];

  const userEmail = session.user.email.trim().toLowerCase();
  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();

  // 1. Determinamos el "Email de Referencia"
  const emailReferencia = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;

  // 2. Buscamos el gaId vinculado a ese mail
  const gaIdReferencia = CLIENTES[emailReferencia]?.gaId;

  try {
    const token = await getGoogleAccessToken();
    // CORRECCIÓN: Rango ampliado hasta H para incluir Stock
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(pestaña)}!A2:H1000`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      // OPTIMIZACIÓN: Caché de 1 segundo para evitar saturación en navegación
      next: { revalidate: 1 }
    });

    const data = await res.json();
    const rows = (data.values as any[][]) || [];

    // --- LÓGICA DE FILTRADO MAESTRO ---

    // A. Si es Admin y NO eligió a nadie, ve la planilla completa (GLOBAL)
    if (isAdmin && !targetEmail) return rows;

    // B. FILTRO DE SOCIOS (gaId):
    return rows.filter(row => {
      const emailEnFila = row[0]?.toString().trim().toLowerCase();
      if (!emailEnFila) return false;

      // Comparamos gaId para permitir que socios vean los mismos productos
      return CLIENTES[emailEnFila]?.gaId === gaIdReferencia;
    });

  } catch (error) {
    console.error("Error en getPanelData:", error);
    return [];
  }
}