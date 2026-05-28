import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { esUsuarioAutorizado } from "@/lib/clientes"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      // Bloqueo total por Whitelist
      const autorizado = esUsuarioAutorizado(user.email);
      if (!autorizado) {
        console.warn(`Intento de acceso denegado: ${user.email}`);
        return false; // Rebotar al login
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirigir errores de auth al login
  }
})