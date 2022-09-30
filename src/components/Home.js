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

  const [modal, setModal] = useState(false)
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto"
    }
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
    <div className='teste'>

      <button onClick={handleButtonEvent}  >Mudança</button>
      <button onClick={handleOpen}  >MODAL</button>

      {lista.map((num) => 
        (num < 0 ? (<button className="quadrado-online" onClick={handleOpen} ></button>) 
        : 
        (<button className="quadrado-offline" onClick={handleOpen} ></button>))
      )}

      

      <Modal 
        isOpen={modal}
        onRequestClose={handleClose}
      >
        <h1>dkqowpdkpoqwdkopwq</h1>
        <button onClick={handleClose} >gogogo</button>
        <h2>dqwkopdkopwqkop</h2>
      </Modal>

        

        
    </div>
  )
}

export default Home