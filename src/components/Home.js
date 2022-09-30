import React, { useState } from 'react'
import './Home.css'
import Sidebar from './Sidebar'

// Modal
import Modal from 'react-modal'
Modal.setAppElement("#root")

const Home = () => {

  const [controle, setControle] = useState(true)
  const [isOn, setIsOn] = useState(true)
  const [lista, setLista] = useState([1,2,3,4,5,6,-7,-8,-9]) // se tiver off, recebe um numero negativo do esp.
  const [appear, setAppear] = useState(false)

  const [modal, setModal] = useState(false)
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto"
    },
    
  }

    const handleEvent = () => {

        setControle(!controle)
        console.log("I am there " + controle)

    }

    const handleButtonEvent = () => {
      setIsOn(!isOn)
      console.log("Pressing this " +isOn )
    }

    const handleClose = () => {
      setModal(false)
    }

    const handleOpen = () => {
      setModal(true)
    }

  return (
    <div>
      <button onClick={handleButtonEvent}  >Mudança</button>
      <button onClick={handleOpen}  >MODAL</button>

      <div className='teste'>

      
      {lista.map((num, index) => 
        (num % 4 === 0 ? (
        <button className="quadrado-online" onClick={() => {
          console.log("Meu numero é o: " + index)
          setAppear(index)
          setModal(true)
        }} >
          <p className='quartos' >Quarto {index}</p>
          
        </button>) 
        : 
        (<button className="quadrado-offline" onClick={() => {
          console.log("Meu numero é o: " + index)
          setAppear(index)
          setModal(true)
        }} >
          <p className='quartos' >Quarto {index}</p>
        </button>))
      )}

      

         <Modal 
          isOpen={modal}
          onRequestClose={handleClose}
        >
          <h1>Bem vindo ao quarto {appear}</h1>
        </Modal>  

        

        
      </div>
    </div>
  )
}

export default Home