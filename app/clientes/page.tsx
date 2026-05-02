"use client"

import Link from "next/link"
import Image from "next/image"
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

          <p className="text-sm mb-5">
            Evolución completa de diseño con múltiples iteraciones hasta lograr una identidad sólida. El proyecto quiere comunicar un mensaje de producción con calidez humana.
          </p>

          <div className="flex gap-2">
            <div className="w-[26%]">
              <Image
                src="/pantallas/meraki-m.jpg"
                alt="Meraki mobile"
                width={220}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>

            <div className="w-[74%]">
              <Image
                src="/pantallas/meraki-d.jpg"
                alt="Meraki desktop"
                width={900}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>
          </div>
        </div>

        {/* TECNO */}
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

          <p className="text-sm mb-5">
            Desarrollo enfocado en funcionalidad y conversión, las mejoras progresivas hacen foco en la necesidad principal de múltiples medios de pago.
          </p>

          <div className="flex gap-2">
            <div className="w-[26%]">
              <Image
                src="/pantallas/tecno-m.jpg"
                alt="Tecno mobile"
                width={220}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>

            <div className="w-[74%]">
              <Image
                src="/pantallas/tecno-d.jpg"
                alt="Tecno desktop"
                width={900}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>
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

          <p className="text-sm mb-5">
            Proyecto express con tiempos ajustados. Evolución rápida y directa a producción. Casi 300 productos cargados sin problemas de visualización.
          </p>

          <div className="flex gap-2">
            <div className="w-[26%]">
              <Image
                src="/pantallas/mb-m.jpg"
                alt="MB mobile"
                width={220}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>

            <div className="w-[74%]">
              <Image
                src="/pantallas/mb-d.jpg"
                alt="MB desktop"
                width={900}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>
          </div>
        </div>

        {/* CAMPITO */}
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

          <p className="text-sm mb-5">
            Diseño en progreso. Centrado más en lo visual que en lo comercial. Construcción por etapas con foco en claridad y crecimiento.
          </p>

          <div className="flex gap-2">
            <div className="w-[26%]">
              <Image
                src="/pantallas/campito-m.jpg"
                alt="Campito mobile"
                width={220}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>

            <div className="w-[74%]">
              <Image
                src="/pantallas/campito-d.jpg"
                alt="Campito desktop"
                width={900}
                height={500}
                className="w-full h-auto rounded-md border"
              />
            </div>
          </div>
        </div>

      </div>

      {/* CTA FINAL */}
      <div className="mt-16 border rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Layers />
          <h3 className="text-xl font-bold">
            Acá puede estar tu web
          </h3>
        </div>

        <p className="text-sm max-w-2xl mx-auto">
          Tu negocio puede ser el próximo caso real publicado acá.
          Diseñamos una tienda profesional, propia y preparada para vender
          sin depender de plataformas externas.
        </p>
      </div>

      {/* NAV */}
      <div className="flex justify-between items-center mt-12 gap-4 flex-wrap">

        <Link
          href="/como-funciona"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Cómo funciona
        </Link>

        <Link
          href="/compara"
          className="flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          Comparación
          <ArrowRight size={16} />
        </Link>

      </div>
    </section>
  )
}