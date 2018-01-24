let r = module.exports = require('express').Router()

r.use(require('./steam'))
r.use(require('./auth'))
