const LaunchesStats = require('./_launchesStatusControllerClass')
const db = new LaunchesStats()
const connection = require('../../../databaseConfig/connection')
const  axios = require('axios')

function parseJsonArray(jsonString) {
    const array = [];
  
    let currentIndex = 0;
    while (currentIndex < jsonString.length) {
      const startIndex = jsonString.indexOf('{', currentIndex);
      const endIndex = jsonString.indexOf('}', startIndex);
  
      if (startIndex === -1 || endIndex === -1) {
        break; 
      }
  
      const jsonChunk = jsonString.slice(startIndex, endIndex + 1);
      try {
        const obj = JSON.parse(jsonChunk);
        array.push(obj);
      } catch (error) {
        console.error('Erro ao analisar o objeto JSON:', error);
      }
  
      currentIndex = endIndex + 1;
    }
  
    return array;
  }

module.exports = {

    async searchRocket(req,res){
        let resultData = []

        let result = await axios.get(`https://api.spacexdata.com/v4/rockets/`)

        resultData.push(result.data)

      
        const CountSuccess = []
        
        await connection.query(db.searchDistinctRockets()).then(  (success) =>{

            let status = 201
            const coresHexadecimais = [];

            for (let i = 0; i < 200; i++) {
              const cor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
              coresHexadecimais.push(cor);
            }

           success[0].forEach(async (element,i) => {

            let nameRock = resultData[0].find((e) => e.id == element.rocket)
          
            var successCoresReused = 0
            var successLaunch = 0
            var errorLaunch = 0

            let coresReured = element.cores
            let arrayObject = parseJsonArray(coresReured);

            if(arrayObject[0].reused === true) successCoresReused = 1
            if(element.success == "true") successLaunch = 1 
            if(element.success == "false") errorLaunch = 1 

           
            if(element.success !== "null" && arrayObject[0].reused !== null){
             
                if(resultData.length !== 0){
                    status = 200
                }
                CountSuccess.push({
                    date: (element.date_utc).substring(0,10),
                    name: nameRock.name,
                    rocket: element.rocket,
                    success: successLaunch,
                    fail: errorLaunch,
                    cores: {
                        reused:  successCoresReused,
                        flight: successLaunch + errorLaunch + successCoresReused,
                        hexadecimal: coresHexadecimais[i]
                    },
                    status: status
                })
            }           
        })
       
        setTimeout(async () => {
            
            var total = CountSuccess.reduce(function (acumulador, valor){
              
                var indice = acumulador.map((o) => o.rocket).indexOf(valor.rocket); 
                
                if (indice == -1){ 
                  acumulador.push(valor);
                }
                else { 
                  acumulador[indice].success += valor.success;
                  acumulador[indice].error += valor.error;
                  acumulador[indice].cores.reused += valor.cores.reused;
                  acumulador[indice].cores.flight += valor.cores.flight;
                }
                
                return acumulador; 
              
              }, []);
           
              if(req.query.full == 'all'){
                return res.json(CountSuccess)
              }
               return res.json(total)
        },500)

        }).catch((error)=> {
            return res.send({
                message: 'Erro ao retornar foguetes ' + error,
                status:400
            } )
        })

    }
}