const r = (module.exports = require('express').Router())
const passport = require('passport')

r.get(
  '/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/')
  }
)

r.get(
  '/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    console.log(`New login by ${req.user.displayName}`)
    console.log(`User ID: ${req.user.id}`)
    res.redirect('/')
  }
)
