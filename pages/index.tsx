import type { NextPage } from "next";
import Center from "../components/Center";
import SideBar from "../components/SIdeBar";

const Home: NextPage = () => {
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
