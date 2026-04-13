'use client'
import { C } from '@/styles/colores'
import { CarritoProvider, useCarrito } from './context/CarritoContext'
import Header from './components/Header'
import HeroSection from '@/app/components/HeroSection'

import CarritoPanel from '@/app/components/CarritoPanel'
import ModalImagen from '@/app/components/ModalImagen'

import Formulario from "@/components/Formulario";




function Toast() {
  const { notif } = useCarrito()
  if (!notif) return null
  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '0.4rem',
      animation: 'fadeIn 0.3s ease',
    }}>
      {/* Producto agregado */}
      <div style={{
        background: C.naranja, color: C.white,
        padding: '0.65rem 1.5rem', borderRadius: 24,
        fontWeight: 700, fontSize: '0.9rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap',
      }}>
        🛒 {notif}
      </div>
      {/* Aviso stock */}
      <div style={{
        background: C.vino, color: '#FFD700',
        padding: '0.5rem 1.25rem', borderRadius: 20,
        fontWeight: 800, fontSize: '0.75rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        textAlign: 'center', letterSpacing: '0.03em',
      }}>
        ⚠️ ANTES DE PAGAR CONSULTÁ EL STOCK POR WHATSAPP
      </div>
    </div>
  )
}



function AppContent() {
  return (
    <div suppressHydrationWarning className="app-content">
      <Header />
      <HeroSection />
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
  
  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    ¿Estás invirtiendo o solo gastando?
  </h2>

  <p className="text-lg mb-10">
    La mayoría de las plataformas te cobran todos los meses.  
    Eso no es una inversión… es un gasto constante.
  </p>

  <div className="grid md:grid-cols-2 gap-6">

    {/* GASTO */}
    <div className="border rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">❌ Otras plataformas</h3>
      <ul className="space-y-2 text-left">
        <li>Pagos mensuales</li>
        <li>Comisiones por venta</li>
        <li>Nunca deja de costar</li>
      </ul>
      <p className="mt-4 font-semibold">
        👉 Es un gasto constante
      </p>
    </div>

    {/* INVERSIÓN */}
    <div className="border rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">✔ Tienda de Tiendas</h3>
      <ul className="space-y-2 text-left">
        <li>Un solo pago</li>
        <li>Sin comisiones</li>
        <li>La tienda es tuya</li>
      </ul>
      <p className="mt-4 font-semibold">
        👉 Es una inversión
      </p>
    </div>

  </div>

  <p className="mt-10 text-xl font-bold">
    Pagás una vez. Vendés sin comisiones para siempre.
  </p>

</section>
      
      
      <Formulario />
      <CarritoPanel />
      <ModalImagen />
      <Toast />

    </div>
  )
}

export default function Home() {
  return (
    <CarritoProvider>
      <AppContent />
    </CarritoProvider>
  )
}
