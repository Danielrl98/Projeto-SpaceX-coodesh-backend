const Sequelize = require('sequelize')

const db = process.env.DATABASE
const username = process.env.USER
const pass = process.env.PASSWORD
const hostdata = process.env.HOST
const dialectdb = process.env.DIALECT || 'mysql'

const connection = new Sequelize(db,username,pass,{
    hostdata,
    dialect: dialectdb
})

module.exports=connection