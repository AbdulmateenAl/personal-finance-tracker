import React, { useContext } from 'react'

import { FcGoogle } from "react-icons/fc";

import { authContext } from '../lib/store/auth-context';

function SignIn() {
    const { googleLoginHandler } = useContext(authContext);
    // need to work on it
  return (
    <main className='flex flex-col container max-w-2xl px-6 mx-auto'>
        <h1 className='mb-6 text-6xl font-bold text-center'>Welcome 👋</h1>
        <div className='flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-xl'>
            <div className='h-52 w-full'>
                <img className='object-cover w-full h-full'
                src='https://images.unsplash.com/photo-1498050108023-c5249f4df085'/>
            </div>
            <div className='m-5 text-center text-xl'>
                <h2>Please sign in to continue</h2>
            </div>
            <button onClick={googleLoginHandler} className='flex bg-gray-700 mb-3 mx-auto text-center justify-center items-center rounded-md w-32 py-4'><FcGoogle size={24} className='mr-2'/>Google</button>
        </div>
    </main>
  )
}

export default SignIn