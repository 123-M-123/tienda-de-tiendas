import { signIn } from "@/auth"
import { Store } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7] p-4 text-[#1A1A1A]">
      <div className="w-full max-w-md bg-[#F1F5F9] p-10 rounded-[3rem] shadow-sm border border-slate-200 text-center">
        
        {/* Logo Minimalista */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Store className="text-white" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Tienda de Tiendas</h1>
        <p className="text-slate-500 text-sm font-medium mb-8">Ingresá al panel de gestión</p>
        
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/panel/dashboard" })
          }}
        >
          <button 
            type="submit" 
            className="flex items-center justify-center w-full gap-3 px-6 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl hover:bg-slate-900 hover:text-white transition-all font-bold shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4" />
            Continuar con Google
          </button>
        </form>

        <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Acceso Seguro • Encriptado
        </p>
      </div>
    </div>
  )
}