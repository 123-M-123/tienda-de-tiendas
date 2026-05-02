"use client"

import Link from "next/link"
import {
  ClipboardList,
  LayoutTemplate,
  Rocket,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

export default function ComoFuncionaSection() {
  return (
    <section
      id="como-funciona"
      className="py-20 px-6 max-w-6xl mx-auto text-center"
    >
      {/* HEADER */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6">
        Cómo funciona
      </h1>

      <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
        No es magia. Es proceso, criterio y decisiones bien tomadas desde el día uno.
      </p>

      {/* PASOS */}
      <div className="grid md:grid-cols-4 gap-6 mb-16 text-left">

        {/* PASO 1 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList size={20} />
            <h2 className="font-bold">1. Formulario inicial</h2>
          </div>

          <p className="text-sm leading-relaxed">
            Arrancamos entendiendo tu negocio: contenido, productos,
            objetivos, estructura y punto de partida.
          </p>
        </div>

        {/* PASO 2 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <LayoutTemplate size={20} />
            <h2 className="font-bold">2. Diseño estratégico</h2>
          </div>

          <p className="text-sm leading-relaxed">
            Se define estructura, estética y experiencia de usuario.
            Nada genérico. Todo pensado para vender mejor.
          </p>
        </div>

        {/* PASO 3 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Rocket size={20} />
            <h2 className="font-bold">3. Desarrollo</h2>
          </div>

          <p className="text-sm leading-relaxed">
            Se construye tu tienda en código real, optimizada,
            rápida y lista para crecer.
          </p>
        </div>

        {/* PASO 4 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} />
            <h2 className="font-bold">4. Publicación</h2>
          </div>

          <p className="text-sm leading-relaxed">
            Se prueba, se publica y queda lista para operar
            con control total desde el inicio.
          </p>
        </div>

      </div>

      {/* BLOQUE PERFILES */}
      <div className="border rounded-2xl p-8 text-left mb-16">
        <h2 className="text-xl font-bold mb-4">
          Etapas de desarrollo según perfil
        </h2>

        <p className="text-sm mb-6 max-w-3xl">
          Cada proyecto necesita tiempos y profundidad distintos.
          Por eso trabajamos con niveles de desarrollo según objetivo y presupuesto.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-sm">

          <div className="border rounded-xl p-4">
            <h3 className="font-bold mb-2">Perfil Pixel</h3>
            <p>
              Proceso más completo, ideal para identidad visual fuerte,
              personalización avanzada y marca diferencial.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h3 className="font-bold mb-2">Perfil Libre</h3>
            <p>
              Balance entre personalización, velocidad de entrega
              y autonomía futura.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h3 className="font-bold mb-2">Perfil Argento</h3>
            <p>
              Enfoque práctico para salir a vender rápido,
              cuidando inversión inicial.
            </p>
          </div>

        </div>

        <p className="text-sm mt-6 max-w-3xl">
          Cada propuesta se adapta a lo que realmente necesitás.
          No usamos paquetes rígidos ni fórmulas cerradas.
        </p>
      </div>

      {/* NAVEGACION */}
      <div className="flex justify-between items-center gap-4 flex-wrap">

        <Link
          href="/beneficios"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Beneficios
        </Link>

        <Link
          href="/clientes"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          Nuestros clientes
          <ArrowRight size={16} />
        </Link>

      </div>
    </section>
  )
}