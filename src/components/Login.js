import React, { useState } from 'react'
import './Login.css'

// Icons
import { HiOutlineMail } from 'react-icons/hi'
import { FaLock } from 'react-icons/fa'
import Logo from './Logo'

// Routes
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const useHandleSubmit = (e) => {
        e.preventDefault()

        navigate('/home')
        

    }

  return (
    <div className='container'>
        <Logo />
        <form action="" onSubmit={useHandleSubmit}>
            <div className="child">
                <div className="inputs">
                    <HiOutlineMail size={40} color='white' className="icon-input"/>
                    <input type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="inputs">
                    <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock size={35} color='white' className='icon-input'/>
                </div>
                <input type="submit" value='LOGIN'/>
                <a href="##"><p>Esqueceu a senha?</p></a>
            </div>
        </form>
    </div>
  )
}

export default Login