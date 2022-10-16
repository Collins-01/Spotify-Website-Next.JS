import { useRecoilState } from "recoil";

import React from "react";
import Track from "../types/track_type";
import { fmtMSS } from "../utils/formatDuration";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

interface Props {
  track?: Track | null;
  order: number;
}

function Song({ track, order }: Props) {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const playSong = () => {
    setCurrentTrackId(track?.id);
    setIsPlaying(true);
    // TODO :: c all spotify play method, and pass in the URI of the track
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          src={
            track === null ||
            typeof track === "undefined" ||
            track.album === null ||
            typeof track.album === "undefined" ||
            track.album.images === null ||
            typeof track.album.images === "undefined" ||
            track.album.images[0].url === null ||
            typeof track.album.images[0].url === "undefined"
              ? ""
              : track.album.images[0].url
          }
          alt=""
          className="h-10 w-10"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track?.name}</p>
          <p className="w-40">{track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track?.album.name}</p>
        <p>
          {track === null || typeof track === "undefined"
            ? "--"
            : fmtMSS(track?.duration_ms as number)}
        </p>
      </div>
    </div>
  );
}

export default Song;
