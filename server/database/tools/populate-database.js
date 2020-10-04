const SteamUtils = require('./steam-utils')
const logger = require('debug')('steamroi:populate')
const { connectDefaultDb } = require('../index')
const mongoose = require('mongoose')

async function init () {
  // Connect Mongo Database
  connectDefaultDb()
    .then(() => {
      logger('Established default DB connection')
      populateDatabase()
    })
    .catch(err => {
      logger(err)
      throw new Error(err.message)
    })
}

async function populateDatabase () {
  const games = await SteamUtils.getAllSteamGames()
  /**
   * @todo convert this to a while loop and add in a setTimeout for 5 minutes
   * after every 200 records that have been parsed.
   * The Steam API will cancel requests if there are more than 200 every 5 minutes
   */
  for (let i = 60; i < 100; i++) {
    const game = games[i]
    if (game && game.appid) {
      await SteamUtils.addGame(game.appid)
    }
  }
  logger('Closing default DB connection')
  mongoose.connection.close()
}

init()
