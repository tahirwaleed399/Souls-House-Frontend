import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
    <div >
       <nav className='w-full flex justify-between items-center py-7 px-4 sm:px-0'>
       <Link href={'/'} className="logo flex gap-2 ">
            <Image src={'/Images/emoji.png'} width={25} height={25} alt='logo'></Image>
            <h1 className='font-semibold'>Souls House</h1>
        </Link>
       </nav>
    </div>
  )
}

export default Navigation