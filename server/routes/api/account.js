const r = (module.exports = require('express').Router())

r.get('/account', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      code: 'UNAUTHORIZED'
    })
    return
  }
  res.status(200).json({
    code: 'AUTHORIZED',
    userName: req.user.username
  })
  next()
})
