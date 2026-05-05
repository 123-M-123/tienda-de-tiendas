import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function PanelPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  // Redirigimos al Dashboard para que no haya contenido duplicado en la raíz
  redirect("/panel/dashboard");
}