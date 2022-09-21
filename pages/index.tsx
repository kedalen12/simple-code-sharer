import { User } from 'firebase/auth'
import type { NextPage } from 'next'
import Head from 'next/head'
import About from '../components/About'
import SnippetCreate from '../components/CreateSnippet'
import Header from '../components/Header'
import { useAuth } from '../stores/AuthContext'
import {useState} from 'react'

const Home: NextPage = () => {

  const {authState, user, logOut } = useAuth()
  const [isCreatingSnippet, setIsCreatingSnippet] = useState(false)

  const OnChangeScreenRequest = (goTo: 'about' | 'creator') => {
     setIsCreatingSnippet(goTo === 'creator')
  }

  return (
    <div
    className='bg-[rgb(36,36,36)]  text-white h-screen snap-y snap-mandatory overflow-y-hidden  overflow-x-hidden z-0'
    >
      <Head>
        <title>Dev.Io</title>
      </Head>
      <Header/>

      <section id="about" className='snap-center'>
        {!isCreatingSnippet ? <About callBackOnButtonPress={OnChangeScreenRequest} /> : <SnippetCreate callBackOnButtonPress={OnChangeScreenRequest}/>}
      </section>
    </div>
  )
}

export default Home
