const express = require('express')
// const session = require('express-session')
const fs = require('fs')
const logger = require('morgan')
const path = require('path')
// const passport = require('passport')
// const SteamStrategy = require('passport-steam').Strategy
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()
const routes = require('./routes')
// const middleware = require('./middleware')
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

// passport.serializeUser(function (user, done) {
//   done(null, user)
// })

// passport.deserializeUser(function (obj, done) {
//   done(null, obj)
// })

// passport.use(
//   new SteamStrategy(
//     {
//       returnURL: process.env.RETURN_URL,
//       realm: process.env.REALM,
//       apiKey: process.env.STEAM_API_KEY
//     },
//     function (identifier, profile, done) {
//       process.nextTick(function () {
//         profile.identifier = identifier
//         return done(null, profile)
//       })
//     }
//   )
// )

// app.use(
//   session({
//     secret: 'Secrets',
//     name: 'Steam Session',
//     cookie: {
//       maxAge: 3600000
//     },
//     resave: true,
//     saveUninitialized: true
//   })
// )

// app.use(passport.initialize())
// app.use(passport.session())

app.use(logger('dev'))

app.use('/api/', routes)
app.use('/public/', express.static(path.join(__dirname, '../public')))
// app.use(middleware.error)
// app.use(middleware.notfound)

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
