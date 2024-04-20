import React from 'react'
import { BiSolidError } from 'react-icons/bi'

const Input = ({
    label,
    id,
    register = () => "good",
    isRequired,
    placeholder,
    isError,
    type = "text"

}) => {
    return (
        <div className=''>

            {label && 
            <label htmlFor='name' className='flex flex-row gap-1 items-center text-black text-lg font-bold'>
                {isError && <BiSolidError size={20} color="red" />}
                {label}
            </label>}
            <input
                type={type}
                id={id}
                placeholder={placeholder ? placeholder : label}
                {...register(id, { required: isRequired ? `${label} is required field` : false })}
                className='w-full my-2 py-3 px-4  border-none bg-gray-200/80 rounded-md' />
        </div>
    )
}

export default Input
