"use server"
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// La dejamos aquí por si se usa en otro lado, pero NO la usaremos al guardar
function getDriveDirectLink(url: string) {
  if (!url || !url.includes("drive.google.com")) return url;
  const match = url.match(/\/d\/(.+?)\//) || url.match(/id=(.+?)(&|$)/);
  const fileId = match ? match[1] : null;
  return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
}

export async function saveProduct(formData: FormData, isEdit: boolean = false) {
  const session = await auth();
  if (!session?.user?.email) return { error: "No autorizado" };

  try {
    const token = await getGoogleAccessToken();
    const idProducto = formData.get("id") as string;
    
    // REGLA DE ORO: Guardamos el link tal cual lo puso el usuario.
    // No procesamos la imagen aquí para que el Excel mantenga el formato original.
    const rawImg = formData.get("img") as string;
    
    const vendedorOriginal = formData.get("vendedorOriginal")?.toString();
    const vendedorFinal = (isEdit && vendedorOriginal) ? vendedorOriginal : session.user.email;

    const filaDatos = [
      vendedorFinal,            // A
      idProducto,               // B
      formData.get("titulo"),   // C
      formData.get("precio"),   // D
      formData.get("desc"),     // E
      rawImg,                   // F (LINK ORIGINAL SIN PROCESAR)
      formData.get("cat"),      // G
      formData.get("stock")     // H
    ];

    // Usamos USER_ENTERED para que Google Sheets reconozca números, fechas y links automáticamente
    const inputOption = "USER_ENTERED";

    if (!isEdit) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Carga de productos!A:H')}:append?valueInputOption=${inputOption}`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [filaDatos] }),
      });
    } else {
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Carga de productos!B:B')}`;
      const res = await fetch(readUrl, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const rows = data.values || [];
      
      const index = rows.findIndex((row: any) => row[0]?.toString().trim() === idProducto.trim());

      if (index !== -1) {
        const rowNumber = index + 1; 
        const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`Carga de productos!A${rowNumber}:H${rowNumber}`)}?valueInputOption=${inputOption}`;
        
        await fetch(updateUrl, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [filaDatos] }),
        });
      }
    }

    revalidatePath("/panel/productos");
    return { success: true };
  } catch (error) {
    console.error("Error saveProduct:", error);
    return { error: "Error de sincronización con Google Sheets" };
  }
}