
import React, { useState } from 'react'
import PostContext from './PostContext';

const PostState = ({children}) => {
    const [postProduct,setPostProduct]= useState([]);

  return (
    <PostContext.Provider value={[postProduct,setPostProduct]}>
        {children}
    </PostContext.Provider>
  )
}

export default PostState