"use server"
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function getGoogleToken() {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export async function saveProduct(formData: FormData, isEdit: boolean = false) {
  const session = await auth();
  if (!session?.user?.email) return { error: "No autorizado" };

  const token = await getGoogleToken();
  const email = session.user.email;

  // Si es nuevo, generamos un ID automático: P + 6 últimos dígitos del timestamp
  const id = isEdit ? formData.get("id") : `P-${Date.now().toString().slice(-6)}`;
  
  const datos = [
    email,                    // A: Vendedor
    id,                       // B: ID Producto
    formData.get("titulo"),   // C
    formData.get("precio"),   // D
    formData.get("desc"),     // E
    formData.get("img"),      // F
    formData.get("cat")       // G
  ];

  if (!isEdit) {
    // INSERTAR NUEVO (Append)
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Carga%20de%20productos!A:G:append?valueInputOption=RAW`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [datos] }),
    });
  } else {
    // EDITAR (Update) - Aquí primero buscamos la fila por ID y luego actualizamos
    // Por simplicidad en este paso, asumimos que el sistema ya sabe la fila o busca por ID.
    // (Luego podemos pulir la búsqueda de fila exacta).
  }

  revalidatePath("/panel/productos");
  return { success: true, id };
}