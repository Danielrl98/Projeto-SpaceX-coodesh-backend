const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const bodyJson = bodyParser.json()
const cors = require('cors')
const supertest = require('supertest')
router.use(cors())
const index = require('../controllers/index/index')
const launchesController = require('../controllers/launches/launchesControllers')
const launchesStatsController = require('../controllers/launches/stats/launchesStatsControllers')

router.get('/', index.Hello)
router.get('/launches', bodyJson, launchesController.requestApiLaunches)
router.get('/launches/stats', bodyJson, launchesStatsController.searchRocket)



module.exports=router