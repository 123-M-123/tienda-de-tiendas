import { comparativas } from "../../../data/comparativas";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return comparativas.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }) {
  const data = comparativas.find((c) => c.slug === params.slug);

  if (!data) return {};

  return {
    title: data.title,
    description: `Comparativa real: ${data.h1}. Descubrí cuál conviene.`,
  };
}

export default function Page({ params }) {
  const data = comparativas.find((c) => c.slug === params.slug);

  if (!data) return notFound();

  return (
    <main className="bg-white text-black">

      {/* HERO */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {data.h1}
        </h1>

        <p className="text-lg mb-6">
          ¿Conviene usar {data.competitor} o tener una tienda sin comisiones?
        </p>

        <a
          href="https://wa.me/XXXXXXXXXXX"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          👉 Crear mi tienda
        </a>
      </section>

      {/* PROBLEMA */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          El problema de {data.competitor}
        </h2>

        <ul className="space-y-2">
          <li>❌ Pagos mensuales</li>
          <li>❌ Comisiones por venta</li>
          <li>❌ Dependencia</li>
        </ul>
      </section>

      {/* SOLUCIÓN */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Una alternativa mejor
        </h2>

        <p className="text-lg">
          Con una tienda propia:
        </p>

        <ul className="mt-4 space-y-2">
          <li>✔ Sin comisiones</li>
          <li>✔ Es tuya</li>
          <li>✔ Escalable</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <a
          href="https://wa.me/XXXXXXXXXXX"
          className="bg-black text-white px-8 py-4 rounded-xl"
        >
          👉 Empezar ahora
        </a>
      </section>

    </main>
  );
}