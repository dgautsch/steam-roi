const r = module.exports = require('express').Router()
const SteamApi = require('../lib/steamapi')
const steam = new SteamApi(process.env.STEAM_API_KEY)
const auth = require('../middleware/auth')

r.get('/api/v1/user', auth.isAuthenticated, function (req, res) {
  if (req.user.id) {
    steam.getUserOwnedGames(req.user.id).then(data => {
      res.status(200).json(data)
    }, err => {
      res.status(404).json('No games found.')
      console.error(err)
    })
  } else {
    res.status(200).json('User not found.')
  }
})
