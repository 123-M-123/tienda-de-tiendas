"use server"
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function saveBanner(formData: FormData, isEdit: boolean = false) {
  const session = await auth();
  if (!session?.user?.email) return { error: "No autorizado" };

  try {
    const token = await getGoogleAccessToken();
    const vendedorOriginal = formData.get("vendedorOriginal")?.toString();
    const vendedorFinal = (isEdit && vendedorOriginal) ? vendedorOriginal : session.user.email;

    const filaDatos = [
      vendedorFinal,             // A: Vendedor
      formData.get("img"),       // B: Link Drive
      formData.get("ubicacion"), // C: Ubicación
      formData.get("linkDestino") // D: Link de destino
    ];

    const inputOption = "USER_ENTERED";
    // IMPORTANTE: Nombre de pestaña exacto "Baners Publicidad"
    const sheetName = "Baners Publicidad";

    if (!isEdit) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheetName + '!A:D')}:append?valueInputOption=${inputOption}`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [filaDatos] }),
      });
    } else {
      const ubicacion = formData.get("ubicacion") as string;
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheetName + '!C:C')}`;
      const res = await fetch(readUrl, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const rows = data.values || [];
      const index = rows.findIndex((row: any) => row[0] === ubicacion);

      if (index !== -1) {
        const rowNumber = index + 1; 
        const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`${sheetName}!A${rowNumber}:D${rowNumber}`)}?valueInputOption=${inputOption}`;
        await fetch(updateUrl, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [filaDatos] }),
        });
      }
    }

    revalidatePath("/panel/banners");
    return { success: true };
  } catch (error) {
    console.error("Error saveBanner:", error);
    return { error: "Error de sincronización" };
  }
}