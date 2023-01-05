import React from 'react'
import './HowWorkFeature.css'
function HowWorkFeature({icon, title, text}) {
  return (
    <div className='cr__features-container__feature'>
        <div className='cr__features-container__feature-icon'>
            <i className={icon}/>
        </div>
        <div className='cr__features-container__feature-title'>
            <div>
                <h1>{title}</h1>         
            </div>
        </div>
        <div className='cr__feateres-container__feature-text'>
                <p>{text}</p>         
        </div>
    </div>
  )
}

export default HowWorkFeature