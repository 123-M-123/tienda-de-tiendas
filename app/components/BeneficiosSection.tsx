"use client"

import { Palette, Unlock, Landmark } from "lucide-react"

export default function BeneficiosSection() {
  return (
    <section
    id="beneficios"
     className="py-20 px-6 max-w-6xl mx-auto text-center">

      {/* TITULO */}
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        ¿Por qué elegir Tienda de Tiendas?
      </h2>

      <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
        No es solo una web. Es control, libertad y dejar de perder plata todos los meses.
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* PERFIL PIXEL */}
        <div className="border rounded-xl p-6 text-left hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={20} />
            <h3 className="font-bold text-lg">Perfil Pixel</h3>
          </div>

          <p className="text-sm leading-relaxed">
            Si sos de este Perfil necesitas un Diseño 100% a medida, sin plantillas genéricas. Trabajás con asesoramiento de diseñadores reales que te ayudan con marca, imagen y estilo visual. 
            Incluye asesoramiento en fotografía de producto y estética para que tu tienda no parezca una más del montón hecha por IA... este es el plan mas exigente..
          </p>
        </div>

        {/* PERFIL LIBRE */}
        <div className="border rounded-xl p-6 text-left hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Unlock size={20} />
            <h3 className="font-bold text-lg">Perfil Libre</h3>
          </div>

          <p className="text-sm leading-relaxed">
            Tu tienda es tuya. Se entrega en JavaScript, con backup en la nube y sin atarte a ninguna plataforma. 
            Podés migrarla, o usar tu propio dominio sin depender de terceros ni pagar actualizaciones o licencias.
            Olvidate de los trámites y gastos de todo tipo ya que es código libre y gratuito.
          </p>
        </div>

        {/* PERFIL ARGENTO */}
        <div className="border rounded-xl p-6 text-left hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-3">
            <Landmark size={20} />
            <h3 className="font-bold text-lg">Perfil Argento</h3>
          </div>

          <p className="text-sm leading-relaxed">
            Vendé sin comisiones abusivas. Evitá plataformas que te sacan hasta un 17% por venta en su plataforma o 4% por uso de cargos ocultos con carrito. 
            Cobrás directo por transferencia o alias (0%) o si queres dentro de Mp (+4%) eleji la opcion que vos quieras cobrar, con o sin intermediarios que se queden con tu ganancia.
          </p>
        </div>

      </div>

    </section>
  )
}