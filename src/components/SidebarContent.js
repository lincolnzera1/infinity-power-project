import './SidebarContent.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { MdOutlineMenuBook, MdOutlineContactSupport } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

const SidebarContent = () => {
  return (
    <div className='principal1'>
        <div> <Link to='/' className='links'>
          <div> 
            <span>
              <span><MdOutlineMenuBook color='white' className='svg' size={20} /></span> Visão geral
            </span> 
          </div>
          </Link>
        </div>
        <div><span><MdOutlineContactSupport className='svg' size={20} /> Suporte</span></div>  
        <div><span> <CgProfile size={20} className='svg'/> Perfil</span></div>
    </div>
  )
}

export default SidebarContent