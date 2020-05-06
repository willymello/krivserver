'use strict'
require('sequelize')

const db = require('./database')
// const DM = require('./dungeonMaster')
const User = require('./user')
const Game = require('./game')
const Character = require('./character')

Player.hasMany(Character)
Character.belongsTo(Game)
User.hasMany(Game)

module.exports = {
  db,
  User,
  Game,
  Character
}