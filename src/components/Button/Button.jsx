import React from 'react'

const Button = ({text,color,callBack}) => {
  return (
    <button style={{color:color}} onClick={callBack}>{text}</button>
  )
}

export default Button