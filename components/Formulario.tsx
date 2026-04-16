"use client";
import { useState } from "react";
import {
  User,
  Palette,
  Package,
  Truck,
  CreditCard,
  Share2,
  Layout,
} from "lucide-react";

export default function Formulario() {
  const [form, setForm] = useState<any>({
    nombre: "",
    emprendimiento: "",
    contacto: "",
    rubro: "",
    logo: "",
    fotos: "",
    cantidad: "",
    categorias: "",
    envios: "",
    pagos: [],
    redes: [],
    estructura: [],
  });

  const [open, setOpen] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpen(open === section ? null : section);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev: any) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v: string) => v !== value),
      }));
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const mensaje = `
🚀 Nuevo cliente

Nombre: ${form.nombre}
Emprendimiento: ${form.emprendimiento}
Contacto: ${form.contacto}
Rubro: ${form.rubro}

🎨 Marca
Logo: ${form.logo}
Fotos: ${form.fotos}

📦 Productos
Cantidad: ${form.cantidad}
Categorías: ${form.categorias}

🚚 Envíos
${form.envios}

💰 Pagos
${form.pagos.join(", ")}

📲 Redes
${form.redes.join(", ")}

🧱 Estructura
${form.estructura.join(", ")}
    `;

    const url = `https://wa.me/5491153778475?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");
  };

  // estilos seguros
  const container = {
    maxWidth: 560,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui",
  };

  const title = {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: 6,
  };

  const subtitle = {
    textAlign: "center" as const,
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 20,
  };

  const card = {
    border: "1px solid #e5e5e5",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    background: "#fff",
  };

  const header = {
    width: "100%",
    padding: 16,
    background: "#fff",
    border: "none",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const content = {
    padding: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
    background: "#fafafa",
    borderTop: "1px solid #eee",
  };

  const input = {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 14,
  };

  const button = {
    marginTop: 12,
    padding: 16,
    borderRadius: 14,
    border: "none",
    background: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    cursor: "pointer",
  };

  const label = {
    display: "flex",
    gap: 8,
    alignItems: "center",
    fontSize: 14,
  };

  const titleRow = {
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  return (
    <section style={container}>
      <h2 style={title}>Empezar mi tienda</h2>
      <p style={subtitle}>Solo para gente que quiere vender en serio</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {/* DATOS */}
        <div style={card}>
          <button type="button" onClick={() => toggle("datos")} style={header}>
            <div style={titleRow}>
              <User size={18} /> Datos del negocio
            </div>
            <span>{open === "datos" ? "−" : "+"}</span>
          </button>
          {open === "datos" && (
            <div style={content}>
              <input name="nombre" placeholder="Tu nombre" onChange={handleChange} style={input} />
              <input name="emprendimiento" placeholder="Nombre del emprendimiento" onChange={handleChange} style={input} />
              <input name="contacto" placeholder="WhatsApp o Email" onChange={handleChange} style={input} />
              <input name="rubro" placeholder="Rubro" onChange={handleChange} style={input} />
            </div>
          )}
        </div>

        {/* MARCA */}
        <div style={card}>
          <button type="button" onClick={() => toggle("marca")} style={header}>
            <div style={titleRow}>
              <Palette size={18} /> Imagen de marca
            </div>
            <span>{open === "marca" ? "−" : "+"}</span>
          </button>
          {open === "marca" && (
            <div style={content}>
              <select name="logo" onChange={handleChange} style={input}>
                <option>¿Tenés logo?</option>
                <option>Si</option>
                <option>No</option>
              </select>

              <select name="fotos" onChange={handleChange} style={input}>
                <option>¿Tenés fotos?</option>
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
          )}
        </div>

        {/* PRODUCTOS */}
        <div style={card}>
          <button type="button" onClick={() => toggle("productos")} style={header}>
            <div style={titleRow}>
              <Package size={18} /> Productos
            </div>
            <span>{open === "productos" ? "−" : "+"}</span>
          </button>
          {open === "productos" && (
            <div style={content}>
              <input name="cantidad" placeholder="Cantidad de productos" onChange={handleChange} style={input} />
              <select name="categorias" onChange={handleChange} style={input}>
                <option>¿Cómo los organizás?</option>
                <option>Planilla</option>
                <option>Desordenado</option>
              </select>
            </div>
          )}
        </div>

        {/* LOGISTICA */}
        <div style={card}>
          <button type="button" onClick={() => toggle("logistica")} style={header}>
            <div style={titleRow}>
              <Truck size={18} /> Logística
            </div>
            <span>{open === "logistica" ? "−" : "+"}</span>
          </button>
          {open === "logistica" && (
            <div style={content}>
              <select name="envios" onChange={handleChange} style={input}>
                <option>¿Hacés envíos?</option>
                <option>No</option>
                <option>Local</option>
                <option>Todo el país</option>
              </select>
            </div>
          )}
        </div>

        {/* PAGOS */}
        <div style={card}>
          <button type="button" onClick={() => toggle("pagos")} style={header}>
            <div style={titleRow}>
              <CreditCard size={18} /> Medios de pago
            </div>
            <span>{open === "pagos" ? "−" : "+"}</span>
          </button>
          {open === "pagos" && (
            <div style={content}>
              {["Efectivo", "Transferencia", "MercadoPago", "Tarjeta"].map((p) => (
                <label key={p} style={label}>
                  <input type="checkbox" name="pagos" value={p} onChange={handleChange} /> {p}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* REDES */}
        <div style={card}>
          <button type="button" onClick={() => toggle("redes")} style={header}>
            <div style={titleRow}>
              <Share2 size={18} /> Redes
            </div>
            <span>{open === "redes" ? "−" : "+"}</span>
          </button>
          {open === "redes" && (
            <div style={content}>
              {["Instagram", "WhatsApp", "TikTok", "Facebook"].map((r) => (
                <label key={r} style={label}>
                  <input type="checkbox" name="redes" value={r} onChange={handleChange} /> {r}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* ESTRUCTURA */}
        <div style={card}>
          <button type="button" onClick={() => toggle("estructura")} style={header}>
            <div style={titleRow}>
              <Layout size={18} /> Estructura web
            </div>
            <span>{open === "estructura" ? "−" : "+"}</span>
          </button>
          {open === "estructura" && (
            <div style={content}>
              {["Carrito", "Landing", "SEO", "Testimonios", "Video"].map((e) => (
                <label key={e} style={label}>
                  <input type="checkbox" name="estructura" value={e} onChange={handleChange} /> {e}
                </label>
              ))}
            </div>
          )}
        </div>

        <button style={button}>Empezar ahora</button>
      </form>
    </section>
  );
}