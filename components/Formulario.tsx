"use client";
import { useState } from "react";

export default function Formulario() {
  const [form, setForm] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev: any) => ({
        ...prev,
        [name]: prev[name]
          ? checked
            ? [...prev[name], value]
            : prev[name].filter((v: string) => v !== value)
          : [value],
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const mensaje = `
🚀 Nuevo cliente TIENDA DE TIENDAS

Nombre: ${form.nombre}
Emprendimiento: ${form.emprendimiento}
Contacto: ${form.contacto}
Ubicación: ${form.ubicacion}
Rubro: ${form.rubro}

Productos: ${form.cantidad}
Categorías: ${form.categorias}

Logo: ${form.logo}
Fotos: ${form.fotos}

Envíos: ${form.envios}
Correos: ${form.correo}

Pagos: ${form.pagos}
Pago servicio: ${form.pago_servicio}

Componentes: ${form.componentes}
Redes: ${form.redes}
    `;

    const url = `https://wa.me/5491153778475?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const Section = ({ title, children }: any) => (
    <details className="border rounded-xl p-4">
      <summary className="font-bold cursor-pointer">{title}</summary>
      <div 
        className="mt-4 space-y-3"
        onClick={(e) => e.stopPropagation()} // 🔥 FIX NO CIERRE
      >
        {children}
      </div>
    </details>
  );

  return (
    <section id="contacto" className="py-20 px-6 max-w-2xl mx-auto">
      
      <h2 className="text-3xl font-bold text-center mb-2">
        Empezar mi tienda
      </h2>

      <p className="text-center text-sm opacity-70 mb-6">
        ⚠ Solo trabajamos con personas listas para vender
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* DATOS */}
        <Section title="📊 Datos del negocio">
          <p className="text-sm opacity-60">
            Necesitamos estos datos básicos para entender tu proyecto.
          </p>

          <input name="nombre" placeholder="Tu nombre" onChange={handleChange} className="input" />
          <input name="emprendimiento" placeholder="Nombre del emprendimiento / marca" onChange={handleChange} className="input" />
          <input name="contacto" placeholder="WhatsApp o Email" onChange={handleChange} className="input" />
          <input name="ubicacion" placeholder="Ciudad" onChange={handleChange} className="input" />
          <input name="rubro" placeholder="Rubro" onChange={handleChange} className="input" />
        </Section>

        {/* MARCA */}
        <Section title="🎨 Imagen de marca">
          <p className="text-sm opacity-60">
            Esto define cómo te van a percibir tus clientes.
          </p>

          <select name="logo" onChange={handleChange} className="input">
            <option>¿Tenés logo?</option>
            <option>Si</option>
            <option>No</option>
          </select>

          {form.logo === "No" && (
            <p className="text-xs text-red-500">
              ⚠ El logo se cobra aparte
            </p>
          )}

          <select name="fotos" onChange={handleChange} className="input">
            <option>¿Tenés fotos?</option>
            <option>Si</option>
            <option>No</option>
          </select>

          {form.fotos === "No" && (
            <p className="text-xs text-red-500">
              ⚠ Sin fotos no podemos avanzar
            </p>
          )}
        </Section>

        {/* PRODUCTOS */}
        <Section title="📦 Productos">
          <p className="text-sm opacity-60">
            Mientras más ordenado esté esto, mejor va a vender tu tienda.
          </p>

          <input name="cantidad" placeholder="Cantidad de productos" onChange={handleChange} className="input" />

          <select name="categorias" onChange={handleChange} className="input">
            <option>¿Cómo los tenés organizados?</option>
            <option>Planilla</option>
            <option>Desordenado</option>
          </select>

          {form.categorias === "Desordenado" && (
            <p className="text-xs text-yellow-500">
              ⚠ Requiere organización previa (extra)
            </p>
          )}
        </Section>

        {/* LOGISTICA */}
        <Section title="🚚 Logística">
          <p className="text-sm opacity-60">
            Esto impacta directamente en la experiencia del cliente.
          </p>

          <select name="envios" onChange={handleChange} className="input">
            <option>¿Hacés envíos?</option>
            <option>No</option>
            <option>Local</option>
            <option>Todo el país</option>
          </select>

          {form.envios !== "No" && (
            <div>
              <p className="text-sm">Correos</p>
              {["OCA", "Correo Argentino", "Andreani"].map((e) => (
                <label key={e} className="block">
                  <input type="checkbox" name="correo" value={e} onChange={handleChange} /> {e}
                </label>
              ))}
            </div>
          )}
        </Section>

        {/* PAGOS */}
        <Section title="💰 Medios de pago">
          <p className="text-sm opacity-60">
            ¿Cómo querés cobrar?
          </p>

          <div>
            {[
              "Alias",
              "Efectivo",
              "Tarjeta",
              "MercadoPago",
              "Cripto",
            ].map((p) => (
              <label key={p} className="block">
                <input type="checkbox" name="pagos" value={p} onChange={handleChange} /> {p}
              </label>
            ))}
          </div>

          <select name="pago_servicio" onChange={handleChange} className="input">
            <option>¿Cómo pagás el servicio?</option>
            <option>Pago único</option>
            <option>Seña + saldo</option>
          </select>
        </Section>

        {/* ESTRUCTURA */}
        <Section title="🧱 Estructura web">
          <p className="text-sm opacity-60">
            (Orientativa) Elegí lo que creas que necesitás.
          </p>

          <div>
            {[
              "Carrito",
              "Landing que convierta",
              "SEO (más ventas)",
              "Quiénes somos",
              "Sección envíos",
              "Ofertas",
              "Condiciones de venta",
              "Comparación plataformas",
              "Grilla productos",
              "Carrusel dinámico",
              "Video",
              "Testimonios",
              "Mapa",
            ].map((c) => (
              <label key={c} className="block">
                <input type="checkbox" name="componentes" value={c} onChange={handleChange} /> {c}
              </label>
            ))}
          </div>
        </Section>

        {/* REDES */}
        <Section title="📲 Redes">
          <p className="text-sm opacity-60">
            ¿Cuáles querés integrar?
          </p>

          <div>
            {["Instagram", "WhatsApp", "TikTok", "Mail", "Facebook", "LinkedIn"].map((r) => (
              <label key={r} className="block">
                <input type="checkbox" name="redes" value={r} onChange={handleChange} /> {r}
              </label>
            ))}
          </div>
        </Section>

        <button className="w-full bg-black text-white p-4 rounded-xl mt-6">
          👉 Enviar y empezar
        </button>

      </form>
    </section>
  );
}
