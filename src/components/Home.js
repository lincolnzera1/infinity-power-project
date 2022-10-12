import React, { useEffect, useState } from 'react'
import './Home.css'
import Sidebar from './Sidebar'

// react-google-charts
import { Chart } from 'react-google-charts'

// lodash
import _ from 'lodash';

// Axios
import axios from 'axios'

// Modal
import Modal from 'react-modal'
Modal.setAppElement("#root")





const Home = () => {

  const [controle, setControle] = useState( true )
  const [isOn, setIsOn] = useState(true)
  const [lista, setLista] = useState([1,-2,3,4,-5,6,7,+8,-9]) // se tiver off, recebe um numero negativo do esp.
  const [appear, setAppear] = useState(false)
  const [status, setStatus] = useState("")
  const [bedroomsOnline, setBedroomsOnline] = useState(0)


  const [modal, setModal] = useState(false)
  const customStyles = {
    content: {
      /* top: "50%",
      left: "50%",
      right: "auto",
      marginRight: '-50%',
      transform: "translate(-50%, -50%)", 
      [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
    [8, 0, 0],
    [9, 0, 0],
    [10, 0, 0],
    [11, 0, 0],
    [12, 0, 0],
    [13, 0, 0],
    [14, 0, 0],
    [15, 0, 0],
    [16, 0, 0],
    [17, 0, 0],
    [18, 0, 0],
    [19, 0, 0],
    [20, 0, 0],
    [21, 0, 0],
    [22, 0, 0],
    [23, 0, 0],
    [24, 11, 5],
      
      */
    }
  }



  const [dataList, setDataList] = useState([])
  const data = [
    ["x", "hoje", "ontem"],
      


  ];

  const options = {
    hAxis: {
      title: "Horas/dia/",
    },
    vAxis: {
      title: "Consumo",
    },
    series: {
      1: { curveType: "function" },
    },
  };

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

    const loadData = (data) => {
      const values = _.groupBy(data, (value) => {
        return value.dia;
      })

      console.log('values', values)
    }

    const getData = async () => {



      await axios.get("https://dqwdwqdwqdwq.herokuapp.com/accounts/").then((response) => {

        console.log("Everything is ok")
        //console.log(Object.values(response.data))
        for(var i in response.data){
          //loadData(response.data)
          setStatus("Offline")
          if(dataList.includes((response.data)[i].data)){

          }else{
            setDataList([...dataList, (response.data)[i].data])
            console.log("A lista é: " + dataList)
            console.log("Novo item: " + (response.data)[i].data)
          }
          
        }
      }
    
    
      ).catch((err) => console.log("A error has happened: " + err))
    }

    useEffect(() => {

      

      getData()

      
      // Pega todos os dados a cada 5 segundos
       const interval = setInterval(() => {
        getData()
      }, 5000);

      return () => clearInterval(interval) 
    },)

  return (
    <div>
      <div className="zero">
        <Sidebar />
        <div className="coluna">
          <div className="linha-dentro-coluna">
            <div className='quadrado' >
              <p>Quantidade de quartos</p>
              <span>{lista.length}</span>
            </div>
            <div className="quadrado">

              <p>Quartos Online</p>
              <span>
              {lista.filter(nr => nr > 0).length}
              </span>

            </div>
            <div className="quadrado">
              <p>Quartos offline</p>
              <span>{lista.filter(nr => nr < 0).length}</span>
            </div>
          </div>
          <div className="teste">
            {lista.map((num, index) => 
              (num < 0 ? (<button className="quadrado-online" onClick={() => {
                setAppear(index)
                setStatus("Offline")
                setModal(true)
              }} >
                <p>Quarto {index}</p>
              </button>) 
              : 
              (<button className="quadrado-offline" onClick={() => {
                setAppear(index)
                setStatus("Online")
                setModal(true)
              }} >
                <p>Quarto {index}</p>
              </button>))
            )}
            <Modal
              style={customStyles}
              isOpen={modal}
              onRequestClose={handleClose}
            >
              <h1>Bem vindo ao quarto {appear}</h1>
              <h2>Status: {status}</h2>
              
              <Chart
                chartType="LineChart"
                data={data}
                width="100%"
                height="400px"
              options={options}
              legendToggle
            />

          </Modal>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Home