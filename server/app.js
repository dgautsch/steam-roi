const express = require('express')
const logger = require('morgan')
const path = require('path')
const routes = require('./routes')
const passport = require('passport')
const session = require('express-session')
const SteamStrategy = require('passport-steam').Strategy
const app = express()

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3000/auth/steam/return',
  realm: 'http://localhost:3000/',
  apiKey: process.env.STEAM_API_KEY
},
function (identifier, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's Steam profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Steam account with a user record in your database,
    // and return that user instead.
    profile.identifier = identifier
    return done(null, profile)
  })
}
))

app.use(session({
  secret: 'Secrets',
  name: 'Steam Session',
  resave: true,
  saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'))

app.use('/', routes)
app.use(express.static(path.join(__dirname, '../public'), {extensions: ['json']}))
app.get('/', function (req, res) {
  res.render('index', { user: req.user })
})

app.get('/account', ensureAuthenticated, function (req, res) {
  res.render('account', { user: req.user })
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

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

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/')
}

module.exports = app
