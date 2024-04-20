import React from 'react'
import LeftLayout from './LeftLayout'
import RightLayout from './RightLayout'

const Login = () => {
  return (
    <div className='grid max-[480px]:grid-cols-1 grid-cols-9  gap-2 sm:gap-8  max-w-screen-lg mx-auto  place-items-center min-h-screen'>
      <LeftLayout/>
      <RightLayout/>
    </div>
  )
}

export default Login
