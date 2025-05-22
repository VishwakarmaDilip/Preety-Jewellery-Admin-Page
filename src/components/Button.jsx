import React from 'react'

const Button = ({children, className, type, textColor,onClick}) => {
  return (
    <button type={type} onClick={onClick} className={`${className} ${textColor?"":"text-white"} cursor-pointer font-semibold px-4 py-2 rounded-2xl`}>
        {children}
    </button>
  )
}

export default Button