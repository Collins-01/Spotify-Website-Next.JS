import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistsAtom";
import IPlaylistType from "../types/playlist_type";
import Song from "./Song";

function Songs() {
  const playlistItem = useRecoilValue(playlistState);
  return (
    <div className="px-6 flex flex-col mt-3 space-y-2 pb-28 text-white">
      {playlistItem?.tracks?.items?.map((track, i) => (
        <Song track={track.track} key={`$${i}`} order={i} />
      ))}
    </div>
  );
}

export default Songs;
