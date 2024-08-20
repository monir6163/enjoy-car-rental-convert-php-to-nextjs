import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Write your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Write your password",
        },
      },
      async authorize(credentials: any, req) {
        const user = {
          id: "1",
          name: "Monir",
          email: "admin@admin.com",
          password: "123456",
        };
        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, username: user.email };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        username: token.email,
      };
    },
  },
};
