"use client"

import {
  Store,
  Zap,
  DollarSign,
  Palette,
  Code,
  Flag,
  X,
  Check
} from "lucide-react"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

      {/* TITULO */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-5xl">
        Creá tu tienda online fácil, rápido y barato.
        <br />
        <span className="text-red-600">
          Sin ningún gasto fijo.
        </span>
      </h1>

      <p className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
        <DollarSign size={22} />
        Pagás una sola vez. Vendés sin comisiones para siempre.
      </p>

      <p className="text-lg max-w-2xl mb-10 flex items-center gap-2 justify-center">
        <Zap size={20} />
        Tené tu tienda lista en pocos días (opción express 72hs).
      </p>

      {/* PERFILES */}
      <div className="grid md:grid-cols-3 gap-4 mb-16 max-w-5xl w-full">

        <div className="border rounded-xl p-5">
          <h3 className="font-bold mb-2 flex items-center gap-2 justify-center">
            <Palette size={18} />
            Perfil Pixel
          </h3>
          <p className="text-sm">
            Web visual, enfocada en diseño y presencia profesional.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold mb-2 flex items-center gap-2 justify-center">
            <Code size={18} />
            Perfil Libre
          </h3>
          <p className="text-sm">
            Tu tienda en código. La podés migrar donde quieras.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold mb-2 flex items-center gap-2 justify-center">
            <Flag size={18} />
            Perfil Argento
          </h3>
          <p className="text-sm">
            Cobrás directo. Sin comisiones ni intermediarios.
          </p>
        </div>

      </div>

      {/* BLOQUE AGRESIVO */}
      <div className="mb-16 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Tu tienda no vende. Y probablemente es tu culpa.
        </h2>

        <p className="text-lg opacity-80">
          No es el producto. No es el precio. Es tu web.
        </p>
      </div>

      {/* COMPARACIÓN */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full mb-12">

        <div className="border rounded-xl p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2 justify-center">
            <X size={18} className="text-red-500" />
            Otras plataformas
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Pagos mensuales</li>
            <li>Comisiones por venta</li>
            <li>La tienda no es tuya</li>
            <li>Dependés de la plataforma</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2 justify-center">
            <Check size={18} className="text-green-600" />
            Tienda de Tiendas
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Un solo pago</li>
            <li>Sin comisiones</li>
            <li>La tienda es tuya</li>
            <li>Total control</li>
          </ul>
        </div>

      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <a
          href="#contacto"
          className="bg-black text-white px-6 py-3 rounded-xl text-lg flex items-center gap-2 justify-center"
        >
          <Store size={18} />
          Quiero mi tienda
        </a>

        <a
          href="/comparador/shopify-vs"
          className="border px-6 py-3 rounded-xl text-lg"
        >
          Ver comparación real
        </a>
      </div>

      <p className="mt-2 text-sm opacity-70">
        Opción rápida: tienda lista en 72hs.
      </p>

    </section>
  )
}