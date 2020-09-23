const r = (module.exports = require('express').Router())
const passport = require('passport')

r.post('/register', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      res.status(409).json({
        code: info.message
      })
      return next()
    }
    // we are logging the user in immediately, when we do email verification
    // in the future, this will change.
    req.login(user, e => {
      if (e) return next(e)
      res.status(201).json({
        code: info.message,
        userName: user.username
      })
    })
    return next()
  })(req, res, next)
})
