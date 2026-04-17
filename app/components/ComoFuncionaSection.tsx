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
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Cómo funciona
      </h2>

      <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
        No es magia. Es proceso, criterio y decisiones bien tomadas desde el día uno.
      </p>

      {/* PASOS */}
      <div className="grid md:grid-cols-4 gap-6 mb-16 text-left">

        {/* PASO 1 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList size={20} />
            <h3 className="font-bold">1. Formulario inicial</h3>
          </div>

          <p className="text-sm leading-relaxed">
            Arrancamos con el formulario para entender de dónde partimos: 
            contenido, imágenes, datos, estructura y objetivos. 
            Sin eso, cualquier tienda está condenada desde el inicio.
          </p>
        </div>

        {/* PASO 2 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <LayoutTemplate size={20} />
            <h3 className="font-bold">2. Diseño estratégico</h3>
          </div>

          <p className="text-sm leading-relaxed">
            Se define estructura, estética y experiencia de usuario. 
            Nada de plantillas genéricas: cada decisión tiene un porqué.
          </p>
        </div>

        {/* PASO 3 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Rocket size={20} />
            <h3 className="font-bold">3. Desarrollo</h3>
          </div>

          <p className="text-sm leading-relaxed">
            Se construye la tienda en código real, optimizada y lista para escalar. 
            Sin plataformas que limiten ni te aten.
          </p>
        </div>

        {/* PASO 4 */}
        <div className="border rounded-xl p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} />
            <h3 className="font-bold">4. Publicación</h3>
          </div>

          <p className="text-sm leading-relaxed">
            Se sube, se prueba y queda lista para vender. 
            Vos controlás todo desde el primer día.
          </p>
        </div>

      </div>

      {/* BLOQUE PERFILES + ETAPAS */}
      <div className="border rounded-2xl p-8 text-left mb-16">
        <h3 className="text-xl font-bold mb-4">
          Etapas de desarrollo según perfil
        </h3>

        <p className="text-sm mb-6 max-w-3xl">
          Cada proyecto pasa por distintas versiones y avances. No todos necesitan lo mismo,
          pero todos reciben un proceso real de evolución.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-sm">

          <div className="border rounded-xl p-4">
            <h4 className="font-bold mb-2">Perfil Pixel</h4>
            <p>
              Incluye de 8 a 10 niveles/etapas de versiones/avances de diseño y desarrollo web.
              Ideal para lograr una identidad visual sólida y diferencial.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h4 className="font-bold mb-2">Perfil Libre</h4>
            <p>
              Incluye de 5 a 7 niveles/etapas de versiones de avance de diseño.
              Balance entre personalización y velocidad de entrega.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h4 className="font-bold mb-2">Perfil Argento</h4>
            <p>
              Incluye de 3 a 5 niveles/etapas de versiones de avance de diseño.
              Enfoque práctico para salir a vender rápido sin gastar de más.
            </p>
          </div>

        </div>

        {/* MENSAJE CLAVE */}
        <p className="text-sm mt-6 max-w-3xl">
          No sos un número ni una etiqueta. El presupuesto no se define a rajatabla:
          se ajusta según un análisis real de lo que necesitás, dentro de estos perfiles.
        </p>
      </div>

      {/* NAVEGACION */}
      <div className="flex justify-between items-center">

        <Link
          href="#beneficios"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Beneficios
        </Link>

        <Link
          href="#clientes"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          Nuestros clientes
          <ArrowRight size={16} />
        </Link>

      </div>
    </section>
  )
}