import React from 'react'
type Props = {
    callBackOnButtonPress: (where: 'creator' | 'about') => void
}

function About({callBackOnButtonPress }: Props) {

    const [buttonText, setButtonText] = React.useState('SHARE A SNIPPET NOW!')

    return (
        <div className='flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 
    justify-evenly  mx-auto  items-center'>

            <div>
                <div className='z-30 -mb-20 md:mb-0 flex-shrink-0 space-y-10 h-auto
            rounded-full object-cover md:rounded-lg "'>
                <h1 className='text-7xl font-semibold uppercase'>A new way to share code</h1>
                <button className='bg-[#F7AB0A]/40 w-full py-5 px-10 rounded-md text-black font-bold text-lg
                transition-all delay-200 hover:bg-[#F7AB0A]'
                onMouseEnter={() => { setTimeout(() => setButtonText('NO ACCOUNT REQUIRED'),199) }}
                onMouseLeave={() => {setTimeout(() => setButtonText('SHARE A SNIPPET NOW!'),199)}}
                onClick={() => callBackOnButtonPress('creator')}
                >{buttonText}</button>                
            </div>
            </div>
        </div>
    )
}

export default About