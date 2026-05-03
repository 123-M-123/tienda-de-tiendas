import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Panel de Tienda de Tiendas</h1>
        <p className="text-gray-600 mb-8">Ingresá con tu cuenta de Google para gestionar tus ventas.</p>
        
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/panel" })
          }}
        >
          <button 
            type="submit" 
            className="flex items-center justify-center w-full gap-3 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <img src="/ico-ui/google.png" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
            Continuar con Google
          </button>
        </form>
      </div>
    </div>
  )
}