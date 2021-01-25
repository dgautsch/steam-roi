const {
  getAllSteamGames,
  getAppDetails,
  doesGameExist,
  addGame,
  updateGame
} = require('./steam-utils')
const logger = require('debug')('steamroi:populate')
const { connectDefaultDb } = require('../index')
const mongoose = require('mongoose')

let games
let i = 0

async function init () {
  games = await getAllSteamGames()
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
      const { appid } = game
      i++

      if (game && (appid !== null || appid !== undefined)) {
        try {
          logger(`API Call: ${marker + 1}`)
          marker++
          const gameDetails = await getAppDetails(appid)
          const isGameLoaded = await doesGameExist(appid)
          if (!gameDetails) {
            logger('Game not found, cancelling save.')
          } else if (gameDetails.fullgame || !gameDetails.price_overview) {
            // The fullgame document references the parent game
            // It will exist if the game is an expansion or DLC
            // We do not want to catalog these games because they are not counted
            // towards play time and there are too many of them to store

            // A missing price_overview usually indicates that the app is not
            // available for purchase anymore or excluded from the store.
            logger('Game does not meet requirements.')
          } else {
            // First check if we already loaded this game into the DB
            if (!isGameLoaded) {
              // All checks have passed, saving the game.
              await addGame(gameDetails)
            } else {
              logger(`Game ${game.appid} already exists in the DB collection.`)
              await updateGame(gameDetails)
            }
          }
        } catch (error) {
          // Steam either removed the game or it has no record
          logger(error.message)
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
