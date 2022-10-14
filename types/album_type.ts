import Artist from "./artist_type";
import Image from "./image_type";
import Track from "./track_type";
export default interface Album {
  id: string;
  name: string;
  artists: [Artist];
  images?: [Image];
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: Track[];
  };
}
