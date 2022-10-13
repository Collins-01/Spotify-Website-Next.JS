import {
  HeartOutline,
  HomeOutline,
  LibraryOutline,
  PlusCircleOutline,
  RssOutline,
  SearchOutline,
  SwitchVerticalOutline,
} from "heroicons-react";
import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistsAtom";
import IPlaylistType from "../types/playlist_type";
import { customGet } from "../utils/customGet";
import { isAuthenticated } from "../utils/isAuthenticated";

interface Props {
  featuredPlaylists: IPlaylistType[];
}

const SideBar = ({ featuredPlaylists }: Props) => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  useEffect(() => {}, []);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide  h-screen">
      {/* Items */}
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signIn("spotify")}
        >
          <SwitchVerticalOutline className="h-5 w-5" />
          <p>Login</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeOutline className="h-5 w-5" />
          <p>Home</p>
        </button>

        {/* Search */}

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchOutline className="h-5 w-5" />
          <p>Search</p>
        </button>

        {/* Library */}

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryOutline className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* ANOTHER SECTION */}

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleOutline className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        {/* Search */}

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartOutline className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>

        {/* Library */}

        <button className="flex items-center space-x-2 hover:text-white">
          <RssOutline className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* My Playlists */}
        {featuredPlaylists.map((e) => (
          <p
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(e.id)}
            key={e.id}
          >
            {e.name}
          </p>
        ))}

        {/* <p className="cursor-pointer hover:text-white">Playlist name ...</p>
        <p className="cursor-pointer hover:text-white">Playlist name ...</p>
        <p className="cursor-pointer hover:text-white">Playlist name ...</p>
        <p className="cursor-pointer hover:text-white">Playlist name ...</p>
        <p className="cursor-pointer hover:text-white">Playlist name ...</p>
        <p className="cursor-pointer hover:text-white">Playlist name ...</p>
        <p className="cursor-pointer hover:text-white">Playlist name ...</p> */}
      </div>
    </div>
  );
};

export default SideBar;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // https://api.spotify.com/v1/browse/featured-playlists?country=IN
  const featuredPlaylists = await customGet(
    "https://api.spotify.com/v1/me/playlists",
    session
  );
  console.log(featuredPlaylists);
  return {
    props: {
      featuredPlaylists,
    },
  };
};
