import React from 'react'
import  logoo  from '../assets/infinity.png'
import './Logo.css'

const Logo = () => {
  return (
    <div>
        <div className='logo'>
          <img src={logoo} alt="" />
        </div>
    </div>
  )
}

export default Logo