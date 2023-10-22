class LaunchesStats{

    tableName = "launches"

    searchDistinctRockets(){
        return `SELECT date_utc, name, success, rocket,cores from ${this.tableName} limit 500`
    }
}

module.exports = LaunchesStats