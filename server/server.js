const express = require('express')
const fs = require('fs')
const terminalLogger = require('morgan')
const logger = require('debug')('steamroi:server')
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
const apiRoutes = require('./routes/api')
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

// Terminal Loggers
isProduction
  ? app.use(terminalLogger('combined'))
  : app.use(terminalLogger('dev'))

// Database
connectDefaultDb()
  .then(() => {
    logger('Established default DB connection')
  })
  .catch(err => {
    logger(err)
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

logger('Initializing Passport strategies')
app.use(passportStrategies.initialize())
app.use(passportStrategies.session())

logger('Register static routes')
app.use('/public/', express.static(path.join(__dirname, '../public')))
app.use('/static/', express.static(path.join(__dirname, '../static')))

logger('Register API routes')
app.use('/api/', apiRoutes)

logger('Register general routes')
app.use('/', routes)

// Send all other requests to Vue SSR
logger('Register SSR routes')
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
      logger('SSR Rendering Error: ', err)
      if (+err.message === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    }
    res.end(html)
  })
})

module.exports = app
