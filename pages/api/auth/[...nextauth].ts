import NextAuth, { Account, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import  spotifyWebApi,{ LOGIN_URL } from "../../../lib/spotify";


const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

// *Handles Refreshing of the access token..
const handleRefreshToken = async(token:JWT,account:Account)=>{
  try {
    spotifyWebApi.setAccessToken(account.access_token as string);
    spotifyWebApi.setRefreshToken(account.refresh_token as string);
    // TODO: set RefreshToken
    const {body: refreshedToken} = await spotifyWebApi.refreshAccessToken();
    console.log(`REFRESHED TOKEN IS : ${refreshedToken}`);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken : refreshedToken.refresh_token ?? account.refresh_token,
    };
  } catch (error) {
    console.log(`Error :::: ${error}`);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}


export const nextAuthOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID  as string,
      clientSecret: process.env.NEXT_PUBLIC_SECRET as string,
      authorization: LOGIN_URL,
      
      
    }),
  ],
  pages: {
    // signIn: "/login",
  },
  callbacks: {
   async jwt({token, account, user}) {
    console.log(`-------------JWT METHOD --------`)
    const expiresAt = account?.expires_at ?? 3600;
    //* If Initial SignIn
    //* Check for Account and User not null 
      // if(account && user){
      //   return {
      //     ...token,
      //     accessToken: account?.access_token,
      //     refreshToken: account?.refresh_token,
      //     name : account.providerAccountId,
      //     accessTokenExpires: Date.now() + expiresAt *1000,  //*Handling expiry time in milliseconds i.e * 1000
      //   }
      // }
      // //* Return previous token if the access token has not expired yet
      // if (Date.now() < expiresAt) {
      //   console.log('EXISTING TOKEN IS VALID');
      //   return token;
      // }
      // return await handleRefreshToken(token, account!);

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
