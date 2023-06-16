import PostState from '@/context/PostState'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'


export default function App({ Component,
  pageProps:{session, ...pageProps} }) {
  return(
  
  <SessionProvider session={session}>
    <PostState>
  <Component {...pageProps} />
  </PostState>
  </SessionProvider>
  )
}
