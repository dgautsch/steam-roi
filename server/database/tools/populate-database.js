const SteamUtils = require('./steam-utils')
const logger = require('debug')('steamroi:populate')
const { connectDefaultDb } = require('../index')
const mongoose = require('mongoose')

let games
let i = 0

async function init () {
  games = await SteamUtils.getAllSteamGames()
  // Connect Mongo Database
  connectDefaultDb()
    .then(() => {
      logger('Established default DB connection')
      populateDatabase(true)
    })
    .catch(err => {
      logger(err)
      throw new Error(err.message)
    })
}

/**
 * Parses the Steam API for game data and inserts it into the database
 * @function populateDatabase
 * @param firstRun {boolean} If true, invoke load immediately
 * @returns {null}
 */
async function populateDatabase (firstRun) {
  const maxRuns = 200
  const timeout = 5 * 60 * 1000 // 5 minutes
  if (firstRun) {
    load()
    return
  }

  async function load () {
    let marker = 0

    while (marker <= maxRuns) {
      const game = games[i]
      if (game && (game.appid !== null || game.appid !== undefined)) {
        try {
          await SteamUtils.addGame(game.appid)
          marker++
        } catch (error) {
          logger(error)
        }
      }

      i++

      if (i === games.length) {
        logger('All games added, exiting and closing DB connection')
        mongoose.connection.close()
        return
      }

      if (marker === maxRuns) {
        logger('Pausing operation for 5 minutes.')
        populateDatabase()
        return
      }
    }
  }
  setTimeout(load, timeout)
}

init()
