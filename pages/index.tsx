import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Center from "../components/Center";
import SideBar from "../components/SIdeBar";
import IPlaylistType from "../types/playlist_type";
import { customGet } from "../utils/customGet";
import { isAuthenticated } from "../utils/isAuthenticated";

interface Props {
  playlists: IPlaylistType[];
}

function Home({ playlists }: Props) {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        {/* SideBar */}

        <SideBar featuredPlaylists={playlists} />
        <Center />
        <p className="text-white">{}</p>
      </main>
      <div>{/* Player */}</div>
    </div>
  );
}

export default Home;

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

  const featuredPlaylists = await customGet(
    "https://api.spotify.com/v1/me/playlists",
    session
  );
  console.log(featuredPlaylists.items);
  return {
    props: {
      playlists: featuredPlaylists?.items,
    },
  };
};
