import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      // Validamos que existan ambos para que TypeScript esté tranquilo
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})