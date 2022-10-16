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

  // DATE()
  var meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto",
    "Setembro","Outubro",
    "Novembro","Dezembro"
  ];
  const mes = new Date().getMonth().toString()
  
  const customStyles = {
    content: {
      background: "#f5f6f8",
      padding: "0 150px 50px 150px"
      /* top: "50%",
      left: "50%",
      right: "auto",
      marginRight: '-50%',
      transform: "translate(-50%, -50%)"
      
      */
     
    }
  }

  const pieStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      marginRight: '-50%',
      transform: "translate(-50%, -50%)",
    
      
     
    }
  }

  // Pie Chart
  const pieData = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  
  const pieOptions = {
    title:"Consumo de energia em " + meses[mes],
    
    titleTextStyle: {
      color: 'black',
      fontSize: 20,
      alignment: 'center',
    },
    
    curveType: "function",
    legend:{
      alignment: 'start'
    },
    hAxis: {
      title: "dia do mês",
      titleTextStyle: {
        color: 'black',
        fontSize: 23,
        bold: true
      },
      minorGridlines: {
        color: 'red'
      }
    },

    vAxis: {
      title: "Potência em kWh",
      titleTextStyle: {
        color: 'gray',
        fontSize: 23,
        bold: true
      },
      gridlines: {
        count: 5,
        color: 'black'
      }
    },
    
    width:"1200",
    series: {
      0: {color: 'blue', lineWidth: 4}
    },
    trendlines:{
      0: {
        color: 'red'
      }
    }
    
  };



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

    // Chart and loadData

    const [chartData, setChartData] = useState([])
    const [priceChart, setPriceChart] = useState([])
    const [totalKwh, setTotalKwh] = useState(0)
    const [priceTotalKwh, setPriceTotalKwh] = useState(0)
    var cont = 0
    var contPrice = 0

    const loadData = (data) => {
      const values = _.groupBy(data, (value) => {
        return value.dia
      })
      
      // Essas linhas me ajudaram a pegar o mes de cada dia
      /* var lista = []
      for(var i in Object.keys(values)){
        console.log(Object.keys(values)[i].split(","))
        lista = lista.concat(Object.keys(values)[i].split(","))
        
      }
      console.log("A lista nesse momento: " , lista) */
      

      const result = _.map(values, (value, key) => {

        // Key já são os dias agrupados
        // Value são todos os dados do json

        return [
          key.split(',', 1)[0],
          //key.split(",")[1], // Mes que o dado cchegou, caso precise.
          _.sumBy(values[key], (v) => {

            // Os valores de v são cada linha dos dados, mas no caso ele ta pegando só os "data" no .data
            //console.log("Valor: " + v.data + " Mês: " + v.mes)
            
            return parseInt(v.data)
          })
          ,
        ]
      })

      console.log("result", result)
      

      // Pega o valor total dos kwh
      for(var i in result){
        console.log("SEU RESULT: " + result[i][1]) 
        cont += result[i][1]
      }
      setTotalKwh(cont)
      
      
      

      return [
        ["dia", "Consumo/dia"], ...result
      ]
    }
    

    const loadPriceData = (data) => {
      const values = _.groupBy(data, (value) => {
        console.log("value: ", value.dia, value.mes)
        return value.dia
      })
      console.log('values', Object.keys(values))
      
      const result = _.map(values, (value, key) => {

        // Key já são os dias agrupados
        // Value são todos os dados do json

        return [
          key,
          //key.split(",")[1], // Mes que o dado cchegou, caso precise.
          _.sumBy(values[key], (v) => {
            // Os valores de v são cada linha dos dados, mas no caso ele ta pegando só os "data" no .data
            //console.log("Valor: " + v.data + " Mês: " + v.mes)

            return ((parseInt(v.data)/1000)*0.4)*7.3
          })
          ,
        ]
      })

      //console.log("result", result)

      // Pega o valor total dos kwh em REAIS
      for(var i in result){
        console.log("SEU RESULT: " + result[i][1]) 
        contPrice += result[i][1]
      }
      setPriceTotalKwh(contPrice)

      

      return [
        ["dia", "gasto/dia em R$"], ...result
      ]
    }

    const getData = async () => {



      await axios.get("https://dqwdwqdwqdwq.herokuapp.com/accounts/").then((response) => {

        console.log("Everything is ok")
        //console.log(Object.values(response.data))
        setChartData(loadData(response.data))

        setPriceChart(loadPriceData(response.data))

        //console.log((response.data)[0])
        /* for(var i in response.data){
          
          setStatus("Offline")
          if(dataList.includes((response.data)[i].data)){

          }else{
            setDataList([...dataList, (response.data)[i].data])
            console.log("A lista é: " + dataList)
            console.log("Novo item: " + (response.data)[i].data)
          }
          
        } */
      }
    
    
      ).catch((err) => console.log("A error has happened: " + err))
    }

    useEffect(() => {

      

      getData()
      
      // Pega todos os dados a cada 5 segundos
       const interval = setInterval(() => {
        getData()
      }, 2000000);

      return () => clearInterval(interval) 
    }, [totalKwh])

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
              <div className="contain">
                <Chart
                  chartType="PieChart"
                  data={chartData}
                  options={pieOptions}
                  width={"100%"}
                  height={"400px"}          
                  customStyles={pieStyles}      
                />
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
             <div className="modal">
              <h1>Bem vindo ao quarto {appear}</h1>
              <h2>Status: {status}</h2>
             </div>

              <div className="linha-dentro-coluna">
                <div className="modal-azul">
                  <h4>Total kWh de {meses[mes]}</h4>
                  <p>{totalKwh} kWh</p>
                </div>

                <div className="modal-azul">
                  <h4>Total gasto de {meses[mes]}</h4>
                  <p>R$ {priceTotalKwh.toFixed(2)}</p>
                </div>
              </div>
              
              <Chart
                chartType="LineChart"
                data={chartData}
                options={pieOptions}
                width={"100%"}
                height={"400px"}          
                customStyles={customStyles}      
              />

              <Chart
                chartType="LineChart"
                data={priceChart}
                options={pieOptions}
                width={"100%"}
                height={"400px"}
              />

          </Modal>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Home