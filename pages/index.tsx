import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Center from "../components/Center";
import SideBar from "../components/SIdeBar";

interface Props {
  session: Session
}
const Home: NextPage = (props) => {
  const {data:session, status} = useSession();
  
   
  const handleSession = async()=>{
    const k =  await getSession();
    console.log(`Session is ::::: ${k?.user?.name}`)
  }
   
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


// "@types/next-auth": "^3.15.0",


// export const getServerSideProps: GetServerSideProps<{
//   session: Session | null
// }> = async (context) => {
//   return {
//     props: {
//       session: await getSession(context),
//     },
//   }
// }