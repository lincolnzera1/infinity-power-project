import React, { useState } from 'react'
import './Register.css'
import { FaLock } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { BsFillPersonFill } from 'react-icons/bs'
import Logo from './Logo'
import { useNavigate } from 'react-router-dom';

// Axios
import axios from 'axios'


const Register = () => {

    let navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        const data = {
            name: name,
            email: email,
            password: password
        }


        axios.post("http://localhost:3000/register", data).then(() => navigate("/")).catch((err) => console.log("A error has happened: " + err))
    }

  return (
    <div className='container'>
        <Logo />
        <form action="" onSubmit={handleSubmit}>
            <div className="child">
                <div className="inputs">
                    <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)}/>
                    <BsFillPersonFill size={35} color='white' className='icon-input'/>
                </div>
                <div className="inputs">
                    <HiOutlineMail size={40} color='white' className="icon-input"/>
                    <input type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="inputs">
                    <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock size={35} color='white' className='icon-input'/>
                </div>
                <input type="submit" value='Registrar'/>
            </div>
        </form>
    </div>
  )
}

export default Register