import { useLogoutMutation } from '@/apis/authApi'
import { useLoader } from '@/Hooks/useLoader'
import { User } from '@/Interfaces/User'
import { getUser, setUser } from '@/Slices/auth'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Navigation = () => {
 const user:User = useSelector(getUser);
 const router = useRouter();
 const [logout , state] = useLogoutMutation();
 const dispatch = useDispatch();
 const loadingVars = useMemo(()=>({
  loading : "Wait Logging You Out",
  success : "Logged Out"
 }),[]);
 const onSuccess = useCallback(function (){

    dispatch(setUser(null));

  router.push('/')
 }, []);
 useLoader(state , loadingVars,onSuccess);
 

  return (
    <div >
       <nav className='w-full flex justify-between items-center py-7 px-4 sm:px-0'>
       <Link href={'/'} className="logo flex gap-2 ">
            <Image src={'/Images/emoji.png'} width={25} height={25} alt='logo'></Image>
            <h1 className='font-semibold'>Souls House</h1>
        </Link>
       {
        user &&  <div className='flex gap-4 items-center'>
      <div className='flex items-center flex-col'>
          <Image className=' border-4 border-my-blue w-10 h-10 rounded-full center-me object-contain' src={user.profile? user.profile.url : '/Images/user.png' as any} width={40} height={40} alt='profile image'></Image>
        <span >{user.name}</span>

      </div>

      <button onClick={logout} className=" btn-sm btn-secondary">
        Log out
      </button>
      </div>
       }
       </nav>
    </div>
  )
}

// export default Navigation
export default dynamic (() => Promise.resolve(Navigation), {ssr: false})