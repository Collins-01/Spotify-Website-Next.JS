import { ChevronDown } from "heroicons-react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistsAtom";
import { customGet } from "../utils/customGet";
import { isAuthenticated } from "../utils/isAuthenticated";

import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [color, setColor] = useState<string>();
  const session = useSession();
  const getSinglePlaylist = async () => {
    const session = await getSession();
    if (!(await isAuthenticated(session))) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const res = await customGet(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      session
    ).catch((err) => {
      console.log(`Error fetching single playlists with id :::: ${err}`);
    });
    setPlaylist(res);
  };
  // * useEffect
  useEffect(() => {
    setColor(shuffle(colors).pop());
    getSinglePlaylist();
  }, [playlistId]);
  const userImage =
    "https://images.unsplash.com/photo-1604164448130-d1df213c64eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={() => signOut()}
        >
          <img className="rounded-full w-10 h-10" alt="" src={userImage} />
          <h2>{session.data?.user?.name}</h2>
          <ChevronDown className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {playlist !== null && playlist !== undefined ? (
          <img
            className="h-44 w-44 shadow-2xl"
            alt=""
            src={playlist.images && `${playlist.images[0].url}`}
          />
        ) : (
          <div />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold'>{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs/>
      </div>
    </div>
  );
};

export default Center;
