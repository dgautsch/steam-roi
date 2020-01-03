const dblogger = require('debug')('steamroi:db')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const SteamStrategy = require('passport-steam').Strategy
const LocalStrategy = require('passport-local').Strategy

const { connectDb } = require('../database')
const User = require('~server/database/schemas/User')

module.exports = function (app) {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (obj, done) {
    done(null, obj)
  })

  // Steam Strategy
  passport.use(
    new SteamStrategy(
      {
        returnURL: process.env.RETURN_URL,
        realm: process.env.REALM,
        apiKey: process.env.STEAM_API_KEY
      },
      (identifier, profile, done) => {
        process.nextTick(function () {
          profile.identifier = identifier
          return done(null, profile)
        })
      }
    )
  )

  // Local Strategy
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (!user.verifyPassword(password)) {
          return done(null, false)
        }
        return done(null, user)
      })
    })
  )

  connectDb()
    .then(async connection => {
      app.use(
        session({
          secret: process.env.SESSIONS_SECRET,
          name: 'Steam ROI Credentials Session',
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

  app.use(passport.initialize())
  app.use(passport.session())
}
