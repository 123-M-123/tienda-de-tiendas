import { NextResponse } from 'next/server';
import { appendWebhookPayment } from '@/lib/masterSheet';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('data.id') || searchParams.get('id');

    // Si no hay ID, puede ser una validación inicial de MP
    if (!paymentId) {
      return new NextResponse('OK', { status: 200 });
    }

    // 1. Consultamos a Mercado Pago
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    });
    
    if (!mpRes.ok) {
      console.warn('⚠️ Pago no encontrado en MP. ID:', paymentId);
      return new NextResponse('Not Found', { status: 200 });
    }

    const p = await mpRes.json();

    // Solo grabamos si está aprobado
    if (p.status === 'approved') {
      const meta = p.metadata || {};
      
      // 🛡️ Armamos la fila de 10 columnas (A a J)
      const rowData = [
        meta.vendedor_email || p.external_reference || "S/D", // A: Vendedor
        new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }), // B: Fecha
        p.description || "Pedido Online", // C: Productos
        p.transaction_amount,            // D: Precio
        'PAGADO (MP)',                   // E: Estado
        paymentId.toString(),            // F: ID Pago
        `Método: ${p.payment_method_id}`,// G: Notas
        meta.cliente_nombre || "S/D",    // H: [NUEVO] Nombre
        meta.cliente_whatsapp || "S/D",  // I: [NUEVO] WhatsApp
        meta.punto_entrega || "S/D"      // J: [NUEVO] Entrega
      ];

      await appendWebhookPayment(rowData);
      console.log('✅ PAGO REAL REGISTRADO EN CENTRAL:', rowData[0]);
    }

    return new NextResponse('OK', { status: 200 });

  } catch (error: any) {
    console.error('❌ ERROR WEBHOOK CENTRAL:', error.message);
    return new NextResponse('Error', { status: 200 }); // Siempre 200 para MP
  }
}