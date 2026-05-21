// lib/googleAuth.ts
import { GoogleAuth, OAuth2Client } from 'google-auth-library';

// Para Sheets y Drive - sigue usando Service Account (no tocar)
export async function getGoogleAccessToken() {
  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.readonly',
      ],
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();

    if (!tokenResponse.token) {
      throw new Error("No se pudo generar el token de acceso");
    }

    return tokenResponse.token;
  } catch (error) {
    console.error("Error en getGoogleAccessToken (Service Account):", error);
    throw error;
  }
}

// Para Analytics - usa OAuth con refresh token permanente
export async function getAnalyticsAccessToken() {
  try {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_ANALYTICS_CLIENT_ID,
      process.env.GOOGLE_ANALYTICS_CLIENT_SECRET,
      'http://localhost:3000/callback'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_ANALYTICS_REFRESH_TOKEN,
    });

    const tokenResponse = await oauth2Client.getAccessToken();

    if (!tokenResponse.token) {
      throw new Error("No se pudo generar el token de Analytics");
    }

    return tokenResponse.token;
  } catch (error) {
    console.error("Error en getAnalyticsAccessToken (OAuth):", error);
    throw error;
  }
}