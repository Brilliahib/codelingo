import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuthApiHandler } from "@/http/auth/get-auth";
import { loginApiHandler } from "@/http/auth/login";
import { LoginType } from "@/validators/auth/login-validator";
import { Auth } from "@/types/auth/auth";

declare module "next-auth" {
  interface User {
    token?: string;
  }

  interface Session {
    user: Auth;
    access_token: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as LoginType;
        if (!email || !password) return null;

        try {
          const user = await loginApiHandler({
            email,
            password,
          });

          if (!user) return null;
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.access_token = user.token;
        token.sub = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const access_token = token.access_token as string;
      const auth = await getAuthApiHandler(access_token);

      return { ...session, user: auth, access_token };
    },
  },
};

const authHandler = NextAuth(authOptions);

export default authHandler;
