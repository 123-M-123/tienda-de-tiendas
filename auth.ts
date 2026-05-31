import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { esUsuarioAutorizado } from "@/lib/clientes"

// 🛡️ EXTENSIÓN DE TIPOS PARA QUITAR EL ERROR ROJO
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      isAuthorized: boolean; // 🚩 Definimos la propiedad aquí
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn() {
      return true; 
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        // 🚩 Ahora el editor reconoce esta propiedad gracias a la interfaz de arriba
        session.user.isAuthorized = esUsuarioAutorizado(session.user.email);
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  }
})