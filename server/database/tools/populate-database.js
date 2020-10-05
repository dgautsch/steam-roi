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
      i++

      if (game && (game.appid !== null || game.appid !== undefined)) {
        let gameDetails
        const doesGameExist = await SteamUtils.doesGameExist(game.appid)

        // First check if we already loaded this game into the DB
        if (!doesGameExist) {
          logger(`API Call: ${marker}`)
          marker++
          try {
            // The game doesn't exist in our db collection, get its details
            gameDetails = await SteamUtils.getAppDetails(game.appid)
          } catch (error) {
            // Steam either removed the game or it has no record
            gameDetails = false
          }

          if (!gameDetails) {
            logger('Game not found, cancelling save.')
          } else if (gameDetails.fullgame) {
            logger('Game is not a full game, cancelling save.')
          } else {
            // All checks have passed, saving the game.
            try {
              await SteamUtils.addGame(gameDetails)
            } catch (error) {
              logger(error.message)
            }
          }
        } else {
          logger(
            `Game ${game.appid} already exists in the DB collection, cancelling save.`
          )
        }
      }

      /**
       * Exit Checks
       */
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
