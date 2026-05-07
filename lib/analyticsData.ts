import { auth } from "@/auth";
import { getGoogleAccessToken } from "./googleAuth";
import { ADMIN_EMAIL, CLIENTES } from "./clientes";

export async function getAnalyticsData(targetEmail?: string) {
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();
  if (!userEmail) return { rows: [] };

  const isAdmin = userEmail === ADMIN_EMAIL.trim().toLowerCase();
  let propertyId = process.env.GA4_PROPERTY_ID; 

  const emailABuscar = (isAdmin && targetEmail) ? targetEmail.trim().toLowerCase() : userEmail;
  if (CLIENTES[emailABuscar]) {
    propertyId = CLIENTES[emailABuscar].gaId;
  }

  try {
    const token = await getGoogleAccessToken();
    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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

    return await res.json();
  } catch (error) {
    console.error("Error GA4 API:", error);
    return { rows: [] };
  }
}