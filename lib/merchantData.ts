import { getGoogleAccessToken } from "./googleAuth";
import { ADMIN_EMAIL } from "./clientes";

const merchantMapping: Record<string, string> = {
  "marcosmarti1980@gmail.com": "5341258674", // Tu ID de Merchant (Ejemplo)
  "gla_142@hotmail.com": "5799114172",        // 🚩 GLAMOUR (Sacado de tu foto)
  "marcosrenemarti@gmail.com": "534564663",   // Tecno EG (ID de Merchant real acá)
};

export async function getMerchantProducts(targetEmail?: string) {
  const emailABuscar = targetEmail?.trim().toLowerCase() || ADMIN_EMAIL;
  const merchantId = merchantMapping[emailABuscar];

  if (!merchantId) return [];

  try {
    const token = await getGoogleAccessToken();
    // Usamos la API de Merchant (v2.1 es la estable para lectura de estados)
    const url = `https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/productstatuses`;

    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    const data = await res.json();
    
    // Mapeamos solo lo que nos importa: Estado de aprobación en Google
    return data.resources?.map((p: any) => ({
      id: p.productId,
      title: p.title,
      status: p.destinationStatuses?.[0]?.status || "PENDING", // 'approved', 'disapproved', o 'pending'
      issues: p.itemLevelIssues || []
    })) || [];

  } catch (error) {
    console.error("Error Merchant API:", error);
    return [];
  }
}