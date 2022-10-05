import { ChevronDown } from "heroicons-react";
import { useEffect, useState } from "react";
import {shuffle} from 'lodash';
import { getSession, useSession } from "next-auth/react";

const colors =[
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]


const Center =()=>{
    const [color,setColor] =useState<string>();
    const {data:session, status} = useSession();

    const sss = async()=>{
      const k =  await getSession();
      console.log(`Session::::: ${k}`)
    }
   useEffect(()=>{
        setColor(shuffle(colors).pop())
        sss();
   },[])
    const userImage = "https://images.unsplash.com/photo-1604164448130-d1df213c64eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";
    const userName = session?.expires;
    // "Oriakhi Collins"
    return (
        <div className='flex-grow text-white'>
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img
                    className='rounded-full w-10 h-10'
                    alt="" src={userImage}/>
                    <h2>{userName}</h2>
                    <ChevronDown className="h-5 w-5"/>
                </div>
             </header>
             <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                {/* <img 
                alt="" 
                src=""/> */}
                <h1>Hello</h1>
                <h1>{session?.user?.name}</h1>
                <h1>{status}</h1>
             </section>
        </div>
    );
}

export default Center; 