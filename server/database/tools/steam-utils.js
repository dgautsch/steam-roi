/* eslint-disable camelcase */
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
 * @function                 SteamUtils#getAllSteamGames
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
 * @function                 SteamUtils#getAppDetails
 * @param id {String}        The app id string
 * @return {Promise<Object>} The details of the Steam app
 */
SteamUtils.getAppDetails = async function (id) {
  try {
    const appDetails = await SteamAPI.getGameDetails(id)
    return appDetails
  } catch (error) {
    logger(`Could not get details for game with id: ${id}.`)
    throw new Error(error.message)
  }
}

/**
 * Checks if the game exists in the collection
 * @function                  SteamUtils#doesGameExist
 * @return {Promise<boolean>} True if the game exists
 */
SteamUtils.doesGameExist = async function (id) {
  return SteamGame.exists({ steam_appid: id })
}

/**
 * Adds a game to the MongoDB collection
 * @function SteamUtils#addGame Adds a game to the DB
 * @return {Promise<Object>}    The added game document
 */
SteamUtils.addGame = async function (gameDetails) {
  if (gameDetails.steam_appid === null) {
    throw new Error('appid is null, cancelling save.')
  }
  try {
    const newGame = new SteamGame(gameDetails)
    const game = await newGame.save()
    logger(`Successfully added ${game.name}`)
    return game
  } catch (error) {
    logger(`Save failed with error: ${error}`)
  }
}

/**
 * Adds a game to the MongoDB collection
 * @function SteamUtils#updateGame Updates a game in the DB
 * @return {Promise<Object>}       The DB response
 */
SteamUtils.updateGame = async function (gameDetails) {
  const { steam_appid } = gameDetails
  if (steam_appid === null) {
    throw new Error('appid is null, cancelling update.')
  }
  try {
    const res = await SteamGame.updateOne({ steam_appid }, gameDetails)
    logger(
      `Successfully modified ${res.n} document(s) ${gameDetails.name} with app id ${steam_appid}`
    )
    return res
  } catch (error) {
    logger(`Update failed with error: ${error}`)
  }
}

/**
 * Adds a game to the MongoDB collection
 * @function SteamUtils#getGame Gets a single game in the DB
 * @return {Promise<Object>}    The DB response
 */
SteamUtils.getGame = async function (gameDetails) {
  const { steam_appid } = gameDetails
  if (steam_appid === null) {
    throw new Error('appid is null, cancelling get.')
  }
  try {
    const res = SteamGame.findOne({ steam_appid })
    return res
  } catch (error) {
    logger(`Get failed with error: ${error}`)
  }
}
