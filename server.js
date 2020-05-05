'use strict'

const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const app = express()

require('babel-polyfill') 
const cors = require('cors');
const env = ('./env');

//logging
app.use(volleyball)

//cors
app.use(cors())

// body parsing mw
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(1337).on('listening', () => {
  console.log(`🚀 are live on ${1337}`);
});

module.exports = app;