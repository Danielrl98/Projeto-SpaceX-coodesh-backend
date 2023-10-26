require('dotenv').config()

const router = require('./routes/index')
require('./cron/launches/cronLaunches')

const port = 8080
router.listen(port, () => {
    console.log('http://localhost:'+port)
})