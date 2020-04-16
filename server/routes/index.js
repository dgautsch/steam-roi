const r = (module.exports = require('express').Router())

r.use(require('./ping'))
r.use(require('./login'))
r.use(require('./register'))
r.use(require('./steam'))
r.use(require('./account'))
r.use(require('./auth-steam'))
