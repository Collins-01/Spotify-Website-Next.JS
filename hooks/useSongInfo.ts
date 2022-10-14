import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import { customGet } from "../utils/customGet";
import Track from "../types/track_type";

function useSongInfo() {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<Track | null>(null);

  const fetchSongInfo = async () => {
    if (currentTrackId) {
      const session = await getSession();
      const trackInfo = await customGet(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        session
      );
      console.log(trackInfo);
      setSongInfo(trackInfo);
    }
  };
  useEffect(() => {
    fetchSongInfo();
  }, [currentTrackId]);

  return songInfo;
}

export default useSongInfo;
