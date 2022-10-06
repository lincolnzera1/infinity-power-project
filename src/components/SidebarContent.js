import './SidebarContent.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const SidebarContent = () => {
  return (
    <div className='principal'>
        <Link to='/' className='links'><div>Visão geral</div></Link>
        <div>Suporte</div>  
        <div>Perfil</div>
    </div>
  )
}

export default SidebarContent