// Support async/await
require('regenerator-runtime/runtime')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../../config/.env') })
const logger = require('debug')('steamroi:populate')
const { connectDefaultDb } = require('../index')
const mongoose = require('mongoose')
const SteamGame = require('../schemas/SteamGame')

async function init () {
  try {
    // Connect Mongo Database
    await connectDefaultDb()
    logger('Established default DB connection')
    await cleanDatabase()
  } catch (error) {
    logger(error)
    throw new Error(error.message)
  }
}

async function cleanDatabase () {
  try {
    await SteamGame.deleteMany({
      $or: [{ price_overview: null }, { date_added: null }]
    })
    logger('Database cleaned, exiting and closing DB connection')
    mongoose.connection.close()
  } catch (error) {
    logger(error.message)
  }
}

init()
