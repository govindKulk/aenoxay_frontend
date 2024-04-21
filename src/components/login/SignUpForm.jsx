import React, { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import Input from './IInput'
import Button from './Button'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../../store/userStore'

const SignUpForm = () => {

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
        navigator('/profile')
      }
    }, [isLoggedin])

    const handleFormSubmit = async (data) => {
      try {
        console.log(data)

      const res = await fetch("/user/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        
        },
        body: JSON.stringify(data)
      });

      const resData = await res.json();
      if(res.status === 200 ){

        localStorage.setItem('token', resData.token);
        setIsLoggedin(true)
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

            {errors.username && <li>{errors.username.message}</li>}

            {errors.password && <li>{errors.password.message}</li>}
            {errors.tc && <li>{errors.tc.message}</li>}
          </ul>
        }
        <div className='text-right'>Dont have an account? <Link className='text-blue-500' to={'/register'}> Sign Up </Link></div>
        <form className='py-4' onSubmit={handleSubmit(handleFormSubmit)}>
     
          <div className=' py-2'>

            <Input type="username" label="username" id="username" register={register} isError={errors?.username && errors.username} isRequired />
          </div>
          <div className=' py-2'>

            <Input label="Password" id="password" type="password" placeholder="6+ characters" register={register} isError={errors?.password && errors.password} isRequired />
          </div>
          <div className=' my-2 flex gap-2 items-start'>

            <input className='self-start min-w-6' id="tc" type="checkbox" {...register('tc', { required: "Please select terms and conditions check."})}  />
            <p className='text-sm'>By logging in with us you aggree to our <span className='text-blue-500 cursor-pointer'>Terms of service</span> and <span className='text-blue-500 cursor-pointer'>Privacy and Policies</span></p>
          </div>
          <div className=' py-2 flex gap-2 items-start'>

            <Button label="Login" type="submit" />

          </div>
        </form>
      </div>

    </div>
  )
}

export default SignUpForm
