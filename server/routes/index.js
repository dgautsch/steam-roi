const r = (module.exports = require('express').Router())

r.use(require('./ping'))
r.use(require('./protected'))
