import React, { useState } from 'react'
import './Home.css'
import Sidebar from './Sidebar'

const Home = () => {

  const [controle, setControle] = useState(true)

    const handleEvent = () => {

        setControle(!controle)
        console.log("I am there " + controle)

    }

  return (
    <div className='teste'>
      
      <Sidebar /> 
      <div className='quadrado'>Quarto 1</div>
      <div className='quadrado'>Quarto 2</div>
      <div className='quadrado'>Quarto 3</div>
      <div className='quadrado'>Quarto 4</div>
      <div className='quadrado'>Quarto 5</div>
      <div className='quadrado'>Quarto 6</div>


        

        
    </div>
  )
}

export default Home