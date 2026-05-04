"use server"
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function saveProduct(formData: FormData, isEdit: boolean = false) {
  const session = await auth();
  if (!session?.user?.email) return { error: "No autorizado" };

  const token = await getGoogleAccessToken();
  const idProducto = formData.get("id") as string;
  
  const filaDatos = [
    session.user.email,       // A: Vendedor
    idProducto,               // B: ID
    formData.get("titulo"),   // C
    formData.get("precio"),   // D
    formData.get("desc"),     // E
    formData.get("img"),      // F
    formData.get("cat")       // G
  ];

  if (!isEdit) {
    // NUEVO: Append normal
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Carga%20de%20productos!A:G:append?valueInputOption=RAW`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [filaDatos] }),
    });
  } else {
    // EDITAR: 1. Buscar la fila por ID
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Carga%20de%20productos!B:B?key=${process.env.GOOGLE_API_KEY}`);
    const data = await res.json();
    const rows = data.values || [];
    const index = rows.findIndex((row: any) => row[0] === idProducto);

    if (index !== -1) {
      const rowNumber = index + 1; // +1 porque Sheets cuenta desde 1
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Carga%20de%20productos!A${rowNumber}:G${rowNumber}?valueInputOption=RAW`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [filaDatos] }),
      });
    }
  }

  revalidatePath("/panel/productos");
  return { success: true };
}