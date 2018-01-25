const r = module.exports = require('express').Router()
const async = require('async')
const SteamApi = require('../lib/SteamAPI')
const steam = new SteamApi(process.env.STEAM_API_KEY, {cache: true})
// const auth = require('../middleware/auth')

function getUserOwnedGames (id, req, res) {
  if (id) {
    steam.getUserOwnedGames(id).then(data => {
      let gameResults = []
      let gameIds = data.filter((game, idx) => {
        if (idx <= 6) {
          return game.appID
        }
      }).map((game) => {
        return game.appID
      })

      async function getGameDetails (id) {
        console.log(`processing ${id}`)
        try {
          let gameData = await steam.getGameDetails(id)
          if (gameData) gameResults.push(gameData)
        } catch (err) {
          console.error(err)
        }
      }

      let q = async.queue(getGameDetails, 1)

      q.push(gameIds, (error) => {
        if (error) {
          console.log(error)
        }
      })

      q.drain = function () {
        res.status(200).json(gameResults)
      }
    }, err => {
      res.status(404).json(err)
      console.error(err)
    })
  } else {
    res.status(404).json('User not found.')
  }
}

function getUserSummary (id, req, res) {
  steam.getUserSummary(id).then((data) => {
    res.status(200).json(data)
  }, err => {
    res.status(404).json(err)
    console.error(err)
  })
}

r.get('/api/v1/user/games', (req, res) => {
  if (req.query.id || req.user.id) getUserOwnedGames(req.query.id, req, res)
})

r.get('/api/v1/user', (req, res) => {
  if (req.query.id || req.user.id) getUserSummary(req.query.id, req, res)
})

// r.get('/api/v1/user', auth.isAuthenticated, function (req, res) {
//   getUserOwnedGames(req.user.id, req, res)
// })
