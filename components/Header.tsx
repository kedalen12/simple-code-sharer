import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
type Props = {}

function Header({ }: Props) {
    return (
        <header className='bg-[rgb(40,40,40)] sticky top-0 p-5 flex items-start justify-between mx-auto z-50 xl:items-center'>
            <motion.div 
            className='flex flex-row items-center min-w-full justify-evenly'
            initial={{opacity: 0,}}
            animate={{opacity: 1,}}
            transition={{duration: 3}}
            >
                <Link href={'/'}>
                <h3 className='uppercase tracking-[30px] cursor-pointer transition-all delay-200 hover:tracking-[50px] hover:font-extrabold hover:text-white font-semibold text-white/60 text-3xl'>DEV.IO</h3>
                </Link>
            </motion.div>
        </header>
    )
}

export default Header