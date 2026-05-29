import { auth } from "@/auth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";
import { getAnalyticsAccessToken } from "./googleAuth";

// 🚩 MAPEO DIRECTO POR IDs (CONEXIÓN ROBUSTA)
const propertyMapping: Record<string, string> = {
  "marcosmarti1980@gmail.com": "534648857",
  "marcosrenemarti@gmail.com": "534564663",
  "mguiyemo@gmail.com": "534564663",
  "marielabasualdo1985@gmail.com": "534733481",
  "mateolucamarti3072@gmail.com": "534733481",
  "axel2002@gmail.com": "534715172",
  "tallergraficobuongusto@gmail.com": "534715172",
  "elianamarti90@gmail.com": "534606659",
  "exequiel.devita@gmail.com": "534606659",
  "gla_142@hotmail.com": "537730087"
};

export async function getAnalyticsData(targetEmail?: string) {
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();
  if (!userEmail) return { rows: [] };

  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();
  const emailABuscar = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;
  
  // USAMOS EL ID DEL MAPA O EL DEL ADMIN SI NO EXISTE
  const propertyId = propertyMapping[emailABuscar] || propertyMapping[ADMIN_EMAIL];

  try {
    const token = await getAnalyticsAccessToken();
    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "activeUsers" }, { name: "screenPageViews" },
          { name: "userEngagementDuration" }, { name: "engagementRate" }
        ],
        dimensions: [ { name: "city" }, { name: "date" }, { name: "sessionDefaultChannelGroup" }, { name: "deviceCategory" } ],
      }),
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`Error GA4 (${propertyId}):`, await res.text());
      return { rows: [] };
    }
    return await res.json();
  } catch (error) {
    console.error("Error GA4 API Connection:", error);
    return { rows: [] };
  }
}