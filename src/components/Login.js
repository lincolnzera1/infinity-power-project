import React from 'react'
import './Login.css'

// Icons
import { HiOutlineMail } from 'react-icons/hi'
import { FaLock } from 'react-icons/fa'

const Login = () => {
  return (
    <div className='container'>
        <form action="">
            <div className="child">
                <div className="inputs">
                    <HiOutlineMail size={40} color='white' className="icon-input"/>
                    <input type="text" placeholder='E-MAIL'/>
                </div>
                <div className="inputs">
                    <input type="password" placeholder='SENHA'/>
                    <FaLock size={35} color='white' className='icon-input'/>
                </div>
                <input type="submit" value='LOGIN'/>
                <a href="#"><p>Esqueceu a senha?</p></a>
            </div>
        </form>
    </div>
  )
}

export default Login