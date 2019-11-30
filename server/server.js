const express = require('express')
const logger = require('morgan')
const path = require('path')
const routes = require('./routes')
const app = express()
const passport = require('passport')
const session = require('express-session')
const SteamStrategy = require('passport-steam').Strategy

const middleware = require('./middleware')

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

app.use('/', routes)
app.use(express.static(path.join(__dirname, '../public')))
app.get('/', function (req, res) {
  res.render('index', {
    user: req.user,
    title: 'Steam ROI'
  })
})
app.use(middleware.error)
app.use(middleware.notfound)
module.exports = app
