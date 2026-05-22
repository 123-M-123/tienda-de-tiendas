import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function appendWebhookPayment(row: any[]) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "'webhoock MP'!A:J", // 👈 Aumentado a J para los nuevos datos
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error escribiendo en Maestra:', error);
    throw error;
  }
}