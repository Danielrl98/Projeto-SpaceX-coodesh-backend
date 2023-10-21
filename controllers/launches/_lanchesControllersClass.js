class LaunchesController{

    tableName = 'launches'

    requestAllDataDB(limit){
        return `SELECT * from launches LIMIT ${limit}`
    }
    requestDataDB(name,limit){
        return `SELECT * from ${this.tableName} WHERE name LIKE "%${name}%" LIMIT ${limit}`
    }

}
module.exports = LaunchesController