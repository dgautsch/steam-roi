const r = (module.exports = require('express').Router())
const isAuthenticated = require('../middleware/is-authenticated')

r.get('/account', isAuthenticated, (req, res) => {
  res.status(200).json({
    code: 'AUTHORIZED'
  })
})
