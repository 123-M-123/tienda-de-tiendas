import { google } from 'googleapis';
import { auth } from "@/auth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";

// 1. CONFIGURACIÓN DEL ROBOT (JSON)
const authRobot = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth: authRobot });
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getPanelData(pestaña: string, targetEmail?: string) {
  const session = await auth();
  if (!session?.user?.email) return [];

  const userEmail = session.user.email.trim().toLowerCase();
  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();

  // Determinamos el "Email de Referencia" y su gaId
  const emailReferencia = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;
  const gaIdReferencia = CLIENTES[emailReferencia]?.gaId;

  try {
    // 2. CAMBIO CLAVE: Usamos la librería oficial en lugar de fetch
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${pestaña}!A2:H1000`, // Rango ampliado hasta H
    });

    const rows = response.data.values || [];

    // --- LÓGICA DE FILTRADO MAESTRO (Mantenida intacta) ---

    // A. Si es Admin y NO eligió a nadie, ve la planilla completa
    if (isAdmin && !targetEmail) return rows;

    // B. FILTRO DE SOCIOS (gaId):
    return rows.filter(row => {
      const emailEnFila = row[0]?.toString().trim().toLowerCase();
      if (!emailEnFila) return false;

      // Comparamos gaId para permitir que socios vean los mismos productos/ventas
      return CLIENTES[emailEnFila]?.gaId === gaIdReferencia;
    });

  } catch (error) {
    console.error("Error en getPanelData con Robot:", error);
    return [];
  }
}