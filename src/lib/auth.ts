import { ISODateString, NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};
export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
};

const users = [
  {
    id: "1",
    name: "Monir",
    email: "admin@gmail.com",
    password: "admin6",
    role: "admin",
    avatar: "img",
  },

  {
    id: "2",
    name: "User",
    email: "user@gmail.com",
    password: "user12",
    role: "user",
    avatar: "img",
  },
];

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
      async authorize(credentials: any, req: any) {
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        // return { ...token, ...user };
        user.role = user.role == null ? "user" : user.role;
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      // return {
      //   ...session,
      //   username: token.email,
      // };
      session.user = token.user as CustomUser;
      return session;
    },
  },
};
