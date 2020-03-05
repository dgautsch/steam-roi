const r = require('express').Router()

module.exports = function (passport) {
  r.post('/login', function (req, res, next) {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) return next(err)
      if (!user) {
        res
          .status(400)
          .json({
            code: info.message
          })
          .end()
      }
      req.login(user, e => {
        if (e) return next(e)
        res
          .status(200)
          .json({
            code: info.message
          })
          .end()
      })
    })(req, res, next)
  })

  r.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return r
}
