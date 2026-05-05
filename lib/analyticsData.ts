import { auth } from "@/auth";
import { getGoogleAccessToken } from "./googleAuth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";

export async function getAnalyticsData(targetEmail?: string) {
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();
  
  if (!userEmail) return { rows: [] };

  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();

  // 1. DETERMINAR QUÉ ID DE PROPIEDAD USAR
  // Por defecto empezamos con la del Admin (Tienda de Tiendas)
  let propertyId = process.env.GA4_PROPERTY_ID; 

  // Si sos Admin y elegiste a alguien, o si sos un cliente común, buscamos en el diccionario
  const emailABuscar = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;
  
  if (CLIENTES[emailABuscar]) {
    propertyId = CLIENTES[emailABuscar].gaId;
  }

  try {
    const token = await getGoogleAccessToken();
    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

    console.log(`>>>> [GA4 DEBUG] Intentando leer ID: ${propertyId} para el usuario: ${emailABuscar}`);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "activeUsers" }, 
          { name: "screenPageViews" }
        ],
        dimensions: [
          { name: "city" }, 
          { name: "date" }
        ],
      }),
      cache: 'no-store'
    });

    const data = await res.json();

    // --- ESCANER DE ERRORES PARA VERCEL LOGS ---
    if (!res.ok) {
      console.error("❌ ERROR GA4 API:", JSON.stringify(data, null, 2));
      return { rows: [] };
    }

    if (!data.rows || data.rows.length === 0) {
      console.log(`⚠️ GA4 AVISO: La API respondió OK pero no hay datos para el ID ${propertyId} en los últimos 30 días.`);
    } else {
      console.log(`✅ GA4 ÉXITO: Se recibieron ${data.rows.length} filas de datos.`);
    }
    // --------------------------------------------

    return data;

  } catch (error) {
    console.error("❌ ERROR CRÍTICO EN ANALYTICS DATA:", error);
    return { rows: [] };
  }
}