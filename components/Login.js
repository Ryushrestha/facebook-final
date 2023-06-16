import { Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import React from 'react'

const Login = () => {
  return (
    <div className=' h-screen w-auto justify-center flex flex-row items-center'>
        <img src='./logo1.png' className='w-1/3 h-1/3 flex my-auto'/>
    <div className='flex flex-col border border-gray-400 py-6 px-8 rounded-md shadow-md shadow-gray-800'>

        <form className='block '>
            <div className='flex flex-col mt-5'>
                <label>Email</label>
                <input type='email' placeholder='user@email.com' className='rounded-md border border-solid border-zinc-300 px-4 py-1 shadow-sm shadow-gray-500' onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className='flex flex-col mt-5'>
                <label>Password</label>
                <input type='password' placeholder='password@123' className='rounded-md border border-solid border-zinc-300 px-4 py-1 shadow-sm shadow-gray-500' onChange={(e)=>setPassword(e.target.value)} />
            </div>
        </form>
        <Button
        onClick={(e)=>signIn('google',e.preventDefault())}
        className=' rounded-md border border-gray-400 shadow-md shadow-gray-500 mt-8'
            variant="oauth"
            mb={2}>
            <img src="./googlelogo.png" className='h-5 me-2'/>
            Sign in with Google
        </Button>
        <br></br>

        <span>
            <h3>Don't have an accout yet?</h3>
            <a href='/signup' className='text-blue-900 hover:underline'>Signup</a>
        </span>
    </div>
</div>
  )
}

export default Login