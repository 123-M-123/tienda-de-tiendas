"use client"

import Link from "next/link"
import { Palette, Unlock, Landmark, ArrowRight } from "lucide-react"

export default function BeneficiosSection() {
  return (
    <section
      id="beneficios"
      className="py-20 px-6 max-w-6xl mx-auto text-center"
    >

      {/* TITULO */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6">
        ¿Por qué elegir Tienda de Tiendas?
      </h1>

      <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
        No es solo una web. Es control, libertad y dejar de perder plata todos los meses.
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* PERFIL PIXEL */}
        <div className="border rounded-xl p-6 text-left hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={20} />
            <h2 className="font-bold text-lg">Perfil Pixel</h2>
          </div>

          <p className="text-sm leading-relaxed">
            Si estás dentro de este perfil necesitás un diseño 100% a medida,
            sin plantillas genéricas. Trabajás con asesoramiento real para
            mejorar imagen de marca, estética visual y presencia profesional.
          </p>
        </div>

        {/* PERFIL LIBRE */}
        <div className="border rounded-xl p-6 text-left hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Unlock size={20} />
            <h2 className="font-bold text-lg">Perfil Libre</h2>
          </div>

          <p className="text-sm leading-relaxed">
            Tu tienda es tuya. Se entrega lista para usar, con backup en la nube
            y sin atarte a plataformas. Podés migrarla, usar tu dominio y tener
            control total.
          </p>
        </div>

        {/* PERFIL ARGENTO */}
        <div className="border rounded-xl p-6 text-left hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Landmark size={20} />
            <h2 className="font-bold text-lg">Perfil Argento</h2>
          </div>

          <p className="text-sm leading-relaxed">
            Vendé sin comisiones abusivas. Cobrás directo por transferencia,
            alias o integraciones externas. Elegís cómo cobrar y cuánto pagar.
          </p>
        </div>

      </div>

      {/* CTA SIGUIENTE PAGE */}
      <div className="mt-14 flex justify-center">
        <Link
          href="/como-funciona"
          className="inline-flex items-center gap-2 border rounded-xl px-6 py-3 font-semibold hover:shadow-md transition"
        >
          Cómo funciona
          <ArrowRight size={18} />
        </Link>
      </div>

    </section>
  )
}