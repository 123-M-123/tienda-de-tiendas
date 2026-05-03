import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function PanelPage() {
  const session = await auth()

  // Si no hay sesión, el Middleware debería frenarlo, 
  // pero esto es una doble seguridad:
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Bienvenido al Panel</h1>
      <p className="mt-4 text-xl">
        Estás logueado como: <span className="text-blue-600 font-mono">{session.user?.email}</span>
      </p>

      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/" })
        }}
        className="mt-10"
      >
        <button className="text-red-500 hover:underline">Cerrar sesión</button>
      </form>
    </div>
  )
}