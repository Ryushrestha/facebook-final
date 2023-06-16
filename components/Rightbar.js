import React from 'react'
import Advertise from 'components/Advertise'


const Rightbar = () => {
  
  return (
    <div className='flex flex-col fixed'>
      <Advertise/>
      <hr className='my-3 border border-y-2 border-gray-400'></hr>
      
    </div>
  )
}

export default Rightbar