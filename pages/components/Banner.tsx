import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className='flex justify-around w-full max-w-7xl mx-auto bg-yellow-400 border-b border-black py-5 lg:py-10'>
        <div className='flex flex-col justify-center px-5 space-y-5'>
            <h2 className='text-6xl  max-w-xl w-full font-serif'><span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read and connect</h2>
            <p>It's easy and free to post your thinking on any topic and connect with millions of readers</p>
        </div>
        <div className='flex items-center justify-center '>
            <Image src="/M.png" className='hidden md:inline-flex w-fit h-32 lg:h-full' height={700} width={700}/>
        </div>
    </div>
  )
}

export default Banner