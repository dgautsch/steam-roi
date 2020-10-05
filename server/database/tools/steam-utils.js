// Support async/await
require('regenerator-runtime/runtime')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../../config/.env') })
const logger = require('debug')('steamroi:utils')

const SteamWrapper = require('steamapi')
const SteamAPI = new SteamWrapper(process.env.STEAM_API_KEY)
const SteamGame = require('../schemas/SteamGame')

/**
 * Module for Steam API and Mongo CRUD related utilities
 */
const SteamUtils = (module.exports = {})

/**
 * Retrieves all apps from the Steam API
 * @function SteamUtils#getAllSteamGames
 * @return {Promise<Object>} A collection of Steam apps
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

/**
 * Fetches app details from the Steam API
 * @function SteamUtils#getAppDetails
 * @return {Promise<Object>} The details of the Steam app
 */
SteamUtils.getAppDetails = async function (id) {
  try {
    const appDetails = await SteamAPI.getGameDetails(id)
    return appDetails
  } catch (error) {
    logger(`Game with id: ${id} not found.`)
    throw new Error('Game not found.')
  }
}

/**
 * Adds a game to the MongoDB collection
 * @function SteamUtils#addGame
 * @return {Promise<Object>}
 */
SteamUtils.addGame = async function (id) {
  let details
  if ((await SteamGame.exists({ steam_appid: id })) || id === null) {
    logger(`Game ${id} exists, cancelling save`)
    return
  }
  try {
    details = await SteamUtils.getAppDetails(id)
  } catch (error) {
    logger(`Fetch app details failed: ${error}`)
    return
  }
  try {
    const newGame = new SteamGame(details)
    const game = await newGame.save()
    logger(`Successfully added ${game.name}`)
    return
  } catch (error) {
    logger(`Save failed with error: ${error}`)
  }
}
