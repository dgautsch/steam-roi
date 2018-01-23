const express = require('express')
const logger = require('morgan')
const path = require('path')
const routes = require('./routes')
const app = express()

app.use(logger('dev'))
app.use('/', routes)
app.use(express.static(path.join(__dirname, '../public'), {extensions: ['json']}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
