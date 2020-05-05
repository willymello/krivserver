'use strict'
require('sequelize')

const db = require('./database')
const DM = require('./dungeonMaster')
const Player = require('./player')
const Game = require('./game')
const Character = require('./character')

Player.hasMany(Character)
Character.belongsTo(Game)
DM.hasMany(Game)

module.exports = {
  db,
  DM,
  Player,
  Game,
  Character
}