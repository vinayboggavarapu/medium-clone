import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <header className='flex justify-between p-5 max-w-7xl w-full mx-auto text-m'>
        <div className="flex items-center space-x-5">
            <Link href="/">
                <Image src="/medium.png" className="w-44 object-contain cursor-pointer" alt="logo" height={300} width={300}/>
            </Link>
            <div className="hidden md:inline-flex space-x-5 items-center">
              <h3>About</h3>
              <h3>Contact</h3>
              <h3 className='text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer '>Follow</h3>
            </div>
        </div>
        <div className='flex items-center space-x-5 text-green-600'>
          <h3 className='cursor-pointer'>Sign In</h3>
          <h3 className= ' border cursor-pointer text-green-600 border-green-600 rounded-full py-2 px-4'>Get Started</h3>
        </div>
        
    </header>
 
  )
}

export default Navbar