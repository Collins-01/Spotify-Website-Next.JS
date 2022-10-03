import { NextPage } from "next";
import { Provider } from "next-auth/providers";



function Login(providers: Provider) {
    return (
        <div>
            <h1>Login Page</h1>
            <img
                className='w-52 mb-5'
                src=''
                alt='' />
                {
                    Object.values(providers).map((e)=>(
                        <div>
                            <button>{e}</button>
                         </div>
                    ))
                }
        </div>
    );
}

export default Login;