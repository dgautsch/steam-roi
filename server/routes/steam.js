const r = module.exports = require('express').Router()

r.get('/api/v1/steam', function (req, res) {
  res.render('index', { title: 'Express' })
})
