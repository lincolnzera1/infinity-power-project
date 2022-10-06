import './SidebarContent.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { MdOutlineMenuBook, MdOutlineContactSupport } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

const SidebarContent = (props) => {
  return (
    props.tamanho === 'grande' ?
    (<div className='principal1'>
      <div> <Link to='/' className='links'>
        <div> 
          <span>
            <span><MdOutlineMenuBook color='white' className='svg' size={20} /> Visão geral</span> 
          </span> 
        </div>
        </Link>
      </div>
      <div><span><MdOutlineContactSupport className='svg' size={20} /> Suporte</span></div>  
      <div><span> <CgProfile size={20} className='svg'/> Perfil</span></div>
  </div>) 
    : 
    (<div className='principal1'>
      <div> <Link to='/' className='links'>
        <div> 
          <span>
            <span><MdOutlineMenuBook color='white' className='svg' size={30} /></span> 
          </span> 
        </div>
        </Link>
      </div>
      <div><span><MdOutlineContactSupport className='svg' size={30} /> </span></div>  
      <div><span> <CgProfile size={30} className='svg'/> </span></div>
  </div>)
  )
}

export default SidebarContent