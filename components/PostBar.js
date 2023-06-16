import { db, storage } from '@/lib/firebase'

import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { signOut, useSession } from 'next-auth/react'
import  { useRef, useState } from 'react'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'



const PostBar = () => {
  const { data: session } = useSession()
  const [text, setText] = useState('')
  const [loading, isLoading] = useState(false)
  const [file, setFile] = useState(null)
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false)



  const uploadPost = async () => {
    if (loading)
      return
    isLoading(true)

    const docRef = await addDoc(collection(db, "posts"), {
      id:session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      text: text,
      tag:session.user.tag,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (file) {
      await uploadString(imageRef, file, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    isLoading(false)
    setText('')
    setFile(null)
    setShowEmojis(false)
  };
  const addImage = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (Event) => {
      setFile(Event.target.result)
    }
  }

 
  const addEmoji = (e) => {
    let sym = e.unified.split("-")
    let codesArray = []
    sym.forEach((el) => codesArray.push("0x" + el))
    let emoji = String.fromCodePoint(...codesArray)
    setText(text + emoji)
}

  return (
    <div className={`px-4 py-3 border border-solid border-zinc-300 rounded-md shadow-md shadow-gray-500 block w-full${loading && "opacity-50"} bg-white`}>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-3'>
          <img src={session?.user?.image} className='h-12 w-12 rounded-full' onClick={signOut} />
          <input placeholder='whats on your mind' className='bg-zinc-300 text-black px-4 rounded-md h-12 w-full flex-wrap' value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <hr className='mt-2' />
        {
          file && (
            <div className='relative mx-auto my-3'>
              <div className='absolute w-8 h-8 rounded-sm cursor-pointer border border-solid border-gray-400 items-center justify-center flex' onClick={() => setFile(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <img src={file} alt='' className='max-h-80 rounded-xl object-contain' />
            </div>
          )
        }
        {
          !loading && (
            <div className='flex justify-between '>
              <div className='flex flex-row justify-evenly gap-5'>
                <span className='flex flex-row gap-2 items-center' onClick={() => filePickerRef.current.click()}>
                  <label htmlFor='file' ><img src='./camera.png' className='h-8 cursor-pointer' /></label>
                  <input type='file' id='file' hidden onChange={addImage} ref={filePickerRef}/>
                  <h1>Photos/Videos</h1>
                </span>

                <span className='flex flex-row gap-2 items-center'>
                  <button onClick={() => setShowEmojis(!showEmojis)} ><img src='./emoji.png' className='h-7 cursor-pointer' /></button>

                  <h1>Feelings</h1>
                </span>
              </div>
              <div className='mt-2.5'>
                <button className='text-white cursor-pointer bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center items-center disabled:opacity-50 disabled:cursor-default'
                  disabled={!text.trim() && !file}
                  onClick={uploadPost}
                >Post</button>
              </div>
            </div>
          )
        }
          {showEmojis && (
                        <div className='absolute mt-20'>
                            <Picker
                                onEmojiSelect={addEmoji}
                                data={data}

                                theme="dark"
                            />
                        </div>
                    )}

      </div>
    </div>
  )
}

export default PostBar

