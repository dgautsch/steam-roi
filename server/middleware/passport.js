const { connectDb } = require('../database')
const debug = require('debug')('steamroi:server')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const SteamStrategy = require('passport-steam').Strategy

module.exports = function (app) {
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
  connectDb()
    .then(async connection => {
      app.use(
        session({
          secret: 'Secrets',
          name: 'Steam Session',
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
      debug('Established sessions connection')
    })
    .catch(err => {
      debug('Could not establish sessions connection')
      throw new Error(err.message)
    })

  app.use(passport.initialize())
  app.use(passport.session())
}
