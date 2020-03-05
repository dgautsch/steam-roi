const r = require('express').Router()

module.exports = function (passport) {
  r.post('/register', function (req, res, next) {
    passport.authenticate('local-register', (err, user, info) => {
      if (err) return next(err)
      if (!user) {
        res
          .status(409)
          .json({
            code: info.message
          })
          .end()
      }
      // we are logging the user in immediately, when we do email verification
      // in the future, this will change.
      req.login(user, e => {
        if (e) return next(e)
        res
          .status(201)
          .json({
            code: info.message
          })
          .end()
      })
    })(req, res, next)
  })

  return r
}
