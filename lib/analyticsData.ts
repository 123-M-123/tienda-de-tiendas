import { auth } from "@/auth";
import { getGoogleAccessToken } from "./googleAuth"; // <-- Esto arregla la línea roja

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

export async function getAnalyticsData(targetEmail?: string) {
  const session = await auth();
  const userEmail = session?.user?.email;
  const isAdmin = userEmail === "marcosmarti1980@gmail.com";

  // Usamos el mail del selector si es admin, sino el del logueado
  const emailAFiltrar = (isAdmin && targetEmail) ? targetEmail : userEmail;

  // Filtro para que el cliente solo vea las visitas a su carpeta/tienda
  const storeFilter = isAdmin && !targetEmail ? null : {
    fieldName: "pagePath",
    stringFilter: { 
      matchType: "CONTAINS", 
      value: emailAFiltrar?.split('@')[0] // Filtra por el nombre antes del @ (ej: 'meraki')
    } 
  };

  const token = await getGoogleAccessToken(); // <-- Función arreglada

  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      dimensions: [{ name: "city" }, { name: "date" }, { name: "pageTitle" }], // Agregamos pageTitle para el "Más vistos"
      dimensionFilter: storeFilter ? { filter: storeFilter } : undefined
    })
  });

  return await res.json();
}