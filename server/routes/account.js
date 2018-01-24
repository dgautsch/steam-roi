const r = module.exports = require('express').Router()
const auth = require('../middleware/auth')

r.get('/account', auth.isAuthenticated, function (req, res) {
  res.render('account', { user: req.user })
})

r.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
