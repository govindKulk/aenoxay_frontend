import React from 'react'
import Logo from '../Logo'

const LeftLayout = () => {
  return (
    <div className='col-span-4  bg-[#f2d184] p-4 md:p-8'>

      <div className='px-2 md:px-8'>
        <div className='py-2'>
        <Logo />
        </div>
        <h1 className='font-bold text-xl sm:text-2xl text-gray-600 py-2'>Discover the worlds top Designers & Creatives</h1>

      </div>
      <div className='w-full lg:min-w-[450px] py-4'>
        <img src={'assets/login_pic.png'} alt='login-pic' className='w-full' />
      </div>

      <p className='underline text-xs text-slate-600'>Art By Peter Tarks</p>
    </div>
  )
}

export default LeftLayout
