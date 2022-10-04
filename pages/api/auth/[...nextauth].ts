import NextAuth, { Account, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
// import  { LOGIN_URL } from "../../../lib/spotify";
import  spotifyWebApi,{ LOGIN_URL } from "../../../lib/spotify";



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
  session: {
    strategy: "jwt",
    
  },
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
   async jwt(params) {
    const expiresAt = params.account?.expires_at ?? 3600;
    //* If Initial SignIn
    //* Check for Account and User not null 
      if(params.account && params.user){
        return {
          ...params.token,
          accessToken: params.account?.access_token,
          refreshToken: params.account?.refresh_token,
          name : params.account.providerAccountId,
          accessTokenExpires: Date.now() + expiresAt *1000,  //*Handling expiry time in milliseconds i.e * 1000
        }
      }
      //* Return previous token if the access token has not expired yet
      if (Date.now() < expiresAt) {
        console.log('EXISTING TOKEN IS VALID');
        return params.token;
      }

      return await handleRefreshToken(params.token, params.account!);

    },
   async session({session,user,token}) {
    console.log(`SESSIONS :::: ${session.user}`)
    console.log(`USER :::: ${user.name}`)
    console.log(`TOKEN :::: ${token.email}`)
      var name = session.user?.name;
      var email = session.user?.email
      var image= session.user?.image
      name = token.name;
      email = user.email;
      image= user.image;
      return session;
    },
   
  },
  secret: process.env.JWT_SECRET as string,
  
};


export default NextAuth(nextAuthOptions);
