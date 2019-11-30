const express = require('express')
const session = require('express-session')
const fs = require('fs')
const logger = require('morgan')
const path = require('path')
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()
const routes = require('./routes')
// const middleware = require('./middleware')

const bundleRenderer = createBundleRenderer(
  require('../public/vue-ssr-bundle.json'),
  {
    template: fs.readFileSync(
      path.resolve(__dirname, '../app/templates/index.tpl.html'),
      'utf-8'
    )
  }
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new SteamStrategy(
    {
      returnURL: process.env.RETURN_URL,
      realm: process.env.REALM,
      apiKey: process.env.STEAM_API_KEY
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier
        return done(null, profile)
      })
    }
  )
)

app.use(
  session({
    secret: 'Secrets',
    name: 'Steam Session',
    cookie: {
      maxAge: 3600000
    },
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'))

app.use('/api/', routes)
app.use('/public/', express.static(path.join(__dirname, '../public')))
// app.use(middleware.error)
// app.use(middleware.notfound)

// Render all other routes with the bundleRenderer.
app.get('*', (req, res) => {
  bundleRenderer
    // Renders directly to the response stream.
    // The argument is passed as "context" to entry-server.js in the SSR bundle.
    .renderToStream({
      title: 'Steam ROI',
      url: req.path
    })
    .pipe(res)
})

module.exports = app
