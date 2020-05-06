const Sequelize = require('sequelize')
const db = require('./database')

//creating this cause i thought i would have 2 types of users, but godmode /isDM is probably better

module.exports = db.define('DM', {
  email: {
    type: Sequelize.STRING,
    allowNull:false
  },
  password:  {
    type: Sequelize.STRING,
    allowNull:false
  },
  created_on: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.NOW
  }
})