import React, { useState } from 'react'
import './Sidebar.css'
import { AiOutlineMenu } from 'react-icons/ai'
import SidebarContent from './SidebarContent'

const Sidebar = (props) => {

    const [controle, setControle] = useState(false)
    const handleEvent = () => {
        setControle(!controle)
        console.log("HAve a good")
    }
    

    return (
        <div>
            
                
                {controle ? 
                    (<div className='Sidebar'>
                        <AiOutlineMenu color='white' size={35} onClick={handleEvent} />
                        <SidebarContent tamanho='grande' />
                    </div>)
                    :
                    (<div className='Sidebar-mini'>
                        <AiOutlineMenu color='white' size={35} onClick={handleEvent} />
                        <SidebarContent tamanho='pequeno' />
                    </div>)}
            
            
            
        </div>
    )
}

export default Sidebar