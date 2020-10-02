const express = require('express')
const fs = require('fs')
const logger = require('morgan')
const dblogger = require('debug')('steamroi:db')
const path = require('path')
const cookieParser = require('cookie-parser')
const { createBundleRenderer } = require('vue-server-renderer')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app = express()
const { isProduction, disableDatabase } = require('../config')
const { passportStrategies } = require('./middleware')
const { connectDefaultDb } = require('./database')
const routes = require('./routes')
const serverBundle = require('../public/vue-ssr-server-bundle.json')
const clientManifest = require('../public/vue-ssr-client-manifest.json')
const template = fs.readFileSync(
  path.resolve(__dirname, '../app/templates/index.tpl.html'),
  'utf-8'
)

const bundleRenderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  inject: false,
  template,
  clientManifest
})

// Loggers
if (isProduction) {
  app.use(logger('combined'))
} else {
  app.use(logger('dev'))
}

// Database
connectDefaultDb()
  .then(() => {
    dblogger('Established default DB connection')
  })
  .catch(err => {
    dblogger(err)
    throw new Error(err.message)
  })

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json
app.use(cookieParser())

// Setup session storage of auth tokens
app.use(
  session({
    secret: process.env.SESSIONS_SECRET,
    name: 'x-session-auth',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 Hours
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)

dblogger('Initializing Passport strategies')
// Initialize sessions and passport strategies
app.use(passportStrategies.initialize())
app.use(passportStrategies.session())

// Register static asset routes
app.use('/public/', express.static(path.join(__dirname, '../public')))
app.use('/static/', express.static(path.join(__dirname, '../static')))

// Register Auth API routes
app.use('/api/', routes)

// Send all other requests to Vue SSR
app.get('*', ({ user, url }, res) => {
  const context = {
    title: 'Steam ROI',
    url,
    isProduction,
    disableDatabase,
    user
  }

  bundleRenderer.renderToString(context, (err, html) => {
    if (err) {
      if (+err.message === 404) {
        res.status(404).end('Page not found')
      } else {
        dblogger(err)
        res.status(500).end('Internal Server Error')
      }
    }
    res.end(html)
  })
})

module.exports = app
