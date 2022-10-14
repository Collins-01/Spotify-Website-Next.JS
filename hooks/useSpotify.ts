import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyAPI from "../lib/spotify";

function useSpotify() {
  const { data: session } = useSession();

    const handler = async()=>{
      if(!session){
        const newSession = await getSession();
        // SpotifyAPI.setAccessToken(newSession?.user.access_token);
      }
      if(session){
        // SpotifyAPI.setAccessToken(session.user.);
        SpotifyAPI.play()
      }
    }
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      
    }
  }, [session]);

  return SpotifyAPI;
}

export default useSpotify;
