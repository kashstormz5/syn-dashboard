import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { getAuthSecret } from "@/lib/env";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  secret: getAuthSecret(),
  pages: {
    signIn: "/"
  },
  providers: [
    Discord({
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds"
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      if (profile && "id" in profile) {
        token.discordId = String(profile.id);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.discordId === "string" ? token.discordId : token.sub ?? "";
      }

      session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined;
      return session;
    }
  }
});
