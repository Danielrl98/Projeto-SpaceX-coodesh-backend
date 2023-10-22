require('dotenv').config()

const router = require('./routes/index')
require('./cron/launches/cronLaunches')

const port = process.env.PORT

router.listen(port, () => {
    console.log('http://localhost:'+port)
})