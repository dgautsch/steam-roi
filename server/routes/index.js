const r = (module.exports = require('express').Router())

r.use(require('./account'))
r.use(require('./auth'))
r.use(require('./register'))
r.use(require('./steam'))
