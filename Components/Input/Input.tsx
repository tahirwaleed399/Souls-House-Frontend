import React, { InputHTMLAttributes } from 'react'
interface IPROPS extends InputHTMLAttributes<HTMLInputElement>{
    
}
const Input = (props:IPROPS) => {
  return (
    <input {...props}  className={'normalInputField'+ ' ' + props.className} />
  )
}

export default Input