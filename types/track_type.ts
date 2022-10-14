import Album from "./album_type";
import Artist from "./artist_type";
export default interface Track {
  id: string;
  name: string;
  album: Album;
  artists: [Artist];
  duration_ms: number;
  preview_url: string;
  uri?: string;
}
