import React from 'react'
import './formButton.css'
const BUTTON_TYPE_CLASSES = {
    google: 'google',
    normal: 'normal',
}

function FormButton({children, buttonType, ...otherProps}) {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
        {children}
    </button>
  )
}

export default FormButton