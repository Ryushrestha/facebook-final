


// const inter = Inter({ subsets: ['latin'] })

import Aside from "@/components/Aside"
import Login from "@/components/Login"
import Navbar from "@/components/Navbar"
import Rightbar from "@/components/Rightbar"
import Singlepost from "@/components/Singlepost"
import { useSession } from "next-auth/react"

export default function Home() {
  const {data:session} = useSession()

  if(!session){
    return <Login/>
  }
  return (
  <>
    <div className='flex flex-col '>
          <div className='w-screen px-8 py-5 shadow-md shadow-gray-500 fixed bg-white'>
            <Navbar/>
          </div>

          <div className='flex flex-row my-20'>
            <span className='w-1/6 mt-3 ms-3 px-5 h-full shadow-md shadow-gray-500 py-4 rounded bg-white '>
            <Aside/>
            </span>
            <div className='mt-3 mx-auto px-6 w-6/12 '>
            <Singlepost/>
            </div>
            <div className='mt-3 px-6 w-3/12'>
                <Rightbar/>
            </div>
          </div>
        </div>
</>
  )
}
