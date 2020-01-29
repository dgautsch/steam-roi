const r = (module.exports = require('express').Router())
const passport = require('passport')

r.post('/register', function (req, res, next) {
  passport.authenticate('local')(req, res, next)
})
