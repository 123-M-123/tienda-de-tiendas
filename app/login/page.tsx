import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    // 1. CONTROL DE ALTURA TOTAL: Cambié 'items-center' por 'items-start' y añadí 'pt-20'
    <div className="flex justify-center items-start min-h-screen bg-[#e6dcb7] p-4 pt-20">
      
      {/* CONTENEDOR PRINCIPAL (LA CARD) 
          - Se agregó 'active:scale-95' para que en mobile todo el bloque reaccione al tocarlo
      */}
      <div className="group relative w-full max-w-[400px] transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-1 active:scale-95">
        
        {/* 2. IMAGEN JPG CON 50% TRANSPARENCIA (opacity-50) */}
        <img 
          src="/boton-ingreso.jpg" 
          alt="Ingreso" 
          className="w-full h-auto rounded-[3rem] shadow-xl opacity-75"
        />

        {/* 3. CONTENEDOR DEL BOTÓN SUPERPUESTO
            - CONTROL DE ALTURA DEL BOTÓN: El valor de 'bottom-14' lo sube o baja dentro de la imagen
        */}
        <div className="absolute inset-x-0 bottom-12 flex justify-center px-6">
          <form
            className="w-full max-w-[290px]" // 4. Achicado un 10% (de 320 a 290)
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/panel/dashboard" })
            }}
          >
            <button 
              type="submit" 
              className="flex items-center justify-center w-full gap-3 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl transition-all duration-200 font-bold shadow-sm hover:bg-slate-900 hover:text-white text-lg" // text-lg sube un 10% el tamaño de letra
            >
              {/* Favicon 7x7 (28px x 28px en Tailwind es w-7 h-7) */}
              <img src="https://www.google.com/favicon.ico" alt="G" className="w-7 h-7" />
              Continuar con Google
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}