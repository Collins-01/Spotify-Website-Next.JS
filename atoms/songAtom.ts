import { atom } from "recoil";

export const currentTrackIdState = atom<string | null | undefined>({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
