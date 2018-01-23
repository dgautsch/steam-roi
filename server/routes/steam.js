const r = module.exports = require('express').Router()
const SteamApi = require('../lib/steamapi')
const steam = new SteamApi(process.env.STEAM_API_KEY)

r.get('/api/v1/user', function (req, res) {
  steam.resolve('https://steamcommunity.com/id/' + req.query.user).then(id => {
    if (id) {
      steam.getUserOwnedGames(id).then(data => {
        res.status(200).json(data)
      }, err => {
        res.status(404).json('No games found.')
        console.error(err)
      })
    } else {
      res.status(200).json('User not found.')
    }
  })
})
