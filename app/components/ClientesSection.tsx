"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
} from "lucide-react"

export default function ClientesSection() {
  return (
    <section
      id="clientes"
      className="py-20 px-6 max-w-6xl mx-auto text-center"
    >
      {/* HEADER */}
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Nuestros clientes
      </h2>

      <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
        No es teoría. Son tiendas reales, con evolución real. 
        Podés ver cada etapa, cada decisión y cada mejora.
        Estas son las famosas versiones/avances de diseño que se denominan v(n)
      </p>

      {/* GRID CLIENTES */}
      <div className="grid md:grid-cols-2 gap-8 text-left">

        {/* MERAKI */}
        <div className="border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Meraki Biju</h3>
            <a
              href="https://meraki-biju.vercel.app"
              target="_blank"
              className="flex items-center gap-1 text-sm underline"
            >
              Ver tienda <ExternalLink size={14} />
            </a>
          </div>

          <p className="text-sm mb-4">
            Evolución completa de diseño con múltiples iteraciones hasta lograr una identidad sólida. El proyecto quiere comunicar un mensaje de producción con calidez humana
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <a href="https://meraki-git-v1-t-de-t.vercel.app" target="_blank">Versión 1</a>
            <a href="https://meraki-git-v2-t-de-t.vercel.app" target="_blank">Versión 2</a>
            <a href="https://meraki-git-v3-t-de-t.vercel.app" target="_blank">Versión 3</a>
            <a href="https://meraki-git-v4-t-de-t.vercel.app" target="_blank">Versión 4</a>
            <a href="https://meraki-git-v5-t-de-t.vercel.app" target="_blank">Versión 5</a>
          </div>
        </div>

        {/* TECNO EG */}
        <div className="border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Tecno EG</h3>
            <a
              href="https://tecno-eg.vercel.app"
              target="_blank"
              className="flex items-center gap-1 text-sm underline"
            >
              Ver tienda <ExternalLink size={14} />
            </a>
          </div>

          <p className="text-sm mb-4">
            Desarrollo enfocado en funcionalidad y conversión, las mejoras progresivas hacen foco en la necesidad principal de una multiplicidad de opciones de medios de pago.
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <a href="https://tecno-eg-git-v1-t-de-t.vercel.app" target="_blank">Versión 1</a>
            <a href="https://tecno-eg-git-v2-t-de-t.vercel.app" target="_blank">Versión 2</a>
            <a href="https://tecno-eg-git-v3-t-de-t.vercel.app" target="_blank">Versión 3</a>
            <a href="https://tecno-eg-git-v4-t-de-t.vercel.app" target="_blank">Versión 4</a>
            <a href="https://tecno-eg-git-v5-t-de-t.vercel.app" target="_blank">Versión 5</a>
          </div>
        </div>

        {/* MB COMPRAS */}
        <div className="border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">MB Compras</h3>
            <a
              href="https://mb-compras.vercel.app"
              target="_blank"
              className="flex items-center gap-1 text-sm underline"
            >
              Ver tienda <ExternalLink size={14} />
            </a>
          </div>

          <p className="text-sm mb-4">
            Proyecto express con tiempos ajustados. Evolución rápida y directa a producción. Casi 300 Productos cargados, sin problemas de visualizacion.
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <a href="https://mb-compras-git-v1-t-de-t.vercel.app" target="_blank">Versión 1</a>
            <a href="https://mb-compras-git-v2-t-de-t.vercel.app" target="_blank">Versión 2</a>
          </div>
        </div>

        {/* GRANJA */}
        <div className="border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Granja El Campito</h3>
            <a
              href="https://granja-el-campito.vercel.app"
              target="_blank"
              className="flex items-center gap-1 text-sm underline"
            >
              Ver tienda <ExternalLink size={14} />
            </a>
          </div>

          <p className="text-sm mb-4">
            Diseño en progreso. Centrado mas en lo visual que en lo comercial..Construcción por etapas con foco en claridad y crecimiento.
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <a href="https://granja-el-campito-git-v1-t-de-t.vercel.app" target="_blank">Versión 1</a>
            <a href="https://granja-el-campito-git-v2-t-de-t.vercel.app" target="_blank">Versión 2</a>
            <a href="https://granja-el-campito-git-v3-t-de-t.vercel.app" target="_blank">Versión 3</a>
          </div>
        </div>

      </div>

      {/* BLOQUE AGRESIVO */}
      <div className="mt-16 border rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Layers />
          <h3 className="text-xl font-bold">
            Esto no es una web. Es un proceso.
          </h3>
        </div>

        <p className="text-sm max-w-2xl mx-auto">
          Cada cliente pasa por versiones reales, visibles y medibles. 
          No hay humo, no hay promesas vacías. Podés entrar a cada etapa y ver exactamente cómo evoluciona una tienda hasta que empieza a vender.
        </p>
      </div>

      {/* NAV */}
      <div className="flex justify-between items-center mt-12">

        <Link
          href="#como-funciona"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Cómo funciona
        </Link>

        <Link
          href="#comparacion"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          Comparación
          <ArrowRight size={16} />
        </Link>

      </div>
    </section>
  )
}