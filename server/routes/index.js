const r = require('express').Router()

module.exports = {
  account: r.use(require('./account')),
  auth: r.use(require('./auth')),
  register: r.use(require('./register')),
  steam: r.use(require('./steam'))
}
