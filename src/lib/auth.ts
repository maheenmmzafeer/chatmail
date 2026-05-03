import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify",
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: "true",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        ;(session as any).accessToken = token.accessToken
      }
      return session
    },

    async signIn({ user, account, profile }) {
      try {
        // Ensure the user has an email
        if (!user.email) {
          console.error("Sign-in failed: Missing email.");
          return false;
        }

        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // If the user does not exist, create a new user
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
  },
}