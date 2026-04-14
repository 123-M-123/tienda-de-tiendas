"use client";
import { useState } from "react";

const steps = [
  "nombre",
  "contacto",
  "ubicacion",
  "rubro",
  "logo",
  "fotos",
  "cantidad",
  "envios",
  "pagos",
  "pago_servicio",
];

export default function Formulario() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<any>({});

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const setValue = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const send = () => {
    const mensaje = `
🚀 Nuevo cliente

Nombre: ${form.nombre}
Contacto: ${form.contacto}
Ubicación: ${form.ubicacion}
Rubro: ${form.rubro}
Productos: ${form.cantidad}
Envíos: ${form.envios}
Pagos: ${form.pagos}
Pago servicio: ${form.pago_servicio}
    `;

    const url = `https://wa.me/5491153778475?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center px-6 text-center">

      {/* PROGRESO */}
      <div className="mb-6 text-sm opacity-60">
        Paso {step + 1} de {steps.length}
      </div>

      {/* PREGUNTAS */}
      {step === 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">¿Cómo te llamás?</h2>
          <input
            className="input text-center"
            onChange={(e) => setValue("nombre", e.target.value)}
          />
          <button onClick={next} className="btn">Continuar</button>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-4">¿Cómo te contacto?</h2>
          <input
            className="input text-center"
            placeholder="WhatsApp o Email"
            onChange={(e) => setValue("contacto", e.target.value)}
          />
          <button onClick={next} className="btn">Continuar</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-4">¿De dónde sos?</h2>
          <input
            className="input text-center"
            onChange={(e) => setValue("ubicacion", e.target.value)}
          />
          <button onClick={next} className="btn">Continuar</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold mb-4">¿Qué vendés?</h2>
          <input
            className="input text-center"
            onChange={(e) => setValue("rubro", e.target.value)}
          />
          <button onClick={next} className="btn">Continuar</button>
        </>
      )}

      {step === 4 && (
        <>
          <h2 className="text-xl font-bold mb-4">¿Tenés logo?</h2>
          <div className="grid gap-3 w-full">
            {["Sí", "No"].map((op) => (
              <button key={op} onClick={() => { setValue("logo", op); next(); }} className="btn">
                {op}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h2 className="text-xl font-bold mb-4">¿Tenés fotos?</h2>
          <div className="grid gap-3 w-full">
            {["Sí", "No"].map((op) => (
              <button key={op} onClick={() => { setValue("fotos", op); next(); }} className="btn">
                {op}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 6 && (
        <>
          <h2 className="text-xl font-bold mb-4">¿Cuántos productos?</h2>
          <input
            className="input text-center"
            onChange={(e) => setValue("cantidad", e.target.value)}
          />
          <button onClick={next} className="btn">Continuar</button>
        </>
      )}

      {step === 7 && (
        <>
          <h2 className="text-xl font-bold mb-4">¿Hacés envíos?</h2>
          <div className="grid gap-3 w-full">
            {["No", "Local", "Todo el país"].map((op) => (
              <button key={op} onClick={() => { setValue("envios", op); next(); }} className="btn">
                {op}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 8 && (
        <>
          <h2 className="text-xl font-bold mb-4">¿Cómo cobrás?</h2>
          <div className="grid gap-3 w-full">
            {["Alias", "Efectivo", "MercadoPago", "Cripto"].map((op) => (
              <button key={op} onClick={() => { setValue("pagos", op); next(); }} className="btn">
                {op}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 9 && (
        <>
          <h2 className="text-xl font-bold mb-4">¿Cómo pagás el servicio?</h2>
          <div className="grid gap-3 w-full">
            {["Pago único", "Seña + saldo"].map((op) => (
              <button key={op} onClick={() => setValue("pago_servicio", op)} className="btn">
                {op}
              </button>
            ))}
          </div>

          <button onClick={send} className="btn mt-4 bg-black text-white">
            🚀 Enviar
          </button>
        </>
      )}

      {/* BACK */}
      {step > 0 && (
        <button onClick={back} className="mt-6 text-sm opacity-60">
          ← Volver
        </button>
      )}

    </section>
  );
}