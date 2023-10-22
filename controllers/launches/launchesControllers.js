const connection = require('../../databaseConfig/connection')
const modelLaunches = require('../../models/launches/launches')
const LaunchesController = require('./_lanchesControllersClass')
const db = new LaunchesController

async function getLaunches(req,res){
    const limit = 5

    if (!req.query.search) {

        await connection.query(db.requestAllDataDB()).then((success) => {
            return res.json(
                {
                    results: success,
                    totalDocs: success[0].length,
                    page: 1,
                    totalPages: parseInt(success[0].length / 5),
                    hasNext: true,
                    hasPrev: false
                }
            )
        }).catch((error) => {
            return res.json({ results: error })
        })

    } else {
        let searchName = req.query.search

        await connection.query(db.requestDataDB(searchName, limit)).then((success) => {
            return res.json(
                {
                    results: success,
                    totalDocs: success[0].length,
                    page: 1,
                    totalPages: parseInt(success[0].length / 5),
                    hasNext: true,
                    hasPrev: false
                }
            )
        }).catch((error) => {
            return res.json({ results: error })
        })
    }
}

module.exports = {

    async requestApiLaunches(req, res) {

        modelLaunches.execute()

        setTimeout(() => {
            getLaunches(req,res)
        }, 2500);
       
       
    }
}