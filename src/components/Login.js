import React, { useState } from 'react'
import './Login.css'

// Icons
import { HiOutlineMail } from 'react-icons/hi'
import { FaLock } from 'react-icons/fa'
import Logo from './Logo'

// Routes
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// Axios
import axios from 'axios'

// toast
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [list, setList] = useState([])

    let navigate = useNavigate();

    const notifySucess = (message) => {
        toast.success(message , 
            {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
            })
    };

    const notifyError = (message) => {
        toast.error(message , 
            {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
            })
    };

    const useHandleSubmit = (e) => {
        e.preventDefault()

        
        axios.get("http://localhost:3000/accounts").then((response) => {
            console.log("Everything is ok")
            //console.log(Object.values(response.data))
            for(var i in response.data){
                console.log("o i é: " + (parseInt(i) + 1))
                console.log("lenght é : " + response.data.length)
                if((response.data)[i]["email"] === email){
                    
                    if((response.data)[i]["password"] !== password){
                        notifyError("A senha não corresponde")
                        break
                    }else if((response.data)[i]["password"] === password){
                        navigate('/home')
                    }
                }else{
                    console.log((response.data)[i]['email'])
                    if((parseInt(i)+1) ===  response.data.length){
                        console.log("dwqjidwqji")
                        notifyError("Email incorreto!")
                    }   
                }
            }
            

        }).catch((err) => console.log("A error has happened: " + err))
        
        

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
                <Link to="/registro"><p>Cadastre-se</p></Link>
                {/* <button onClick={notifySucess}>Clique em mim</button> */}
                <ToastContainer pauseOnFocusLoss={false} newestOnTop={true}/>
            </div>
        </form>
    </div>
  )
}

export default Login