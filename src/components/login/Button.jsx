import React from 'react'

const Button = ({
    label,
    type = "button",
    onClick
}) => {
  return (
    <button className='bg-[#ea4b8b] border-none rounded-xl md:min-w-[200px] p-2 text-center flex items-center justify-center text-lg text-white font-bold' type={type} onClick={onClick ? onClick : (e) => {}}>
      {label}
    </button>
  )
}

export default Button
