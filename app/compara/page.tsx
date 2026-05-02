"use client"

import Link from "next/link"
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react"

const Check = () => (
  <CheckCircle className="text-green-600 mx-auto" size={18} />
)

const Cross = () => (
  <XCircle className="text-red-500 mx-auto" size={18} />
)

export default function ComparacionSection() {
  return (
    <section
      id="compara"
      className="py-20 px-6 max-w-7xl mx-auto text-center"
    >
      {/* TITULO */}
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Comparación real
      </h2>

      <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
        No es opinión. Son costos, límites y condiciones reales del mercado.
      </p>

      {/* TABLA */}
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">Característica</th>
              <th className="p-4 text-center">Tienda de Tiendas</th>
              <th className="p-4 text-center">Shopify</th>
              <th className="p-4 text-center">Tienda Nube</th>
              <th className="p-4 text-center">Empretienda</th>
              <th className="p-4 text-center">MercadoLibre Shop</th>
              <th className="p-4 text-center">Canva</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr>
              <td className="p-4 text-left font-semibold">
                Dominio gratis (subdominio)
              </td>

              <td className="text-green-600 font-bold text-center">
                ✔ Incluido (vercel.app)
              </td>

              <td className="text-center">✔ (myshopify.com)</td>
              <td className="text-center">✔ (mitiendanube.com)</td>
              <td className="text-center">✔</td>
              <td className="text-center">✔</td>
              <td className="text-center">✔</td>
            </tr>

            <tr>
              <td className="p-4 text-left font-semibold">
                Plan gratuito
              </td>
              <td className="text-center"><Check /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Check /></td>
              <td className="text-center"><Check /></td>
              <td className="text-center"><Check /></td>
              <td className="text-center"><Check /></td>
            </tr>

            <tr>
              <td className="p-4 text-left font-semibold">
                Podés migrar / es tuya
              </td>
              <td className="text-center"><Check /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Cross /></td>
            </tr>

            <tr>
              <td className="p-4 text-left font-semibold">
                Costo mensual
              </td>
              <td className="font-bold text-green-600 text-center">
                Sin costo
              </td>
              <td className="text-center">~USD 39+</td>
              <td className="text-center">$5.000 - $30.000</td>
              <td className="text-center">$0 - $15.000</td>
              <td className="text-center">$0</td>
              <td className="text-center">$0 - Pro pago</td>
            </tr>

            <tr>
              <td className="p-4 text-left font-semibold">
                Comisión por venta
              </td>
              <td className="font-bold text-green-600 text-center">
                0%
              </td>
              <td className="text-center">2% + apps</td>
              <td className="text-center">1% - 2% + pagos</td>
              <td className="text-center">0% (pero limitado)</td>
              <td className="text-red-500 font-bold text-center">
                Hasta 17%
              </td>
              <td className="text-center"><Cross /></td>
            </tr>

            <tr>
              <td className="p-4 text-left font-semibold">
                Diseño profesional real
              </td>
              <td className="text-center"><Check /></td>
              <td className="text-center"><Check /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Cross /></td>
              <td className="text-center"><Cross /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MENSAJE */}
      <div className="mb-16 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">
          Podés pagar todos los meses… o resolverlo una vez.
        </h3>

        <p className="text-lg opacity-80">
          La mayoría de las plataformas viven de cobrarte por existir.
          Acá la lógica es otra: pagás una vez y la tienda es tuya.
        </p>
      </div>

      {/* CTA FINAL */}
      <div className="flex flex-col items-center gap-4">

        <Link
          href="/#contacto"
          className="bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold"
        >
          Empezar mi tienda
        </Link>

        <Link
          href="/clientes"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Ver clientes reales
        </Link>

      </div>
    </section>
  )
}