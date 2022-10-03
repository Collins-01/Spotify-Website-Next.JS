import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
// import spotifyApi from "../lib/spotify";

export default function useSpotify() {
    // const {data:session,status} = useSession();
    // useEffect(()=>{
    //     if(session){
    //         // If Refresh Access Token fails, direct the user to the signIn page to login again.
    //         if(session.error == 'RefreshAcessTokenError'){
    //             signIn();
    //         }
    //         // * spotifyApi.setAccessToken(session.user.setAccessToken)
    //         spotifyApi.setAccessToken('session.user.setAccessToken')
    //     }
    // },[session])

    return null;
}