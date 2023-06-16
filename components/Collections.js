
import { Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react'

import { useSession } from 'next-auth/react'
import React, {  useEffect, useState } from 'react'
import Moment from 'react-moment'

const Collections = ({ id, post }) => {
  const { data: session } = useSession()
  const [like,setLike] = useState(0)
  const [commentLikes,setCommentLikes] = useState(0)
  const [comment,setComment] = useState([])
  const [newComment, setNewComment] = useState('');
  const likeHandler = () => {
    setLike(like + 1)
  }

  const commentLike = (e) => {
    e.preventDefault()
    setCommentLikes(commentLikes + 1)
    
  }
  const commentHandler =(e) =>{
    e.preventDefault()
    if(newComment.trim() !== ''){
    setComment([...comment,newComment])
    setNewComment('')
  }

  }

  return (
    <div className='w-full border border-solid border-zinc-300 rounded-md shadow-md shadow-gray-500 px-4 py-3 mt-3 flex flex-col bg-white'>
      <div className='flex flex-row justify-between '>
        <div className='flex flex-row gap-3 items-center'>
          <img src={post?.userImg} className='rounded-full h-9 w-9 justify-center items-center' />
          <span className='flex flex-col'>
            <h3 className='font-semibold'>{post?.username}</h3>
            <span className='flex flex-row gap-1'>
              <h4 className='font-normal text-sm text-gray-500'>
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </h4>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
              </svg>

            </span>
          </span>
        </div>

        <div className='flex flex-row gap-3'>
          <span>
            <Menu className=''>
              <MenuButton>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </MenuButton>
              <MenuList className='bg-white px-4 py-3 rounded-md border border-solid border-gray-300 shadow-md shadow-gray-400'>
                <MenuItem className='flex flex-row gap-3 font-semibold py-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                  Save Post</MenuItem>
                <hr ></hr>
                <MenuItem className='flex flex-row gap-3 font-semibold py-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                  {`Follow ${post?.username}`}</MenuItem>
              </MenuList>
            </Menu>
          </span>
        </div>

      </div>

      <div className='flex flex-col'>
        <span className='ps-12'>
          <p>{post?.text}</p>
        </span>
        <img className='px-2 py-3' src={post?.image} />
      </div>

      <div className='flex flex-row justify-between'>
      {
        like > 0 && (
          <div className='flex flex-row gap-3 items-center'>
            <img src='./like.png' className='h-6 w-6 items-center' />
            {`You and ${like} others`}</div>
        )
      }
      
  
      </div>
      <hr className='mt-2' />
      <div className='flex flex-row justify-evenly py-2'>

        <button onClick={(e) =>{
          e.stopPropagation()
          likeHandler()}}>
          {like ? (
            <span className='flex flex-row gap-3 items-center'>
              <img src='./like.png' className='h-6 w-6 items-center' />
              <p className='font-semibold text-blue-600'>Liked</p>
            </span>) : (
            <span className='flex flex-row gap-3 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
              <p className='font-semibold text-gray-600'>Like</p>
            </span>)
          }
        </button>

        <button onClick={(e)=>{e.stopPropagation()
        openModal()
        }}>
        <span className='flex flex-row gap-3 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <p className='font-semibold text-gray-600'>Comment</p>
          </span>
        </button>

      </div>

      <hr />
      
      <div className='flex flex-row gap-3 mt-3'>
        <img src={session?.user?.image} className='rounded-full h-9 w-9 justify-center items-center' />
        <input placeholder='Comment in the post' className='bg-zinc-300 rounded-md px-4 py-2 w-full' onChange={(e)=>setNewComment(e.target.value)} />
        <span>
          <button className='items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'onClick={(e)=>commentHandler(e)}>Comment</button>
        </span>
      </div>
      <hr className='mt-3'></hr>
        {comment && comment.map((comment,index)=>(
          <div className='flex flex-col'>
            <div key={index} className='flex flex-row gap-3 mt-3'>
              <img src={post?.userImg} className='w-8 h-8 rounded-full'/>
              <p className='bg-zinc-200 px-4 rounded-md py-1.5'>{comment}</p>
            </div>
            <span className='ms-12'>
            <button className='text-sm text-blue-800 hover:underline' onClick={(e)=>commentLike(e)}>Like{`${' '}(${commentLikes})`}</button>
            </span>
            </div>
        ))}
    </div>
  )
}

export default Collections