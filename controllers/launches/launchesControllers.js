const connection = require('../../databaseConfig/connection')
const modelLaunches = require('../../models/launches/launches')
const LaunchesController = require('./_lanchesControllersClass')
const db = new LaunchesController

module.exports = {

    async requestApiLaunches(req, res) {
        /*modelLaunches.execute()*/
        const limit = 5

        if (!req.query.search) {

            await connection.query(db.requestAllDataDB(limit)).then((success) => {
                return res.send(
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
                return res.send({ results: error })
            })

        } else {
            let searchName = req.query.search

            await connection.query(db.requestDataDB(searchName, limit)).then((success) => {
                return res.send(
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
                return res.send({ results: error })
            })

        }

    }
}