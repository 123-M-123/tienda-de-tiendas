"use client";

import { useState } from "react";
import { 
  User, Palette, Package, Truck, 
  CreditCard, Share2, Layout, Info 
} from "lucide-react";
import styles from "./Formulario.module.css";

export default function Formulario() {
  // Estado inicial con todos los campos requeridos
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

  // Función para abrir/cerrar secciones del acordeón
  const toggle = (section: string) => {
    setOpen(open === section ? null : section);
  };

  // Manejador de cambios (Inputs, Selects y Checkboxes)
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev: any) => {
        const currentList = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...currentList, value]
            : currentList.filter((v: string) => v !== value),
        };
      });
    } else {
      setForm((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const mensaje = `
🚀 NUEVA CONFIGURACIÓN SAAS

👤 CLIENTE:
Nombre: ${form.nombre}
Marca: ${form.emprendimiento}
WhatsApp: ${form.contacto}
Rubro: ${form.rubro}

🎨 IDENTIDAD:
Logo: ${form.logo}
Fotos: ${form.fotos}

📦 OPERACIÓN:
Productos: ${form.cantidad}
Categorías: ${form.categorias}
Envíos: ${form.envios}

💰 PAGOS:
${form.pagos.join(", ") || "No definido"}

📲 REDES:
${form.redes.join(", ") || "No definido"}

🧱 ESTRUCTURA ACTIVADA:
${form.estructura.join(", ") || "No definido"}
    `;

    const url = `https://wa.me/5491153778475?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Configurar mi SaaS</h2>
        <p className={styles.subtitle}>Seleccioná los módulos para tu tienda online</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* 1. DATOS DEL NEGOCIO */}
          <div className={styles.card}>
            <button type="button" onClick={() => toggle("datos")} className={styles.header}>
              <div className={styles.titleRow}><User size={18} /> Datos del negocio</div>
              <span>{open === "datos" ? "−" : "+"}</span>
            </button>
            {open === "datos" && (
              <div className={styles.content}>
                <p className="text-[10px] text-gray-500 mb-2 italic">Información básica para identificar tu cuenta en el sistema.</p>
                <input name="nombre" placeholder="Tu nombre completo" onChange={handleChange} className={styles.input} />
                <input name="emprendimiento" placeholder="Nombre de tu marca/negocio" onChange={handleChange} className={styles.input} />
                <input name="contacto" placeholder="WhatsApp (Incluir código de área)" onChange={handleChange} className={styles.input} />
                <input name="rubro" placeholder="¿Qué vendés? (Indumentaria, Tecnología, etc.)" onChange={handleChange} className={styles.input} />
              </div>
            )}
          </div>

          {/* 2. IMAGEN DE MARCA */}
          <div className={styles.card}>
            <button type="button" onClick={() => toggle("marca")} className={styles.header}>
              <div className={styles.titleRow}><Palette size={18} /> Imagen de marca</div>
              <span>{open === "marca" ? "−" : "+"}</span>
            </button>
            {open === "marca" && (
              <div className={styles.content}>
                <p className="text-[10px] text-gray-500 mb-2 italic">Esto nos ayuda a definir el diseño inicial.</p>
                <select name="logo" onChange={handleChange} className={styles.input}>
                  <option value="">¿Tenés logo en alta calidad?</option>
                  <option value="Si">Si, tengo archivo original (PNG/AI)</option>
                  <option value="No">No, necesito ayuda con eso</option>
                </select>
                <select name="fotos" onChange={handleChange} className={styles.input}>
                  <option value="">¿Tenés fotos de productos?</option>
                  <option value="Si">Si, listas para subir</option>
                  <option value="No">No, todavía no</option>
                </select>
              </div>
            )}
          </div>

          {/* 3. PRODUCTOS */}
          <div className={styles.card}>
            <button type="button" onClick={() => toggle("productos")} className={styles.header}>
              <div className={styles.titleRow}><Package size={18} /> Inventario</div>
              <span>{open === "productos" ? "−" : "+"}</span>
            </button>
            {open === "productos" && (
              <div className={styles.content}>
                <p className="text-[10px] text-gray-500 mb-2 italic">Definí el alcance de tu catálogo.</p>
                <input name="cantidad" placeholder="Cantidad aprox. de artículos" onChange={handleChange} className={styles.input} />
                <select name="categorias" onChange={handleChange} className={styles.input}>
                  <option value="">¿Cómo organizás tus productos?</option>
                  <option value="Planilla">Tengo una planilla Excel/Sheets</option>
                  <option value="Fotos">Tengo fotos por separado</option>
                  <option value="Desordenado">Necesito organizarlos de cero</option>
                </select>
              </div>
            )}
          </div>

          {/* 4. LOGÍSTICA */}
          <div className={styles.card}>
            <button type="button" onClick={() => toggle("logistica")} className={styles.header}>
              <div className={styles.titleRow}><Truck size={18} /> Logística</div>
              <span>{open === "logistica" ? "−" : "+"}</span>
            </button>
            {open === "logistica" && (
              <div className={styles.content}>
                <p className="text-[10px] text-gray-500 mb-2 italic">Configuración de entregas y retiros.</p>
                <select name="envios" onChange={handleChange} className={styles.input}>
                  <option value="">¿Hacés envíos?</option>
                  <option value="No">No, solo retiro en persona</option>
                  <option value="Local">Si, envíos locales/cadetería</option>
                  <option value="Todo el país">Si, envíos a todo el país</option>
                </select>
              </div>
            )}
          </div>

          {/* 5. MEDIOS DE PAGO */}
          <div className={styles.card}>
            <button type="button" onClick={() => toggle("pagos")} className={styles.header}>
              <div className={styles.titleRow}><CreditCard size={18} /> Medios de pago</div>
              <span>{open === "pagos" ? "−" : "+"}</span>
            </button>
            {open === "pagos" && (
              <div className={styles.content}>
                <p className="text-[10px] text-gray-500 mb-2 italic">Elegí cómo querés cobrar a tus clientes.</p>
                {["Efectivo", "Transferencia Bancaria", "MercadoPago (Link/QR)", "Tarjeta de Crédito"].map((p) => (
                  <label key={p} className={styles.label}>
                    <input type="checkbox" name="pagos" value={p} onChange={handleChange} className={styles.checkbox} />
                    <span className="text-sm">{p}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 6. REDES SOCIALES */}
          <div className={styles.card}>
            <button type="button" onClick={() => toggle("redes")} className={styles.header}>
              <div className={styles.titleRow}><Share2 size={18} /> Conectividad</div>
              <span>{open === "redes" ? "−" : "+"}</span>
            </button>
            {open === "redes" && (
              <div className={styles.content}>
                <p className="text-[10px] text-gray-500 mb-2 italic">Redes que vincularemos a tu tienda.</p>
                {["Instagram", "WhatsApp Business", "TikTok", "Facebook Page"].map((r) => (
                  <label key={r} className={styles.label}>
                    <input type="checkbox" name="redes" value={r} onChange={handleChange} className={styles.checkbox} />
                    <span className="text-sm">{r}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 7. ESTRUCTURA WEB (NUEVAS CASILLAS) */}
          <div className={styles.card}>
            <button type="button" onClick={() => toggle("estructura")} className={styles.header}>
              <div className={styles.titleRow}><Layout size={18} /> Estructura SaaS</div>
              <span>{open === "estructura" ? "−" : "+"}</span>
            </button>
            {open === "estructura" && (
              <div className={styles.content}>
                <div className="flex items-start gap-2 bg-red-600/5 p-3 rounded-lg mb-2 border border-red-600/10">
                  <Info size={14} className="text-red-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-red-900 leading-tight">
                    Módulos avanzados: Estos definen el poder tecnológico de tu plataforma.
                  </p>
                </div>
                {[
                  "Carrito de Compras Premium", 
                  "Botón WhatsApp Flotante Directo", 
                  "Catálogo PDF Autogenerado",
                  "Sistema de Banners Publicitarios",
                  "Gestión de Stock en Tiempo Real",
                  "Métricas Google Analytics 4",
                  "Checkout con Recolección de Datos"
                ].map((e) => (
                  <label key={e} className={styles.label}>
                    <input type="checkbox" name="estructura" value={e} onChange={handleChange} className={styles.checkbox} />
                    <span className="text-sm font-semibold">{e}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            SOLICITAR ALTA DE TIENDA
          </button>
          <p className="text-[9px] text-center text-gray-500 mt-2 uppercase font-black tracking-widest">
            Transferencia de datos vía cifrado WhatsApp
          </p>
        </form>
      </div>
    </section>
  );
}