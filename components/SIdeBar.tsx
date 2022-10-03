import {
  HeartOutline,
  HomeOutline,
  LibraryOutline,
  PlusCircleOutline,
  RssOutline,
  SearchOutline,
} from "heroicons-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import useSpotify from "../hooks/useSpotify";
// const spotifyApi= useSpotify();

const SideBar = () => {
  // const {data:session, status} = useSession();
  const [playLists, setPlaylist] = useState([]);

    useEffect(()=>{},[])

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide  h-screen">
      {/* Items */}
      <div className="space-y-4">
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
        <p className='cursor-pointer hover:text-white'>Playlist name ...</p>
        <p className='cursor-pointer hover:text-white'>Playlist name ...</p>
        <p className='cursor-pointer hover:text-white'>Playlist name ...</p>
        <p className='cursor-pointer hover:text-white'>Playlist name ...</p>
        <p className='cursor-pointer hover:text-white'>Playlist name ...</p>
        <p className='cursor-pointer hover:text-white'>Playlist name ...</p>
        <p className='cursor-pointer hover:text-white'>Playlist name ...</p>
      </div>
    </div>
  );
};

export default SideBar;
