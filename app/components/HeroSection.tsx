export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

      <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
        Creá tu tienda online sin comisiones
      </h1>

      <p className="text-xl md:text-2xl font-semibold mb-4">
        Pagás una sola vez. Vendés sin comisiones para siempre.
      </p>

      <p className="text-lg max-w-2xl mb-6">
        Tené tu tienda lista en pocos días, con opción de diseño en 72hs.
      </p>

      {/* PERFILES */}
      <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl w-full">

        <div className="border rounded-xl p-4">
          <h3 className="font-bold mb-2">🎨 Perfil Pixel</h3>
          <p className="text-sm">
            Web visual, enfocada en diseño y presencia profesional.
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3 className="font-bold mb-2">🔓 Perfil Libre</h3>
          <p className="text-sm">
            Tu tienda en JavaScript. La podés migrar donde quieras.
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3 className="font-bold mb-2">🇦🇷 Perfil Argento</h3>
          <p className="text-sm">
            Sin comisiones. Cobrás directo por alias o transferencia.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row gap-4">
        <a
          href="#contacto"
          className="bg-black text-white px-6 py-3 rounded-xl text-lg"
        >
          👉 Quiero mi tienda
        </a>

        <a
          href="/comparador/shopify-vs"
          className="border px-6 py-3 rounded-xl text-lg"
        >
          Ver comparación
        </a>
      </div>

      <p className="mt-6 text-sm opacity-70">
        Opción rápida: clonación básica lista en 72hs.
      </p>

    </section>


  );

}

