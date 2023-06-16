import React, { useEffect, useState } from 'react'
import {onSnapshot,collection,query,orderBy} from 'firebase/firestore'
import PostBar from 'components/PostBar'
import { db, } from '@/lib/firebase'
import Collections from '@/components/Collections'
import { useSession } from 'next-auth/react'


const Singlepost = () => {
  const { data: session } = useSession();
    const [posts,setPosts] = useState([])

    // useEffect(
    //     () =>
    //       onSnapshot(
    //         query(collection(db, "posts"), orderBy("timestamp", "desc")),
    //         (snapshot) => {
    //           setPosts(snapshot.docs);
    //         }
    //       ),
    //     [db]
    //   )
    useEffect(
      () =>
        onSnapshot(
          query(collection(db, "posts"), orderBy("timestamp", "desc")),
          (snapshot) => {
            setPosts(snapshot.docs);
          }
        ),
      [db]
    );
      console.log(posts)
  return (
    <div className='w-full  flex flex-col'>
    <PostBar/>
    {posts.map((post)=>(
        <Collections key={post.id} id={post} post={post.data()}/>
    ))}
    </div>
  )
}

export default Singlepost