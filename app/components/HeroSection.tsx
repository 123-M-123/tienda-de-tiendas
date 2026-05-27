"use client"

import React, { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

const images = [
  "/Folleto-1.jpg",
  "/folleto-2.jpg",
  "/Folleto-1.jpg", // Placeholder para completar los 5
  "/folleto-2.jpg", // Placeholder
  "/Folleto-1.jpg", // Placeholder
]

export default function HeroSection() {
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
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-20 overflow-hidden"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-600 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-red-800 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* TEXTO IZQUIERDA */}
        <div className="text-left space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
            TU TIENDA <br />
            <span className="text-red-600">PROPIA.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-xl text-gray-300">
            Sin cuotas mensuales. Sin comisiones. Un sistema SaaS de alta gama diseñado para escalar tu negocio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contacto"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 text-center"
            >
              EMPEZAR AHORA
            </a>
            <div className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
              <CheckCircle className="text-red-500" size={20} />
              <span className="text-sm font-medium">Lista en 72hs</span>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-6 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold text-red-500">100%</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Propiedad del código</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">0%</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Comisiones x venta</p>
            </div>
          </div>
        </div>

        {/* CARRUSEL DERECHA */}
        <div className="relative group">
          <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-red-900/20 bg-neutral-900">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              >
                <img
                  src={img}
                  alt={`Trabajo realizado ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradiente para integrar con el fondo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            ))}

            {/* BOTONES NAVEGACION (Opcionales, visibles en hover) */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 hover:bg-red-600"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 hover:bg-red-600"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* DOTS (PUNTITOS) */}
          <div className="flex justify-center gap-3 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 h-2 bg-red-600 rounded-full" 
                    : "w-2 h-2 bg-white/30 rounded-full hover:bg-white/50"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}