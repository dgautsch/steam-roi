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
          return game
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
        if (req.query.id) {
          res.status(200).render('search', { 
            data: gameResults
          })
        } else {
          res.status(200).render('search')
        }
      }
    }, err => {
      res.status(200).render('search', {
        error: err
      })
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
  let steamId = req.query.id || req.user.id
  if (steamId) getUserOwnedGames(steamId, req, res)
})

r.get('/api/v1/user', (req, res) => {
  let steamId = req.query.id || req.user.id
  if (steamId) getUserSummary(steamId, req, res)
})
r.get('/search', (req, res) => {
  if (req.query.id) {
    console.log(req.query.id)
    getUserOwnedGames(req.query.id, req, res)
  } else {
    console.log('i did else')
    res.render('search', { 
      title: 'Search'
    })
  }
})
