const express = require('express')
const fs = require('fs')
const logger = require('morgan')
const dblogger = require('debug')('steamroi:db')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()
const { isProduction, disableDatabase } = require('../config')
const routes = require('./routes')
const { passport } = require('./middleware')
const { connectDb } = require('./database')
const serverBundle = require('../public/vue-ssr-bundle.json')
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
  connectDb()
    .then(() => {
      dblogger('Database connected')
    })
    .catch(err => {
      dblogger('Could not connect to database')
      throw new Error(err.message)
    })
}

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
