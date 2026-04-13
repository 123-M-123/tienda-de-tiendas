"use client";

import { useState } from "react";

export default function Formulario() {
  const [form, setForm] = useState({
    nombre: "",
    contacto: "",
    productos: "",
    categorias: "",
    tieneFotos: "",
    tieneLogo: "",
    ubicacion: "",
    haceEnvios: "",
    colores: "",
    pagos: "",
    pagoServicio: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(form); // después lo conectás a email / backend

    alert("Formulario enviado");
  };

  return (
    <section id="contacto" className="py-20 px-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Empezar mi tienda
      </h2>
<p className="text-center text-sm font-semibold mb-6">
  ⚠ Solo trabajamos con personas listas para vender
</p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="nombre" placeholder="Nombre" onChange={handleChange} className="w-full border p-3 rounded-xl" required />

        <input name="contacto" placeholder="WhatsApp o Email" onChange={handleChange} className="w-full border p-3 rounded-xl" required />

        <input name="productos" placeholder="Cantidad de productos" onChange={handleChange} className="w-full border p-3 rounded-xl" />

        <input name="categorias" placeholder="¿Tenés categorías definidas?" onChange={handleChange} className="w-full border p-3 rounded-xl" />

        <select name="tieneFotos" onChange={handleChange} className="w-full border p-3 rounded-xl">
          <option value="">¿Tenés fotos de productos?</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <select name="tieneLogo" onChange={handleChange} className="w-full border p-3 rounded-xl">
          <option value="">¿Tenés logo?</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <input name="ubicacion" placeholder="Ubicación (ciudad)" onChange={handleChange} className="w-full border p-3 rounded-xl" />

        <select name="haceEnvios" onChange={handleChange} className="w-full border p-3 rounded-xl">
          <option value="">¿Hacés envíos?</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <input name="colores" placeholder="¿Tenés colores definidos?" onChange={handleChange} className="w-full border p-3 rounded-xl" />

        <input name="pagos" placeholder="¿Cómo cobrás? (alias, efectivo, etc)" onChange={handleChange} className="w-full border p-3 rounded-xl" />

        <select name="pagoServicio" onChange={handleChange} className="w-full border p-3 rounded-xl">
          <option value="">¿Cómo querés pagar el servicio?</option>
          <option>Pago único</option>
          <option>Consultar</option>
        </select>

        <button className="w-full bg-black text-white p-4 rounded-xl text-lg">
          👉 Enviar y empezar
        </button>

      </form>
    </section>
  );
}