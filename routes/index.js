const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const bodyJson = bodyParser.json()
const cors = require('cors')

const supertest = require('supertest')

const launchesController = require('../controllers/launches/launchesControllers')

const index = require('../controllers/index/index')
const model = require('../models/launches/launches')

router.get('/', index.Hello)
router.get('/launches', bodyJson, launchesController.requestApiLaunches)

router.use(cors())

module.exports=router