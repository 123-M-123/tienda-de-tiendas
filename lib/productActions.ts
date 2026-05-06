"use server"
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getGoogleAccessToken } from "./googleAuth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function saveProduct(formData: FormData, isEdit: boolean = false) {
  const session = await auth();
  if (!session?.user?.email) return { error: "No autorizado" };

  try {
    const token = await getGoogleAccessToken();
    const idProducto = formData.get("id") as string;
    
    // Armamos la fila exactamente como la estructura de tu Excel:
    // A: Vendedor | B: ID | C: Título | D: Precio | E: Desc | F: Img | G: Cat
    const filaDatos = [
      session.user.email,       // A
      idProducto,               // B
      formData.get("titulo"),   // C
      formData.get("precio"),   // D
      formData.get("desc"),     // E
      formData.get("img"),      // F
      formData.get("cat")       // G
    ];

    if (!isEdit) {
      // --- LÓGICA PARA NUEVO PRODUCTO ---
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Carga de productos!A:G')}:append?valueInputOption=RAW`;
      
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [filaDatos] }),
      });
      console.log("✅ Producto nuevo creado:", idProducto);

    } else {
      // --- LÓGICA PARA EDITAR EXISTENTE ---
      // 1. Buscamos en la columna B dónde está el ID (usamos el token en vez de API_KEY)
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Carga de productos!B:B')}`;
      const res = await fetch(readUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const rows = data.values || [];
      
      // Buscamos el índice (recordá que rows es un array de arrays: [["ID1"], ["ID2"]])
      const index = rows.findIndex((row: any) => row[0] === idProducto);

      if (index !== -1) {
        const rowNumber = index + 1; // Sheets empieza en 1
        const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`Carga de productos!A${rowNumber}:G${rowNumber}`)}?valueInputOption=RAW`;
        
        await fetch(updateUrl, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [filaDatos] }),
        });
        console.log("✅ Producto actualizado en fila:", rowNumber);
      } else {
        console.error("❌ No se encontró el ID para editar:", idProducto);
        return { error: "No se encontró el producto" };
      }
    }

    // Refrescamos la cache de la página para que el usuario vea el cambio al instante
    revalidatePath("/panel/productos");
    return { success: true };

  } catch (error) {
    console.error("Error en saveProduct:", error);
    return { error: "Error de servidor" };
  }
}