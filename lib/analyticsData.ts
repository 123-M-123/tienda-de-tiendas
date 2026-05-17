// lib/analyticsData.ts
import { auth } from "@/auth";
import { getGoogleAccessToken } from "./googleAuth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";

export async function getAnalyticsData(targetEmail?: string) {
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();
  if (!userEmail) return { rows: [] };

  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();
  
  // 1. Buscamos el ID de Propiedad de GA4
  // Si es admin y no eligió a nadie, usamos un ID por defecto (el tuyo)
  // Si eligió a alguien o es un cliente, usamos el gaId del diccionario CLIENTES
  let propertyId = "534648857"; // Tu ID de Admin por defecto

  const emailABuscar = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;
  
  if (CLIENTES[emailABuscar]) {
    propertyId = CLIENTES[emailABuscar].gaId;
  }

  try {
    // 2. Obtenemos el token (Ahora viene de la Service Account vía googleAuth.ts)
    const token = await getGoogleAccessToken();
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

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error de Google Analytics API:", errorData);
      return { rows: [] };
    }

    return await res.json();
  } catch (error) {
    console.error("Error GA4 API:", error);
    return { rows: [] };
  }
}