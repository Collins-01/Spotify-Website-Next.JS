import type { NextPage } from "next";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Center from "../components/Center";
import SideBar from "../components/SIdeBar";

interface Props {
  session: Session
}
const Home: NextPage = (props) => {
  const {data:session, status} = useSession();
  
  
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        {/* SideBar */}
        <SideBar />
        <Center/>
      </main>
      <div>
        {/* Player */}
      </div>
    </div>
  );
};

export default Home;
