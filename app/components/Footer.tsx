"use client"

import Link from "next/link"
import { ArrowUpRight, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t mt-20">

      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">

        {/* IZQUIERDA */}
        <div className="max-w-md">
          <h3 className="text-xl font-bold mb-3">
            Tienda de Tiendas
          </h3>

          <p className="text-sm opacity-70 mb-4">
            Creamos tiendas online listas para vender.  
            Sin comisiones. Sin cuotas mensuales. Sin dependencia.
          </p>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
          >
            Empezar ahora
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* CENTRO */}
        <div className="flex flex-col gap-2 text-sm">
          <Link href="#beneficios" className="hover:opacity-70">
            Beneficios
          </Link>

          <Link href="#como-funciona" className="hover:opacity-70">
            Cómo funciona
          </Link>

          <Link href="#clientes" className="hover:opacity-70">
            Clientes
          </Link>

          <Link href="#comparacion" className="hover:opacity-70">
            Comparación
          </Link>
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
      <div className="text-center text-xs opacity-50 pb-6">
        © {new Date().getFullYear()} Tienda de Tiendas — Todos los derechos reservados
      </div>

    </footer>
  )
}