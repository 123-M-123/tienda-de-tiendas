import { NextResponse } from 'next/server';
import { appendWebhookPayment } from '@/lib/masterSheet';

export async function POST(req: Request) {
  try {
    // 🛡️ 1. Capturamos el ID del pago
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('data.id') || searchParams.get('id');

    // Si MP hace una validación de URL sin ID, respondemos OK
    if (!paymentId) {
      console.log('🔎 Webhook: Validación de URL recibida.');
      return new NextResponse('OK', { status: 200 });
    }

    console.log('🔔 WEBHOOK RECIBIDO - ID:', paymentId);

    // 🛡️ 2. Intentamos consultar a Mercado Pago (Caso Real)
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    });
    
    let rowData: any[] = [];
    const fecha = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

    if (mpRes.ok) {
      // ✅ CASO REAL: El pago existe en Mercado Pago
      const p = await mpRes.json();
      
      // Solo grabamos si está aprobado (o según tu criterio)
      if (p.status === 'approved') {
        const meta = p.metadata || {};
        rowData = [
          meta.vendedor_email || p.external_reference || "S/D", // A: Vendedor
          fecha,                                              // B: Fecha
          p.description || "Pedido Online",                   // C: Productos
          p.transaction_amount,                               // D: Precio
          'PAGADO (MP)',                                      // E: Estado
          paymentId.toString(),                               // F: ID Pago
          `Método: ${p.payment_method_id}`,                   // G: Notas
          meta.cliente_nombre || "S/D",                       // H: Nombre
          meta.cliente_whatsapp || "S/D",                     // I: WhatsApp
          meta.punto_entrega || "S/D"                         // J: Entrega
        ];
        console.log('✅ PAGO REAL APROBADO REGISTRADO');
      } else {
        console.log('⚠️ Pago recibido pero no aprobado. Estado:', p.status);
        return new NextResponse('OK', { status: 200 });
      }
    } else {
      // 🧪 CASO SIMULADOR: Mercado Pago no reconoce el ID (porque es de prueba)
      console.warn('⚠️ Pago no encontrado en MP (Probablemente simulador). Grabando TEST...');
      rowData = [
        "test@tienda.com",           // A
        fecha,                       // B
        "SIMULACIÓN WEBHOOK",        // C
        "1.00",                      // D
        "TEST_OK",                   // E
        paymentId.toString(),        // F
        "Simulador IPN / Webhook",   // G
        "Usuario Prueba",            // H
        "1122334455",                // I
        "Dirección de Prueba"        // J
      ];
    }

    // 🛡️ 3. Guardar en la Planilla Maestra (Sea Real o Test)
    if (rowData.length > 0) {
      await appendWebhookPayment(rowData);
    }

    return new NextResponse('OK', { status: 200 });

  } catch (error: any) {
    console.error('❌ ERROR WEBHOOK CENTRAL:', error.message);
    // Respondemos 200 igual para que Mercado Pago deje de reintentar si hay un error de código
    return new NextResponse('OK', { status: 200 });
  }
}