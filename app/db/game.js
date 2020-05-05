const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('game', {
  name: {
    type: Sequelize.STRING,
    allowNull:false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.NOW
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull:false
  }

})