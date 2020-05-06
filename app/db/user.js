const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull:false,
    unique: true
  },
  password:  {
    type: Sequelize.STRING,
    allowNull:false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull:false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull:false
  },
  godMode: {
    type: Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue: false
  },
  created_on: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.NOW
  }

})