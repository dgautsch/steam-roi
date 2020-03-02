const r = require('express').Router()

module.exports = function (passport) {
  return [
    r.use(require('./account')),
    r.use(require('./auth-steam')),
    r.use(require('./login')(passport)),
    r.use(require('./register')(passport)),
    r.use(require('./steam'))
  ]
}
