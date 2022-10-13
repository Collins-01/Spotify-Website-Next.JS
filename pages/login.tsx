import { NextPage } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";


const Login: NextPage = () =>{
    const {data: session, status} = useSession();
    const handleSignIn = async()=>{
        await signIn().catch((e)=>{
          console.log(`Errror ::: ${e}`)
        });
    }
  return (
    <div className='place-items-center'>
        
      <img
        className="w-52 mb-5"
        src="https://imgs.search.brave.com/iU0U9bV0_moWfz1-uErg-TNbeENmtyYTXoXIcfZ8KMk/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly9ham91/cm5leWludG9zb3Vu/ZC5kZS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMi9zcG90/aWZ5X2xvZ28ucG5n"
        alt=""
      />
      <div>
        <button className='px-20 pt-5 pb-5 bg-green-600 rounded-full items-center text-white' onClick={handleSignIn}>SignIn</button>
        
      </div>
      
    </div>
  );
}

export default Login;


// export async function getServerSideProps(){
//   //  
//   const providers = await getProviders();
//   return {
//     props: {
//       providers,
//     }
//   };
// }