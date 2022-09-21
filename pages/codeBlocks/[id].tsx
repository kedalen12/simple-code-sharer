import React from 'react'
import { motion } from 'framer-motion'
import CodeViewer from '../../components/CodeBlock'
import { GetCodeBlock } from '../../firebase'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../../components/Header'
type Props = {
    callBackOnButtonPress: (where: 'creator' | 'about') => void
}

function SeeCodeBlock() {
    
    const router = useRouter()
    const [code,setCode] = React.useState<{code:string, language:string, theme:string, title: string}>();
    React.useEffect(() =>{
        if(!router)return
        if(!router.query || !router.query['id']) return

        GetCodeBlock(router.query['id'].toString()).then(e => {
            if(!e.valid){
                alert('Error while fetching code block: ' + e.data)
                router.push('/')
                return
            }

            setCode(e.data)
        })
    } ,[router])

    if(!code) return <>Loading...</>
    return (
        <div
        className='bg-[rgb(36,36,36)]  text-white h-screen snap-y snap-mandatory overflow-y-hidden  overflow-x-hidden z-0'
        >
          <Head>
            <title>Snippet: {code.title}</title>
          </Head>
          <Header/>
        <div className='flex flex-col relative h-screen text-center max-w-7xl px-10 
        justify-center mx-auto  items-center space-y-10'>

            <div>
              
                <div className='flex-shrink-0'>
                <h1 className='p-10 text-5xl font-semibold uppercase'>{code.title} written in {code.language}</h1>

               <CodeViewer code={code.code} language={code.language} theme={code.theme}/>
               <div className='flex space-x-2'>

               <button className='bg-[#F7AB0A]/80 w-full py-5 mt-5 px-10 rounded-md text-black font-bold text-3xl
                transition-all delay-200 hover:bg-[#F7AB0A]' onClick={() => {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('The direct liknk to this snippet has been copied to your clipboard');
                    }).catch(alert)
                }}>SHARE</button>
                <button className='bg-[#F7AB0A]/80 w-full py-5 mt-5 px-10 rounded-md text-black font-bold text-3xl
                transition-all delay-200 hover:bg-[#F7AB0A]' onClick={() => {
                    navigator.clipboard.writeText(code.code).then(() => {
                        alert('The code has been copied to your clipboard');
                    }).catch(alert)
                }}>COPY</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default SeeCodeBlock