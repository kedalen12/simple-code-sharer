import React from 'react'
import CodeViewer from './CodeBlock'
import { SaveCodeBlock } from '../firebase'
type Props = {
    callBackOnButtonPress: (where: 'creator' | 'about') => void
}

import { useRouter } from 'next/router'

const Themes = ["a11yDark",
"a11yLight",
"anOldHope",
"androidstudio",
"arta",
"atomOneDark",
"atomOneLight",
"codepen",
"dracula",
"far",
"github",
"googlecode",
"hopscotch",
"hybrid",
"irBlack",
"monoBlue",
"monokaiSublime",
"monokai",
"nord",
"obsidian",
"ocean",
"paraisoDark",
"paraisoLight",
"pojoaque",
"purebasic",
"railscast",
"rainbow",
"shadesOfPurple",
"solarizedDark",
"solarizedLight",
"sunburst",
"tomorrowNightBlue",
"tomorrowNightBright",
"tomorrowNightEighties",
"tomorrowNight",
"tomorrow",
"vs2015",
"xt256",
"zenburn"]

const Languages =   ['bash',
'c',
'clojure',
'cpp',
'csharp',
'dart',
'elixir',
'elm',
'erlang',
'fsharp',
'graphql',
'go',
'groovy',
'haskell',
'html',
'java',
'javascript',
'jsx',
'julia',
'kotlin',
'lisp',
'makefile',
'matlab',
'objectivec',
'ocaml',
'php',
'python',
'r',
'ruby',
'rust',
'scala',
'sql',
'swift',
'tsx',
'typescript']
function SnippetCreate({callBackOnButtonPress }: Props) {

    const [currentCode, setCode] = React.useState('')
    const [isSending, setIsSending] = React.useState(false)
    const [currentLang, setCurrentLang] = React.useState('bash');
    const [currentTheme, setCurrentTheme] = React.useState('a11yDark');
    const [title, setTitle] = React.useState('');
  const router = useRouter()

    const onPaste = (e:KeyboardEvent) => {
      if(isSending) return;
        if (
            (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) ||
            e.key === 'Meta' ||
            e.key === 'Shift' ||
            e.key === 'Control' ||
            e.key === 'Alt'
          ) {
            return;
          }

          if(e.key === 'v' || e.key === 'V') {
            navigator.clipboard.readText().then(t => {

                

                setCode(t)
            }).catch(err => {
                console.error('Failed to read ', err)
            })
          }
    }
    React.useEffect(() => {

      window.addEventListener('keydown', onPaste)
     
      return () => {
        window.removeEventListener('keydown',onPaste)
      }
    
    }, [])
    
    const SaveBlock = async (e:any) => {


        setIsSending(true)
        const c = currentCode;
        setCode('')
        const result = await SaveCodeBlock({code: currentCode, language: currentLang, theme: currentTheme, title: title})
        if(result.valid){
          router.push(result.url!.toString())
          return
        }
        alert('Ooops! Something went wrong')
      

    }

    if(isSending)  {
      return (
      <div className='flex flex-col relative text-center md:text-left  h-screen md:flex-row max-w-7xl px-10 justify-evenly mx-auto  items-center'>

      <div>
      <div className='z-30 md:mb-0 flex-shrink-0 space-y-10
            rounded-full object-cover md:rounded-lg "'>     

                <button className='bg-[#F7AB0A]/40 w-full py-5 px-10 rounded-md text-black font-bold text-lg
                transition-all delay-200 hover:bg-[#F7AB0A]'
                onClick={SaveBlock}
                >{'Saving Snipett...'}</button> 
        </div>
        </div>
        </div>
    )
      }
    return (
        <div className='flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 
        justify-evenly  mx-auto  items-center space-y-10'>

            <div>
              
                <div className='flex-shrink-0'>
                {currentCode.length <= 0&& <h1 className='p-10 text-5xl font-semibold uppercase'>PASTE YOUR CODE  [CTRL + V]</h1>}
                
                {currentCode.length > 0 && (
                  <div className='flex space-x-2'>
                    <input type={'text'} placeholder='Snippet Title' value={title} onChange={(e)=> setTitle(e.target.value)} className="contactInput mb-5 w-full uppercase"/>
                    <select className="contactInput mb-5 w-full uppercase" onChange={(e) => {setCurrentLang(e.target.value)}}>
                       {Languages.map((language,i) => {
                          return <option key={i} className='bg-gray-500 text-white uppercase' value={language}>{language}</option>;
                       })}
                    </select>
                    <select className="contactInput mb-5 w-full uppercase" onChange={(e) => {setCurrentTheme(e.target.value)}}>
                       {Themes.map((theme,i) => {
                          return <option key={i} className='bg-gray-500 text-white uppercase'  value={theme}>{theme}</option>;
                       })}
                    </select>
                    </div>

                ) }

                {currentCode.length > 0 && <CodeViewer code={currentCode} language={currentLang} theme={currentTheme}/>}



                {currentCode.length > 0 && (
                  <div className='flex space-x-2'>
                    <button className='bg-red-500/40 w-full py-5 px-10  mt-5 rounded-md text-black font-bold text-lg
                transition-all delay-200 hover:bg-red-500'
                onClick={() => {setCode('')}}
                >{'DISCARD SNIPPET'}</button>

<button className='bg-[#F7AB0A]/40 w-full py-5 px-10  mt-5 rounded-md text-black font-bold text-lg
                transition-all delay-200 hover:bg-[#F7AB0A]'
                onClick={SaveBlock}
                >{'SAVE SNIPPET'}</button>
                    </div>

                ) }
            </div>
            </div>
        </div>
    )
}

export default SnippetCreate