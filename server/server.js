const express = require('express')
const fs = require('fs')
const logger = require('morgan')
const dblogger = require('debug')('steamroi:db')
const path = require('path')
const cookieParser = require('cookie-parser')
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()
const { isProduction, disableDatabase } = require('../config')
const routes = require('./routes')
const { passport } = require('./middleware')
const { connectDb, connectDefaultDb } = require('./database')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
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

// Logger
if (isProduction) {
  app.use(logger('combined'))
} else {
  app.use(logger('dev'))
}

// Database
if (!disableDatabase) {
  passport(app, dblogger)
  connectDefaultDb()
    .then(() => {
      dblogger('Established default DB connection')
    })
    .catch(err => {
      dblogger('Could not establish database connection')
      throw new Error(err.message)
    })
  connectDb()
    .then(async connection => {
      app.use(
        session({
          secret: process.env.SESSIONS_SECRET,
          name: 'session-auth',
          cookie: {
            maxAge: 3600000
          },
          resave: true,
          saveUninitialized: true,
          store: new MongoStore({
            mongooseConnection: connection
          })
        })
      )
      dblogger('Established sessions DB connection')
    })
    .catch(err => {
      dblogger('Could not establish sessions connection')
      throw new Error(err.message)
    })
}
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())
// Route Handling
app.use('/api/', routes)
app.use('/public/', express.static(path.join(__dirname, '../public')))
app.get('*', (req, res) => {
  const context = {
    title: 'Steam ROI',
    url: req.url,
    isProduction,
    disableDatabase
  }

  bundleRenderer.renderToString(context, (err, html) => {
    if (err) {
      if (+err.message === 404) {
        res.status(404).end('Page not found')
      } else {
        console.log(err)
        res.status(500).end('Internal Server Error')
      }
    }
    res.end(html)
  })
})

module.exports = app
