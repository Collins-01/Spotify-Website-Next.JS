import React from "react";
import IPlaylistType from "../types/playlist_type";
import Song from "./Song";

interface Props {
  playlist?: IPlaylistType | null;
}

function Songs({ playlist }: Props) {
  return (
    <div className="px-6 flex flex-col mt-3 space-y-2 pb-28 text-white">
      {playlist?.tracks?.items?.map((item, i) => (
        <Song track={item.track} key={item.track.id} />
      ))}
    </div>
  );
}

export default Songs;
