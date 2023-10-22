const  connection = require('../../databaseConfig/connection')
const Launches = require('./_launchesClass')
const db = new Launches()
const axios = require('axios')


async function createConnectionTable(){

  
     await connection.query(db.verifyExistTable())
     .then( async (success) => {
      
        /*Verifica se tabela existe para criação */
        if(success[0].length == 0){
            
            await connection.query(db.createAndInsert()).then((success) => {
                    insertDataDb()
            }).catch( (error) => {
                return error
            })
        } 

     }).catch((error) => {
        console.error(error)
        return
     })
    }

async function requestApiCron(req,res){

        /*!!!!!!! Verificar se tabela está vazia */
        insertDataDb() 
}
async function insertDataDb(){

    const version = 'v4'
    const urlApi = `https://api.spacexdata.com/${version}/launches`
    const result = await axios.get(urlApi)

    if(result.status !== 200 ){
        console.error('erro ao consumir api');
        return
    } 

    let data = result.data
 /*deletar dados antigos */
    await connection.query(db.deleteDataTable()).then(async (success) => {
    for( c=0; c < data.length ; c++){
         /*Inserir dados novos */
        connection.query(db.insertDataCron(
            data[c].flight_number,
            data[c].name,
            data[c].date_utc,
            data[c].date_unix,
            data[c].date_local,
            data[c].date_precision,
            data[c].static_fire_date_utc,
            data[c].static_fire_date_unix,
            data[c].tbd,
            data[c].net,
            data[c].window,
            data[c].rocket,
            data[c].success,
            data[c].failures,
            data[c].upcoming,
            data[c].details,
            data[c].fairings,
            data[c].crew,
            data[c].ships,
            data[c].payloads,
            data[c].launchpad,
            data[c].cores,
            data[c].links,
            data[c].auto_update,
            data[c].launch_library_id 
          ))
      }
    }).catch((error) => {
        console.error('erro ao deletar dados antigos da tabela: ' + error);
        return
    })
}

module.exports = {

    async execute(){
       
       const promisses = [createConnectionTable(), requestApiCron()]

       try{
            await Promise.all(promisses);
       }
       catch (error) {
        console.error('erro ao executar funções assincronas',error);
        return
      }
    },
    insertDataDb
}