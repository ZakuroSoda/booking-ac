import NextAuth, { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // there may be a type error here, but it's acceptable:
  // note the difference between auth/prisma-adapter and next-auth/prisma-adapter
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session: async ({ session, user }) => {
      session.user = {
        ...session.user,
        id: user.id,
        email: user.email,
      }
      return session
    },
    async signIn({ user }) {
      const email = user.email ?? ''
      const check = await prisma.emailWhitelist.findFirst({
        where: {
          email
        }
      })
      if (!check) {
        return false
      }
      return true
    }
  },
}

export default NextAuth(authOptions)