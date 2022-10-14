import { SwitchHorizontal } from "heroicons-react";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import { customGet, HTTPMETHOD } from "../utils/customGet";

function Player() {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState<number>(50);
  const { data: session, status } = useSession();
  const songInfo = useSongInfo();
  const handlePlay = async () => {
    const session = await getSession();
    const response = await customGet(
      `https://api.spotify.com/v1/me/player/play`,
      session,
      HTTPMETHOD.PUT,
      {
        context_uri: songInfo?.uri,
        offset: {
          position: 5,
        },
        position_ms: 0,
      }
    );
    console.log(`RESPONSE FROM PLAYING ${JSON.stringify(response)}`);
  };
  return (
    <div className="w-screen  h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left Hand Side of the Player */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          onClick={handlePlay}
          alt=""
          src={`${songInfo?.album.images[0].url}`}
        />
        <div className="flex flex-col">
          <h3 className="text-white font-semibold">{songInfo?.name}</h3>
          <p className="text-white">{songInfo?.artists[0].name}</p>
        </div>
      </div>
      {/* Center */}
      <div>
        <SwitchHorizontal className="w-5 h-5" />
      </div>
    </div>
  );
}

export default Player;
