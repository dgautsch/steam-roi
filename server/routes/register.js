const r = (module.exports = require('express').Router())
const passport = require('passport')

r.post('/register', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    const { message } = info
    if (err) return next(err)
    if (!user) {
      res
        .status(409)
        .json({
          code: 'ACCOUNT_EXISTS',
          message
        })
        .end()
    }
    req.login(user, e => {
      if (e) return next(e)
      res
        .status(201)
        .json({
          code: 'ACCOUNT_CREATED',
          message,
          username: req.user.username
        })
        .end()
    })
  })(req, res, next)
})
