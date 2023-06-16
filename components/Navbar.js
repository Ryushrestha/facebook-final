"use client"
import { useSession } from 'next-auth/react'
import React from 'react'


const Navbar = () => {
    const {data : session} = useSession()
  
    return (
    
        <div className='flex flex-row justify-between h-11 items-center'>
            <div className=' flex align-middle'>
                <a href='/'><img src='./logo1.png' className='h-8' /></a>
                <input type='search' placeholder='Search' className='rounded-2xl  ms-6 border border-solid border-zinc-300 px-4 shadow-sm shadow-gray-500 ' />
            </div>
            <div className='flex flex-row gap-6 rounded-3xl px-5  bg-gray-800  text-white shadow-md shadow-black align-middle items-center'>
                <img src={session?.user?.image} className='rounded-full w-10 h-10 align-middle items-center'/>
                <span className='flex flex-col '>
                    <h3 className='font-semibold'>{session?.user?.name}</h3>
                    <h4 className='font-medium text-slate-400'>{session?.user?.email}</h4>
                </span>
            </div>
        </div>
    )
}

export default Navbar