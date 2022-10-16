import { NextPage } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  const handleSignIn = async () => {
    await signIn("spotify", {
      callbackUrl: "http://localhost:3000",
    }).catch((e) => {
      console.log(`Errror ::: ${e}`);
    });
  };
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-52 mb-5"
        src="/images/spotify_logo.webp"
        alt="Spotify Logo"
      />
      <div>
        <button
          className="px-20 pt-5 pb-5 bg-green-600 rounded-full items-center text-white"
          onClick={handleSignIn}
        >
          SignIn
        </button>
      </div>
    </div>
  );
};

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
