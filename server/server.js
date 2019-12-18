const express = require('express')
const fs = require('fs')
const logger = require('morgan')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()
const routes = require('./routes')
const { passport } = require('./middleware')
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

// Middleware
passport(app)

// Route Handling
app.use(logger('dev'))
app.use('/api/', routes)
app.use('/public/', express.static(path.join(__dirname, '../public')))

// Render all other routes with the bundleRenderer.
app.get('*', (req, res) => {
  const context = {
    title: 'Steam ROI',
    url: req.url
  }

  bundleRenderer
    // Renders directly to the response stream.
    // The argument is passed as "context" to entry-server.js in the SSR bundle.
    .renderToString(context, (err, html) => {
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
