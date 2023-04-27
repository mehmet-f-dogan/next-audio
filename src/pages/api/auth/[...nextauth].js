import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const res = await fetch(process.env.AUTH_URL, {
            method: "POST",
            body: JSON.stringify({
              ...credentials,
              domain: process.env.DOMAIN,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();
          if (res.ok && user) {
            return user;
          }
        } catch (ignored) {}
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, user: user };
      }
      return token;
    },

    async session({ session, token }) {
      return { ...session, user: token.user };
    },
  },
};

export async function getServerSideSession(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  return session;
}

export default NextAuth(authOptions);
