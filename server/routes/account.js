const r = require('express').Router()
const isAuthenticated = require('../middleware/is-authenticated')

function account () {
  r.get('/account', isAuthenticated, (req, res) => {
    res.status(200).json({
      code: 'AUTHORIZED'
    })
  })

  return r
}

module.exports = account
