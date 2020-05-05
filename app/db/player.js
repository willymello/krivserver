const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('player', {
  email: {
    type: Sequelize.STRING,
    allowNull:false
  },
  password:  {
    type: Sequelize.STRING,
    allowNull:false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.NOW
  }

})