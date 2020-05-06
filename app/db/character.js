const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('character', {
  name: {
    type: Sequelize.STRING,
    allowNull:false
  },
  race:  {
    type: Sequelize.STRING,
    allowNull:true,
    defaultValue: null
  },
  class:  {
    type: Sequelize.STRING,
    allowNull:true,
    defaultValue: null
  },
  health: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0
  },
  strength: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0
  },
  intelligence: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0
  },
  charisma: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0
  },
  wisdom: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0
  },
  agility: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0
  },
  constitution: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0
  },

  created_on: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.NOW
  }

})