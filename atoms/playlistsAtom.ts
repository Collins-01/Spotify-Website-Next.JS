import { atom } from "recoil";
import IPlaylistType from "../types/playlist_type";

export const playlistState = atom<IPlaylistType | null| undefined>({
  key: "playlistState",
  default: null,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1DX5trt9i14X7j",
});
