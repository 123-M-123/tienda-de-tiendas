import { NextResponse } from 'next/server';
import { appendWebhookPayment } from '@/lib/masterSheet';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('🔔 WEBHOOK RECIBIDO EN TdeT:', body);

    // Si MP avisa que hubo un pago:
    if (body.type === 'payment' || body.action === 'payment.created') {
      const paymentId = body.data?.id || body.resource?.split('/').pop();

      // 1. Le preguntamos a MP los detalles de ese pago
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      
      const p = await mpRes.json();

      if (mpRes.ok) {
        // 2. Extraemos el vendedor que inyectamos en la metadata desde Glamour
        // Si no viene en metadata, intentamos external_reference
        const vendedor = p.metadata?.vendedor || p.external_reference || "Vendedor Desconocido";
        
        // 3. Formateamos la fila para tu Maestra (7 columnas)
        const rowData = [
          vendedor,                             // Col A: Vendedor
          new Date(p.date_approved || p.date_created).toLocaleString('es-AR'), // Col B: Fecha
          p.description || "Pedido Online",     // Col C: Productos
          p.transaction_amount,                 // Col D: Precio
          p.status === 'approved' ? 'PAGADO' : p.status, // Col E: Estado
          paymentId.toString(),                 // Col F: Comprobante/ID
          p.payment_method_id                   // Col G: Notas/Método
        ];

        // 4. Guardamos en la Maestra automáticamente
        await appendWebhookPayment(rowData);
        console.log('✅ PAGO REGISTRADO EN MAESTRA:', vendedor);
      }
    }

    // Respondemos 200 rápido a MP para que no reintente
    return new NextResponse('OK', { status: 200 });

  } catch (error) {
    console.error('❌ ERROR EN WEBHOOK CENTRAL:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}