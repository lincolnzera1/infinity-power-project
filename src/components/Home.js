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
  
  const lineOptions = {
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
    
    //width:"1200",
    series: {
      0: {color: 'blue', lineWidth: 4}
    },
    trendlines:{
      0: {
        color: 'red'
      }
    }
    
  };


  const pieOptions = {
    width: 400,

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

      // Separa em um array os nomes dos esps
      const espNomes = _.groupBy(data, "identificacao")
      console.log('esp', espNomes)

      const espDias = _.groupBy(data, "dia")
      const parte2 = _.map(espDias, (value, key) => {
        return [
          key,
          _.sumBy(espDias[key], (v) => {
            return parseInt(v.data)
          }),
          // aqui eu tenho  que passar o esp1
        ]
      })

      console.log('ESPDIAS', parte2)
      
    
      const ah = _.map(espNomes, (value, key) => {
        console.log('valores: ', espNomes[key])

        // Os valores agruparam os dados dos esps. Agora vou agrupar os dados dos dias já agrupados nos espes
        //
        //          O CÓDIGO ABAIXO
        // /** O codigo abaixo ja pega os os dados agrupados dos esps 1 e 2. */
        //      Depois ele pega esses dados, e já como o esp1 ja está só com os dados dele, ele pega os dias desse
        //      esp, e agrupa o dia com o total gasto somente com aquele esp.
        //      Separando assim, mais ou menos assim:
        //                                esp1: {
        //                                  13: 11,
        //                                  16: 110
      //                                  },  
        //                                esp2: {
        //                                  13: 10,
        //                                  16: 70,
        //                                  11: 15    
      //                                  },  
        //
        //
        //
        const xis = _.groupBy(espNomes[key], ('dia'))
        console.log("ARTE AQUI", xis)

        const segura = Object.keys(_.groupBy(data, "identificacao"))

        var cont = 0;
        const group = _.map(xis, (value, key) => {
          return [
            key.split(',', 1)[0],
            _.sumBy(xis[key], (v) => {
              return parseInt(v.data)
            }),
          ]
        })

        console.log(":D ", group)
        
      })
      
      

      // este código pega os dados de cada esp separado e soma.
      var sumList = []
      /* for(let i in espNomes){
        axios.get("http://localhost:3000/accounts/"+espNomes[i]).then((response) => {
          console.log("Pq eu passou 3 VEZES AQUI?")
          var sum = 0
          
          for(let j in response.data){
            //console.log(espNomes[i]+ ": " + response.data[j].data)
            sum += parseInt(response.data[j].data)
          }
          sumList.push(sum)

          const train2 = _.groupBy(response.data, "identificacao")

          const train = _.map(train2, (value, key) => {
            console.log("CARTA ABERTA:", value)

            return [
              key,
              _.sumBy(train2[key], (v) => {
                return parseInt(v.data)
              })
            ]

          })

          console.log("TRAIN", train)
        })
      } */

      for(let i in espNomes){
        axios.get("http://localhost:3000/accounts/"+espNomes[i]).then((response) => {
          const x = _.groupBy(response.data, "dia")
          // console.log("BEM vindo aos xmens", x)
      })
      }
      
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

        //console.log("####", values[key][0])

        // values[key] é {(dias agrupados) : "array com tudo"}, vai ter só os dados q tem o esp1 para esp1 e por ai vai.
        const q = _.sumBy(values[key], (v) => {
          //console.log("vVvvvvVV", v)
          
        })

        


        return [
          // Guarda a key e a soma da key em 1 array,
          // Depois faz isso com outra key e outra soma e guarda em outro array.


          key.split(',', 1)[0],
          //key.split(",")[1], // Mes que o dado cchegou, caso precise.

          // esse Sumby é tipo um for, percorrendo cada values[key]
          _.sumBy(values[key], (v) => {

            // Os valores de v são cada linha dos dados, mas no caso ele ta pegando só os "data" no .data,
            // Inclusive, pega só os dados daquele values[key] especifico.
            //console.log("Valor: " + v.data + " Mês: " + v.mes)
            return parseInt(v.data)
          }),
          
          

        ]
        
      })

      console.log("result", result)
      

      // Pega o valor total dos kwh
      // adicionar tambem a informação da indentificação? 
      for(var i in result){ 
        cont += result[i][1]
      }
      setTotalKwh(cont)

      return [
        ["dia", "Consumo/dia"], ...result
      ]
    }
    

    const loadPriceData = (data) => {
      const values = _.groupBy(data, (value) => {
        //console.log("value: ", value.dia, value.mes)
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
        contPrice += result[i][1]
      }
      setPriceTotalKwh(contPrice)

      
      // dia e gasto/dia em r$ são os "titulos", ...result são dados 
      return [
        ["dia", "gasto/dia em R$"], ...result
      ]
    }

    const getData = async () => {
      await axios.get("http://localhost:3000/accounts").then((response) => {

        // Essas linhas contam quantos esp32's diferentes estão mandando dados.
        var iList = []
        for(var i in response.data){
            if(iList.includes(response.data[i].identificacao)){

            }else{
              iList.push((response.data)[i].identificacao)
            }
        }
        setDataList(iList)
      }
      
    
    
      ).catch((err) => console.log("A error has happened: " + err))
    }


    const getEspecificEspData = async (data) => {
      await axios.get("http://localhost:3000/accounts/"+data.toString()).then((response) => {

        console.log("Everything is ok")

        setChartData(loadData(response.data))
        setPriceChart(loadPriceData(response.data))

      }).catch((err) => console.log("A error has happened: " + err))
    }


    useEffect(() => {

      
      // Comentei pois quero que ele carrega os dados ao clicar em um quarto
      getData()
      
      // Pega todos os dados a cada 5 segundos
       const interval = setInterval(() => {
        getData()
      }, 2000000);

      return () => clearInterval(interval) 
    }, [totalKwh])

    const [pop, setPop] = useState(false)

  return (
    <div>
      <div className="zero">
        <Sidebar />
        <div className="coluna">
          <div className="modal1">
            
          </div>
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
            {dataList.map((num, index) => 
              (index < 0 ? (<button className="quadrado-online" onClick={() => {
                setAppear(dataList[index])
                setStatus("Offline")
                setModal(true)
                console.log("TEU ESP: " + dataList[index])
                getEspecificEspData(dataList[index])
              }} >
                <p>{dataList}</p>
              </button>) 
              : 
              (<button className="quadrado-offline" onClick={() => {
                setAppear(dataList[index])
                setStatus("Online")
                setModal(true)
                console.log("TEU ESP: " + dataList[index])
                getEspecificEspData(dataList[index])
              }} >
                <p>{dataList[index]}</p>
              </button>))
            )}
            <Modal
              style={customStyles}
              isOpen={modal}
              onRequestClose={handleClose}
            >
             <div >
              <h2>Bem vindo ao quarto {appear}</h2>
              <h3>Status: {status}</h3>
             </div>

              {/* <div className="linha-dentro-coluna">
                <div className="modal-azul">
                  <h4>Total kWh de {meses[mes]}</h4>
                  <p>{totalKwh} kWh</p>
                </div>

                <div className="modal-azul">
                  <h4>Total gasto de {meses[mes]}</h4>
                  <p>R$ {priceTotalKwh.toFixed(2)}</p>
                </div>
              </div> */}
              
              <Chart
                chartType="LineChart"
                data={chartData}
                options={lineOptions}
                width={"100%"}
                height={"400px"}          
                customStyles={customStyles}      
              />

              {/* <Chart
                chartType="LineChart"
                data={priceChart}
                options={lineOptions}
                width={"100%"}
                height={"400px"}
              /> */}

          </Modal>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Home