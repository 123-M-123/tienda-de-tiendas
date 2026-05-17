import { NextResponse } from 'next/server';
import { appendWebhookPayment } from '@/lib/masterSheet';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('🔔 WEBHOOK RECIBIDO:', body);

    // 1. Detectamos cualquier acción de pago (created o updated)
    if (body.type === 'payment' || body.action?.includes('payment')) {
      const paymentId = body.data?.id || body.id;

      // 2. Consultamos a Mercado Pago
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      const p = await mpRes.json();

      if (mpRes.ok) {
        // --- CASO REAL: El pago existe en Mercado Pago ---
        const vendedor = p.metadata?.vendedor || p.external_reference || "Vendedor Desconocido";
        const rowData = [
          vendedor,
          new Date(p.date_approved || p.date_created).toLocaleString('es-AR'),
          p.description || "Pedido Online",
          p.transaction_amount,
          p.status === 'approved' ? 'PAGADO' : p.status,
          paymentId.toString(),
          p.payment_method_id
        ];
        await appendWebhookPayment(rowData);
        console.log('✅ PAGO REAL REGISTRADO:', vendedor);
      } else {
        // --- CASO SIMULADOR: El pago no existe en MP, pero grabamos igual para probar ---
        console.warn('⚠️ Pago no encontrado en MP (Probablemente simulador). Grabando datos de prueba...');
        const testRow = [
          "test@tienda.com", 
          new Date().toLocaleString('es-AR'),
          "SIMULACIÓN MP",
          "1.00",
          "TEST",
          paymentId.toString(),
          "Webhoock Simulator"
        ];
        await appendWebhookPayment(testRow);
      }
    }

    return new NextResponse('OK', { status: 200 });

  } catch (error) {
    console.error('❌ ERROR WEBHOOK:', error);
    return new NextResponse('Error', { status: 500 });
  }
}