const r = module.exports = require('express').Router()
const auth = require('../middleware/auth')

r.get('/account', auth.isAuthenticated, (req, res) => {
  res.render('account', { 
    user: req.user,
    title: `Account Details for ${req.user.displayName}`
  })
})

r.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
