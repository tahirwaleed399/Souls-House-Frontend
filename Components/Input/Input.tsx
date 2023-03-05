import React, { InputHTMLAttributes } from 'react'
interface IPROPS extends InputHTMLAttributes<HTMLInputElement>{
    
}
const Input = (props:IPROPS) => {
  return (
    <input className='normalInputField' {...props} />
  )
}

export default Input