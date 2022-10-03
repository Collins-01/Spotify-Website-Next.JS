// import NextAuth, { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import SpotifyProvider from "next-auth/providers/spotify";
// import  { LOGIN_URL } from "../../../lib/spotify";



// const handleRefreshToken = (token:JWT)=>{
//   try {
    
//   } catch (error) {
//     console.log(`Error :::: ${error}`);

//     return {
//       ...token,
//       error: 'RefreshAccessTokenError'
//     }
//   }
// }







 


// export const nextAuthOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
//       clientSecret: process.env.NEXT_PUBLIC_SECRET ?? "",
//       authorization: LOGIN_URL,
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
    
//   //  async jwt(params) {
//   //     if(params.token && params.user){
//   //       return {
//   //         accessToken: params.account?.access_token,
//   //         accessTokenExpires: Date.now() + params.account?.expires_at *10000,
//   //         refreshToken: params.account?.refresh_token,
//   //       }
//   //     }

//   //     // Return previous token if the access token has not expired yet
//   //     if (Date.now() < params.account?.expires_at) {
//   //       return params.token;
//   //     }

//   //   },
   
//   },
//   secret: process.env.JWT_SECRET
// };


// export default NextAuth(nextAuthOptions);
// "next-auth": "^4.12.2",