import React from 'react'

const Button = ({children, className, type}) => {
  return (
    <button type={type} className={`${className} font-semibold px-4 py-2 text-white rounded-2xl`}>
        {children}
    </button>
  )
}

export default Button