"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-white">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 items-center">

        {/* IZQUIERDA */}
        <div className="max-w-md">
          <h3 className="text-xl font-bold mb-3">
            Tienda de Tiendas
          </h3>

          <p className="text-sm opacity-70 mb-5 leading-relaxed">
            Creamos tiendas online listas para vender.
            Sin comisiones. Sin cuotas mensuales.
            Sin dependencia.
          </p>

          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            Empezar ahora
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* CENTRO + LOGO */}
        <div className="flex items-center justify-center gap-8">

          {/* LINKS */}
          <div className="flex flex-col gap-2 text-sm">

            <Link href="/" className="hover:opacity-70">
              Inicio
            </Link>

            <Link href="/beneficios" className="hover:opacity-70">
              Beneficios
            </Link>

            <Link href="/como-funciona" className="hover:opacity-70">
              Cómo funciona
            </Link>

            <Link href="/clientes" className="hover:opacity-70">
              Clientes
            </Link>

            <Link href="/compara" className="hover:opacity-70">
              Comparación
            </Link>

            <Link href="/panel" className="hover:opacity-70">
              Panel cliente
            </Link>

          </div>

          {/* IMAGEN COSTADO */}
          <Image
            src="/favicon.png"
            alt="Tienda de Tiendas"
            width={140}
            height={140}
            className="w-27.5 h-auto object-contain shrink-0"
          />

        </div>

        {/* DERECHA */}
        <div className="flex flex-col gap-3 text-sm">

          <a
            href="https://instagram.com"
            target="_blank"
            className="flex items-center gap-2 hover:opacity-70"
          >
            <Instagram size={16} />
            Instagram
          </a>

          <a
            href="https://wa.me/5491153778475"
            target="_blank"
            className="flex items-center gap-2 hover:opacity-70"
          >
            WhatsApp
          </a>

          <p className="text-xs opacity-50 mt-2">
            Respuesta rápida: dentro de 24hs
          </p>

        </div>

      </div>

      {/* ABAJO */}
      <div className="text-center text-xs opacity-50 pb-6 px-4">
        © {new Date().getFullYear()} Tienda de Tiendas — Todos los derechos reservados
      </div>

    </footer>
  )
}