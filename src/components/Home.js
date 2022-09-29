import React, { useState } from 'react'
import './Home.css'
import Sidebar from './Sidebar'

const Home = () => {

  const [controle, setControle] = useState(true)
  const [isOn, setIsOn] =useState(true)

    const handleEvent = () => {

        setControle(!controle)
        console.log("I am there " + controle)

    }

    const handleButtonEvent = () => {
      setIsOn(!isOn)
      console.log("Pressing this " +isOn )
    }

  return (
    <div className='teste'>
      
      <button onClick={handleButtonEvent} >Mudança</button>

      {isOn === true ? (<div className="quadrado-online"></div>) 
      : 
      (<div className="quadrado-offline"></div>)}

        

        
    </div>
  )
}

export default Home