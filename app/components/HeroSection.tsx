import {
  Palette,
  Unlock,
  Banknote,
  XCircle,
  CheckCircle,
} from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-16"
    >
      {/* TITULO */}
      <h1 className="text-4xl md:text-6xl font-bold mb-5 max-w-5xl leading-tight">
        Tu tienda online propia,
        <br />
        lista para vender.
      </h1>

      {/* SUB PRINCIPAL */}
      <p className="text-xl md:text-2xl font-semibold mb-3">
        Sin cuotas mensuales. Sin depender de plataformas.
      </p>

      <p className="text-lg max-w-2xl mb-10 opacity-80">
        Invertís una vez y la tienda queda en tus manos.
      </p>

      {/* PERFILES */}
      <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-5xl w-full">

        <div className="border rounded-xl p-5">
          <div className="flex justify-center mb-2">
            <Palette size={28} />
          </div>

          <h2 className="font-bold mb-2">
            Perfil Pixel
          </h2>

          <p className="text-sm">
            Diseño profesional para que tu marca transmita confianza real.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex justify-center mb-2">
            <Unlock size={28} />
          </div>

          <h2 className="font-bold mb-2">
            Perfil Libre
          </h2>

          <p className="text-sm">
            Código propio y libertad para migrar donde quieras.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex justify-center mb-2">
            <Banknote size={28} />
          </div>

          <h2 className="font-bold mb-2">
            Perfil Argento
          </h2>

          <p className="text-sm">
            Cobrás directo. Sin comisiones ni intermediarios.
          </p>
        </div>

      </div>

      {/* COMPARACION */}
      <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-5xl w-full">

        {/* POSITIVO PRIMERO */}
        <div className="border rounded-xl p-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle
              size={22}
              className="text-green-600"
            />

            <h2 className="font-bold text-lg">
              Tienda de Tiendas
            </h2>
          </div>

          <ul className="space-y-2 text-sm">
            <li>Un solo pago inicial</li>
            <li>Sin cuotas mensuales</li>
            <li>La tienda es 100% tuya</li>
          </ul>

          <p className="mt-4 text-sm font-semibold">
            Es una inversión, no un gasto.
          </p>
        </div>

        {/* NEGATIVO DESPUES */}
        <div className="border rounded-xl p-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <XCircle
              size={22}
              className="text-red-500"
            />

            <h2 className="font-bold text-lg">
              Otras plataformas
            </h2>
          </div>

          <ul className="space-y-2 text-sm">
            <li>Pagos todos los meses</li>
            <li>Comisiones por venta</li>
            <li>Nunca termina de ser tuya</li>
          </ul>

          <p className="mt-4 text-sm opacity-70">
            Terminás pagando por seguir usando algo prestado.
          </p>
        </div>

      </div>

      {/* CTA SIMPLE */}
      <a
        href="#contacto"
        className="bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition"
      >
        Empezar ahora
      </a>

      <p className="mt-5 text-sm opacity-70">
        Opción rápida disponible: tienda lista en 72hs.
      </p>
    </section>
  )
}