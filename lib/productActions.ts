"use server"
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

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
    const rawImg = formData.get("img") as string;
    const directImgLink = getDriveDirectLink(rawImg);
    
    // PROTECCIÓN DE PROPIEDAD: 
    // Si editamos, usamos el vendedor que ya tenía el producto (vendedorOriginal).
    // Si es nuevo, usamos el mail del que está logueado.
    const vendedorOriginal = formData.get("vendedorOriginal")?.toString();
    const vendedorFinal = (isEdit && vendedorOriginal) ? vendedorOriginal : session.user.email;

    // MAPEO ESTRICTO: A:Vendedor | B:ID | C:Título | D:Precio | E:Desc | F:Img | G:Cat | H:Stock
    const filaDatos = [
      vendedorFinal,            // A
      idProducto,               // B
      formData.get("titulo"),   // C
      formData.get("precio"),   // D
      formData.get("desc"),     // E
      directImgLink,            // F
      formData.get("cat"),      // G
      formData.get("stock")     // H
    ];

    if (!isEdit) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Carga de productos!A:H')}:append?valueInputOption=RAW`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [filaDatos] }),
      });
    } else {
      // Proceso de Edición: Buscamos la fila por ID (Columna B)
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Carga de productos!B:B')}`;
      const res = await fetch(readUrl, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const rows = data.values || [];
      
      const index = rows.findIndex((row: any) => 
        row[0]?.toString().trim() === idProducto.trim()
      );

      if (index !== -1) {
        const rowNumber = index + 1; 
        const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`Carga de productos!A${rowNumber}:H${rowNumber}`)}?valueInputOption=RAW`;
        
        const response = await fetch(updateUrl, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [filaDatos] }),
        });

        if (!response.ok) throw new Error("Error al actualizar en Sheets");
      } else {
        return { error: "Producto no encontrado para editar" };
      }
    }

    revalidatePath("/panel/productos");
    return { success: true };
  } catch (error) {
    console.error("Error saveProduct:", error);
    return { error: "Error de sincronización con Google Sheets" };
  }
}