import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { addUser, getUserByEmail } from "./lib/database/queries/users";
import { authConfig } from "./auth.config";
import bcrypt from "bcryptjs";

interface Credentials {
  email: string;
  password: string;
}

const authOptions: NextAuthConfig = {
  ...authConfig,
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const user = await getUserByEmail(credentials.email as string);

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.password) {
            throw new Error("Invalid credentials");
          }

          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          if (error instanceof Error && error.message === "User not found") {
            console.error("User not found");
            throw new Error("User not found");
          }

          console.error("Error during authorization:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account?.provider === "google") {
        try {
          let dbUser = await getUserByEmail(credentials?.email as string);
          console.log(dbUser, "hea");
          if (!dbUser) {
            addUser({
              googleId: account.providerAccountId,
              name: profile?.name as string,
              email: user.email as string,
            });
          }
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist user ID in token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
