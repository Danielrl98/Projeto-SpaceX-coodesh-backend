class LaunchesController{

    tableName = 'launches'

    requestAllDataDB(){
        return `SELECT * from launches`
    }
    requestDataDB(name,limit){
        return `SELECT * from ${this.tableName} WHERE name LIKE "%${name}%" LIMIT ${limit}`
    }
}

module.exports = LaunchesController