const r = module.exports = require('express').Router()
const SteamApi = require('steamapi')
const steam = new SteamApi(process.env.STEAM_API_KEY)

r.get('/api/v1/user/:user', function (req, res) {
  steam.resolve('https://steamcommunity.com/id/' + req.params.user).then(id => {
    steam.getUserOwnedGames(id).then(function (summary) {
      res.status(200).json(summary)
    })
  })
})
