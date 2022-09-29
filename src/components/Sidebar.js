import React, { useState } from 'react'
import './Sidebar.css'
import { AiOutlineMenu } from 'react-icons/ai'

const Sidebar = (props) => {

    const [controle, setControle] = useState(false)
    const handleEvent = () => {
        setControle(!controle)
        console.log("HAve a good")
    }
    

    return (
        <div>
            
                
                {controle ? 
                    (<div className='Sidebar'><AiOutlineMenu color='white' size={55} onClick={handleEvent} /></div>)
                    :
                    (<div className='Sidebar-mini'><AiOutlineMenu color='white' size={55} onClick={handleEvent} /></div>)}
            
            
            
        </div>
    )
}

export default Sidebar