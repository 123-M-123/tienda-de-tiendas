// lib/googleAuth.ts
import { GoogleAuth } from 'google-auth-library';

export async function getGoogleAccessToken() {
  try {
    // 1. Cargamos las credenciales desde el .env
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Corregimos saltos de línea
      },
      // Scopes para Analytics y Sheets (los dos que usa tu proyecto)
      scopes: [
        'https://www.googleapis.com/auth/analytics.readonly',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // 2. Obtenemos el cliente y el token
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