"use client";
import { useState } from "react";

export default function Formulario() {
  const [form, setForm] = useState({});

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
    console.log(form);
    alert("Formulario enviado");
  };

  const Box = ({ title }: any) => (
    <h3 className="text-lg font-bold mt-8 mb-2">{title}</h3>
  );

  return (
    <section id="contacto" className="py-20 px-6 max-w-2xl mx-auto">
      
      <h2 className="text-3xl font-bold text-center mb-2">
        Empezar mi tienda
      </h2>

      <p className="text-center text-sm opacity-70 mb-6">
        ⚠ Solo trabajamos con personas listas para vender
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* DATOS */}
        <Box title="Datos del negocio" />

        <input name="nombre" placeholder="Nombre" onChange={handleChange} className="input" />
        <input name="contacto" placeholder="WhatsApp o Email" onChange={handleChange} className="input" />
        <input name="ubicacion" placeholder="Ubicación (ciudad)" onChange={handleChange} className="input" />
        <input name="rubro" placeholder="Rubro del negocio" onChange={handleChange} className="input" />

        <input name="datos_publicos" placeholder="¿Qué datos querés mostrar en la web?" onChange={handleChange} className="input" />

        {/* MARCA */}
        <Box title="Imagen de marca" />

        <select name="logo" onChange={handleChange} className="input">
          <option>¿Tenés logo?</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <input name="colores" placeholder="¿Tenés paleta de colores?" onChange={handleChange} className="input" />

        <select name="fotos" onChange={handleChange} className="input">
          <option>¿Tenés fotos de productos?</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        {/* PRODUCTOS */}
        <Box title="Productos" />

        <input name="cantidad" placeholder="Cantidad de productos" onChange={handleChange} className="input" />

        <select name="categorias" onChange={handleChange} className="input">
          <option>¿Cómo tenés los productos?</option>
          <option>En planilla</option>
          <option>Todo suelto</option>
        </select>

        {/* LOGÍSTICA */}
        <Box title="Logística" />

        <select name="envios" onChange={handleChange} className="input">
          <option>¿Hacés envíos?</option>
          <option>No</option>
          <option>Solo local</option>
          <option>Todo el país</option>
        </select>

        <div>
          <p className="text-sm mb-1">Empresas de envío</p>
          {["OCA", "Correo Argentino", "Andreani"].map((e) => (
            <label key={e} className="block">
              <input type="checkbox" name="correo" value={e} onChange={handleChange} /> {e}
            </label>
          ))}
        </div>

        {/* PAGOS */}
        <Box title="Medios de pago" />

        <div>
          {[
            "Alias",
            "Efectivo",
            "Contra entrega",
            "Tarjeta",
            "MercadoPago",
            "PayPal",
            "Stripe",
            "Cripto",
          ].map((p) => (
            <label key={p} className="block">
              <input type="checkbox" name="pagos" value={p} onChange={handleChange} /> {p}
            </label>
          ))}
        </div>

        <select name="pago_servicio" onChange={handleChange} className="input">
          <option>¿Cómo querés pagar el servicio?</option>
          <option>Pago único</option>
          <option>Seña 50%</option>
          <option>Por etapas</option>
          <option>Consultar</option>
        </select>

        {/* ESTRUCTURA */}
        <Box title="Estructura de la web" />

        <div>
          {[
            "Grilla productos",
            "Carrusel",
            "Hero",
            "Quiénes somos",
            "Sección envíos",
          ].map((c) => (
            <label key={c} className="block">
              <input type="checkbox" name="componentes" value={c} onChange={handleChange} /> {c}
            </label>
          ))}
        </div>

        {/* REDES */}
        <Box title="Redes sociales" />

        <div>
          {[
            "Instagram",
            "WhatsApp",
            "TikTok",
            "Mail",
            "Facebook",
            "LinkedIn",
          ].map((r) => (
            <label key={r} className="block">
              <input type="checkbox" name="redes" value={r} onChange={handleChange} /> {r}
            </label>
          ))}
        </div>

        <button className="w-full bg-black text-white p-4 rounded-xl mt-6">
          👉 Enviar y empezar
        </button>

      </form>
    </section>
  );
}