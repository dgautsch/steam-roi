const r = (module.exports = require('express').Router())
const async = require('async')
const SteamApi = require('steamapi')
const steam = new SteamApi(process.env.STEAM_API_KEY, { cache: true })
// const auth = require('../middleware/auth')

function getUserOwnedGames (id, req, res) {
  if (id) {
    steam.getUserOwnedGames(id).then(
      data => {
        const gameResults = []
        const userOwnedGames = data
        const results = []
        const gameIds = userOwnedGames
          .filter((game, idx) => {
            if (idx <= 100 && game.playTime !== 0) {
              return game
            }
          })
          .map(game => {
            return game.appID
          })

        async function getGameDetails (id) {
          console.log(`processing ${id}`)
          try {
            const gameData = await steam.getGameDetails(id)
            if (gameData) gameResults.push(gameData)
          } catch (err) {
            console.error(err)
          }
        }

        const q = async.queue(getGameDetails, 3)

        q.push(gameIds, error => {
          if (error) {
            console.log(error)
          }
        })

        q.drain = function () {
          if (req.query.id) {
            const userResults = userOwnedGames
              .filter(userGame => {
                return gameResults.some(gameInfo => {
                  return userGame.appID === gameInfo.steam_appid
                })
              })
              .map(data => {
                return {
                  steam_appid: data.appID,
                  playTime: data.playTime
                }
              })
            userResults.forEach((item, idx) => {
              results.push(Object.assign({}, item, gameResults[idx]))
            })
            res.status(200).json({
              data: results
            })
          } else {
            res.status(200).json({
              data: []
            })
          }
        }
      },
      err => {
        res.status(503).json({
          data: 'Data Unvailable',
          err: JSON.stringify(err)
        })
        console.error(err)
      }
    )
  } else {
    res.status(400).json('Missing ID parameter.')
  }
}

function getUserSummary (id, req, res) {
  steam.getUserSummary(id).then(
    data => {
      res.status(200).json({
        data
      })
    },
    err => {
      res.status(400).json(err)
      console.error(err)
    }
  )
}

r.get('/user', (req, res) => {
  const steamId = req.query.id || req.user.id
  if (steamId) getUserSummary(steamId, req, res)
})
r.get('/search', (req, res) => {
  if (req.query.id) {
    console.log(`Searching for ${req.query.id}`)
    getUserOwnedGames(req.query.id, req, res)
  } else {
    res.get('/')
  }
})
