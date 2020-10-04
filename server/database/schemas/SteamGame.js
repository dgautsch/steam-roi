const mongoose = require('mongoose')

const SteamGamePriceSchema = new mongoose.Schema({
  currency: {
    type: String
  },
  initial: {
    type: Number
  },
  final: {
    type: Number
  },
  discount_percent: {
    type: Number
  },
  initial_formatted: {
    type: String
  },
  final_formatted: {
    type: String
  }
})

const SteamGameSchema = new mongoose.Schema({
  steam_appid: {
    type: String,
    index: true,
    unique: true
  },
  name: {
    type: String
  },
  detailed_description: {
    type: String
  },
  about_the_game: {
    type: String
  },
  short_description: {
    type: String
  },
  header_image: {
    type: String
  },
  website: {
    type: String
  },
  price_overview: SteamGamePriceSchema
})

module.exports = mongoose.model('SteamGame', SteamGameSchema)
