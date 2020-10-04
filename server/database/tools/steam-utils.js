// Support async/await
require('regenerator-runtime/runtime')
const path = require('path')
const logger = require('debug')('steamroi:utils')
require('dotenv').config({ path: path.join(__dirname, '../../../config/.env') })

const SteamWrapper = require('steamapi')
const SteamAPI = new SteamWrapper(process.env.STEAM_API_KEY)
const SteamGame = require('../schemas/SteamGame')

/**
 * Module for Steam API and Mongo CRUD related utilities
 */
const SteamUtils = (module.exports = {})

/**
 * Retrieves all apps from the Steam API
 * @function getAllSteamGames
 * @return {Promise<Object>} A collection of Steam Games
 */
SteamUtils.getAllSteamGames = async function () {
  try {
    logger('Fetching Steam Library')
    const appList = await SteamAPI.getAppList()
    logger('Steam Library fetch operation complete.')
    return appList
  } catch (error) {
    logger(`Fetch failed with error: ${error}`)
  }
}

SteamUtils.getAppDetails = async function (id) {
  try {
    const appDetails = await SteamAPI.getGameDetails(id)
    return appDetails
  } catch (error) {
    logger(`Game with id: ${id} not found.`)
    return new Error('Game not found.')
  }
}

/**
 * Adds a game to the MongoDB
 * @function addGame
 * @return {null}
 */
SteamUtils.addGame = async function (id) {
  logger(`Adding game ${id}`)
  try {
    const details = await SteamUtils.getAppDetails(id)
    const newGame = new SteamGame(details)
    const game = await newGame.save()
    logger(`Successfully added ${game.name}`)
    return game
  } catch (error) {
    logger(`Save failed with error: ${error}`)
  }
}

/**
 * Removes a game from the MongoDB
 * @function addGame
 * @return {null}
 */
SteamUtils.removeGame = function () {}
