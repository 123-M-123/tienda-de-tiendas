"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useConfig } from '@/hooks/useConfig'
import { 
  ChevronLeft, ChevronRight, CheckCircle, XCircle, 
  Palette, Unlock, Banknote 
} from "lucide-react"

const images = [
  "/Folleto-1.jpg",
  "/Folleto-2.jpg",
  "/Folleto-1.jpg", 
  "/Folleto-2.jpg",
  "/Folleto-1.jpg",
]

export default function HeroSection() {
  const config = useConfig()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000)
    return () => clearInterval(slideInterval)
  }, [nextSlide])

  return (
    <section id="inicio" className="min-h-screen flex flex-col items-center bg-black text-white px-6 py-16">
      
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center mb-20">
        
        <div className="text-left space-y-6 order-2 lg:order-1">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
            TU TIENDA <br />
            <span className="text-dinamico-primario uppercase">PROPIA.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-xl text-gray-300">
            Sin cuotas mensuales. Sin comisiones. Un sistema SaaS de alta gama diseñado para escalar tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#contacto" 
              style={{ backgroundColor: 'var(--color-primario)' }}
              className="hover:opacity-90 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 text-center shadow-lg"
            >
              EMPEZAR AHORA
            </a>
            <div className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
              <CheckCircle className="text-dinamico-primario" size={20} />
              <span className="text-sm font-medium">Lista en 72hs</span>
            </div>
          </div>
        </div>

        <div className="relative group order-1 lg:order-2 w-full max-w-112.5 mx-auto">
          <div 
            className="relative aspect-4/5 overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-neutral-900"
            style={{ boxShadow: `0 25px 50px -12px var(--color-primario)40` }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <img src={img} alt={`Trabajo ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            ))}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 hover:bg-dinamico-primario">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 hover:bg-dinamico-primario">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            {images.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`transition-all duration-300 ${index === currentIndex ? "w-8 h-2 bg-dinamico-primario rounded-full" : "w-2 h-2 bg-white/30 rounded-full"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl w-full">
        <div className="border border-white/10 rounded-xl p-6 bg-white/5">
          <div className="flex justify-center mb-4 text-dinamico-primario"><Palette size={32} /></div>
          <h2 className="font-bold text-xl mb-2 text-center">Perfil Pixel</h2>
          <p className="text-sm text-center text-gray-400 font-light leading-relaxed">Diseño profesional para que tu marca transmita confianza real.</p>
        </div>
        <div className="border border-white/10 rounded-xl p-6 bg-white/5">
          <div className="flex justify-center mb-4 text-dinamico-primario"><Unlock size={32} /></div>
          <h2 className="font-bold text-xl mb-2 text-center">Perfil Libre</h2>
          <p className="text-sm text-center text-gray-400 font-light leading-relaxed">Código propio y libertad para migrar donde quieras.</p>
        </div>
        <div className="border border-white/10 rounded-xl p-6 bg-white/5">
          <div className="flex justify-center mb-4 text-dinamico-primario"><Banknote size={32} /></div>
          <h2 className="font-bold text-xl mb-2 text-center">Perfil Emprendedor</h2>
          <p className="text-sm text-center text-gray-400 font-light leading-relaxed">Cobrás directo. Sin comisiones ni intermediarios.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl w-full text-left">
        <div className="border border-green-900/30 rounded-xl p-8 bg-green-900/10">
          <div className="flex items-center gap-3 mb-4"><CheckCircle size={24} className="text-green-500" /><h2 className="font-bold text-xl">Tienda de Tiendas</h2></div>
          <ul className="space-y-3 text-base"><li>• Un solo pago inicial</li><li>• Sin cuotas mensuales</li><li>• La tienda es 100% tuya</li></ul>
          <p className="mt-6 text-sm font-black text-green-500 uppercase tracking-widest">Inversión única.</p>
        </div>
        <div className="border border-red-900/30 rounded-xl p-8 bg-red-900/10 text-gray-400">
          <div className="flex items-center gap-3 mb-4"><XCircle size={24} className="text-red-500" /><h2 className="font-bold text-xl text-gray-300">Otras plataformas</h2></div>
          <ul className="space-y-3 text-base"><li>• Pagos todos los meses</li><li>• Comisiones por venta</li><li>• Nunca es tuya</li></ul>
          <p className="mt-6 text-sm font-bold text-red-500/70 uppercase tracking-widest">Gasto recurrente.</p>
        </div>
      </div>
    </section>
  )
}