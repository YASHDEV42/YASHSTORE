import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcyrpt from "bcryptjs";
import Google from "next-auth/providers/google";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";
import prisma from "./lib/db";

const providers: Provider[] = [
  Google({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
  }),
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },

    authorize: async (credentials) => {
      const email = credentials.email as string | undefined;
      const password = credentials.password as string | undefined;
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      if (!user.password) {
        throw new Error("Invalid credentials");
      }

      const passwordsMatch = await bcyrpt.compare(password, user.password);

      if (!passwordsMatch) {
        throw new Error("Invalid credentials");
      }
      const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
      };

      return userData;
    },
  }),
];
export const authConfig: any = {
  providers,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ user, account }: { user: any; account: any }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, given_name, family_name, image, id } = user;
          const firstName = name || given_name || "";
          const lastName = family_name || "";
          console.log(user);
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
            const user = await prisma.user.create({
              data: {
                email,
                name,
                phone_number: 0,
              },
            });
          } else {
            return true;
          }
        } catch (err) {
          throw new Error("Invalid credentials");
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
};
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
