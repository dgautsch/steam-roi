let r = (module.exports = require('express').Router())

r.use(require('./account'))
r.use(require('./auth'))
r.use(require('./steam'))
