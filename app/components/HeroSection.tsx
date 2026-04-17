import {
  Palette,
  Unlock,
  Banknote,
  XCircle,
  CheckCircle,
  Zap,
  BarChart3
} from "lucide-react"

export default function HeroSection() {
  return (
    <section 
    id="inicio"
    className="min-h-screen flex flex-col justify-center items-center text-center px-6">

      {/* TITULO */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-5xl">
        Creá tu tienda online simple, rápido y barato.
        <br />
        <span className="text-red-500">
          Sin ningún gasto fijo.
        </span>
      </h1>

      {/* SUB */}
      <p className="text-xl md:text-2xl font-semibold mb-4">
        Pagás una sola vez. La tienda es tuya. Punto.
      </p>

      <p className="text-lg max-w-2xl mb-10">
        La mayoría paga todos los meses por algo que nunca termina de ser suyo.
      </p>

      {/* PROBLEMA */}
      <div className="mb-12 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Si tu tienda no vende (o directamente no tenés tienda) es tu decisión.
        </h2>
        <p className="text-lg opacity-80">
          No es el producto. No es el precio. Es tu web.
        </p>
      </div>

      {/* PERFILES */}
      <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-5xl w-full">

        <div className="border rounded-xl p-5">
          <div className="flex justify-center mb-2">
            <Palette size={28} />
          </div>
          <h3 className="font-bold mb-2">Perfil Pixel</h3>
          <p className="text-sm">
            Diseño profesional que hace que tu marca parezca seria.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex justify-center mb-2">
            <Unlock size={28} />
          </div>
          <h3 className="font-bold mb-2">Perfil Libre</h3>
          <p className="text-sm">
            Código tuyo. Lo podés mover donde quieras.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex justify-center mb-2">
            <Banknote size={28} />
          </div>
          <h3 className="font-bold mb-2">Perfil Argento</h3>
          <p className="text-sm">
            Cobrás directo. Sin comisiones, sin intermediarios.
          </p>
        </div>

      </div>

      {/* COMPARACION */}
      <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl w-full">

        <div className="border rounded-xl p-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={22} className="text-red-500" />
            <h3 className="font-bold text-lg">Otras plataformas</h3>
          </div>

          <ul className="space-y-2 text-sm">
            <li>Pagos mensuales</li>
            <li>Comisiones por venta</li>
            <li>La tienda nunca es tuya</li>
          </ul>

          <p className="mt-4 text-sm opacity-70">
            Terminás pagando para siempre.
          </p>
        </div>

        <div className="border rounded-xl p-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={22} className="text-green-600" />
            <h3 className="font-bold text-lg">Tienda de Tiendas</h3>
          </div>

          <ul className="space-y-2 text-sm">
            <li>Un solo pago</li>
            <li>Sin comisiones</li>
            <li>La tienda es 100% tuya</li>
          </ul>

          <p className="mt-4 text-sm font-semibold">
            Es una inversión, no un gasto.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row gap-4">

        <a
          href="#contacto"
          className="bg-black text-white px-6 py-3 rounded-xl text-lg flex items-center gap-2 justify-center"
        >
          <Zap size={18} />
          Quiero mi tienda
        </a>

        <a
          href="/comparador/shopify-vs"
          className="border px-6 py-3 rounded-xl text-lg flex items-center gap-2 justify-center"
        >
          <BarChart3 size={18} />
          Ver comparación real
        </a>

      </div>

      <p className="mt-6 text-sm opacity-70">
        Opción rápida: tienda lista en 72hs.
      </p>

    </section>
  )
}