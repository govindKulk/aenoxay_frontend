import React, { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import Input from './IInput'
import Button from './Button'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../../store/userStore'

const RightLayout = () => {

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
    } = useForm();

    console.log(errors)
    const navigator = useNavigate();
    const {isLoggedin, setIsLoggedin} = useUserStore();

    useEffect(() => {
      if(isLoggedin){
        navigator('/profile?edit=true')
      }
    }, [isLoggedin])

    const handleFormSubmit = async (data) => {
      try {
        console.log(data)

      const res = await fetch("/user/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        
        },
        body: JSON.stringify(data)
      });

      const resData = await res.json();
      if(res.status === 201 ){
        setIsLoggedin(true);
      }

      console.log(resData);
      }catch(error){
        console.log(error)
      }
    }
  return (
    <div className='col-[span_5] w-full  p-8   '>

      <div className='md:max-w-[70%] md:mx-auto '>
        <h1 className='text-2xl font-bold py-2'> Sign up to Dribble </h1>
        {
          errors && <ul className='text-rose-500 text-sm font-bold list-disc pl-4 py-2'>
            {errors.name && <li>{errors.name.message}</li>}
            {errors.username && <li>{errors.username.message}</li>}
            {errors.email && <li>{errors.email.message}</li>}
            {errors.password && <li>{errors.password.message}</li>}
            {errors.tc && <li>{errors.tc.message}</li>}
          </ul>
        }
        <div className='text-right'>Already a member? <Link className='text-blue-500' to={'/signup'}> Sign In</Link></div>
        <form className='py-4' onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='grid grid-cols-2 gap-x-4 py-2'>

            <Input label="Name" id="name" register={register} isError={errors?.name && errors.name} isRequired />
            <Input label="Username" id="username" register={register} isError={errors?.username && errors.username} isRequired />
          </div>
          <div className=' py-2'>

            <Input type="email" label="Email" id="email" register={register} isError={errors?.email && errors.email} isRequired />
          </div>
          <div className=' py-2'>

            <Input label="Password" id="password" type="password" placeholder="6+ characters" register={register} isError={errors?.password && errors.password} isRequired />
          </div>
          <div className=' my-2 flex gap-2 items-start'>

            <input className='self-start min-w-6' id="tc" type="checkbox" {...register('tc', { required: "Please select terms and conditions check."})}  />
            <p className='text-sm'>By creating account with us you aggree to our <span className='text-blue-500 cursor-pointer'>Terms of service</span> and <span className='text-blue-500 cursor-pointer'>Privacy and Policies</span></p>
          </div>
          <div className=' py-2 flex gap-2 items-start'>

            <Button label="Create Account" type="submit" />

          </div>
        </form>
      </div>

    </div>
  )
}

export default RightLayout
