import NextAuth, { Account, NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyWebApi, { LOGIN_URL } from "../../../lib/spotify";

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

async function refreshAccessToken(token: Account) {
  try {
    spotifyWebApi.setAccessToken(String(token.accessToken));
    spotifyWebApi.setAccessToken(String(token.refreshToken));

    const { body: refreshedToken } = await spotifyWebApi.refreshAccessToken();

    console.log("Refreshed token is", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SECRET as string,
      authorization: {
        params: { scope },
      },
    }),
  ],
  pages: {},
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.JWT_SECRET as string,
  debug: true,
};

export default NextAuth(nextAuthOptions);
