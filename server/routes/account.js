const r = (module.exports = require('express').Router())
const isAuthenticated = require('../middleware/auth')

r.get('/account', isAuthenticated, (req, res) => {
  res.location('account')
})

r.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
