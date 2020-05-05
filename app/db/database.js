'use strict'
require('dotenv').config()
const chalk = require('chalk')
const Sequelize = require('sequelize')

console.log(chalk.yellow('opening database connection'))
console.log(process.env.KRIV_SEQUELIZE_STRING)
const DBUSER = 'dbmasteruser'
const DBPASS = process.env.KRIV_DB_PW
const DBURL = process.env.KRIV_DB_URL
const PORT = 5432
const DBNAME = 'postgres'

const db = new Sequelize(DBNAME, DBUSER, DBPASS, {
  host: DBURL,
  dialect:'postgres'
});

// const db = new Sequelize(`postgres://${DBUSER}:${DBPASS}@${DBURL}:${PORT}/${DBNAME}`, {
//   logging: true
// })
db.authenticate()
.then(() => {
  console.log(chalk.green('Connection has been established successfully.'));
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = db