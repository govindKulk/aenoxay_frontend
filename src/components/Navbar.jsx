import React from 'react'
import Logout from './profile/Logout'
import { useUserStore } from '../store/userStore';

const Navbar = () => {
    const {isLoggedin} = useUserStore();
  return (
    <div className='flex flex-row gap-4 items-center justify-end px-4 py-4 '>
      {
        isLoggedin && <Logout/>
      }
    </div>
  )
}

export default Navbar
