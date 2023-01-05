import React from 'react'
import './form-input.css'
function FormInput({label, ...otherProps}) {
  return (
    <div className='input-container'>
    { label && (
        <label>{label}</label>
        )}
        <input {...otherProps}/>
        
    </div>
  )
}

export default FormInput