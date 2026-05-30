import { google } from 'googleapis';
import { auth } from "@/auth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";

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
  const emailRef = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${pestaña}!A2:M1000`,
    });
    const rows = response.data.values || [];
    if (isAdmin && !targetEmail) return rows;
    return rows.filter(row => row[0]?.toString().trim().toLowerCase() === emailRef);
  } catch (error) {
    return [];
  }
}

// 🚩 FIX DE MAPEADO PARA LAYOUT Y COMPONENTES
export async function getStoreConfig(targetEmail?: string) {
  const data = await getPanelData("Config", targetEmail);
  if (!data || data.length === 0) return null;

  const row = data[0];
  return {
    email: row[0],
    nombreMedio: row[1] || "Tienda de Tiendas", // 🚩 Cambiado para matchear con Layout
    logo: row[2],
    colorPrimario: row[3] || "#dc2626",
    colorSecundario: row[4] || "#000000",
    waUser: row[6],
    igUser: row[7],
    metaTitle: row[8],
    metaDesc: row[9],
    previewUrl: row[10] || "/preview-2.jpg",
  };
}