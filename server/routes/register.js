const r = (module.exports = require('express').Router())
const passport = require('passport')

r.post(
  '/register',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register'
  })
)
