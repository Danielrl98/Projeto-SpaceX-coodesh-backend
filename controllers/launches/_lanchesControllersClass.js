class LaunchesController{

    tableName = 'launches'

    requestAllDataDB(){
        return `SELECT * from launches`
    }
    requestDataDB(name,limit,offset){
        return `SELECT * from ${this.tableName} WHERE name LIKE "%${name}%" LIMIT ${limit} OFFSET  ${offset}`
    }
}

module.exports = LaunchesController