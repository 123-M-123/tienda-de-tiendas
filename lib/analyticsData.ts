import { auth } from "@/auth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";
import { getAnalyticsAccessToken } from "./googleAuth";

export async function getAnalyticsData(targetEmail?: string) {
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();
  if (!userEmail) return { rows: [] };

  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();
  
  // LOGICA DE PROPIEDAD ROBUSTA
  let propertyId = "534648857"; // Tu ID de Admin por defecto

  // Limpiamos el email que viene por parámetro (vendedor)
  const emailABuscar = (isAdmin && targetEmail) 
    ? decodeURIComponent(targetEmail).trim().toLowerCase() 
    : userEmail;
  
  if (CLIENTES[emailABuscar]) {
    propertyId = CLIENTES[emailABuscar].gaId;
    console.log(`Cargando métricas para: ${emailABuscar} (GA: ${propertyId})`);
  } else {
    console.warn(`Email no encontrado en diccionario, usando default: ${emailABuscar}`);
  }

  try {
    const token = await getAnalyticsAccessToken();
    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

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
          { name: "screenPageViews" },
          { name: "userEngagementDuration" },
          { name: "engagementRate" }
        ],
        dimensions: [
          { name: "city" }, 
          { name: "date" },
          { name: "sessionDefaultChannelGroup" },
          { name: "deviceCategory" }
        ],
      }),
      cache: 'no-store'
    });

    if (!res.ok) return { rows: [] };
    return await res.json();
  } catch (error) {
    console.error("Error GA4 API:", error);
    return { rows: [] };
  }
}