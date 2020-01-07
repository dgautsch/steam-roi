const dblogger = require('debug')('steamroi:db')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const SteamStrategy = require('passport-steam').Strategy
const LocalStrategy = require('passport-local').Strategy

const { connectDb } = require('../database')
const User = require('../database/schemas/User')

module.exports = function (app) {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    User.findById(user.id, function (err, user) {
      done(err, user)
    })
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
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
      },
      function (req, email, password, done) {
        let newUser

        User.findOne({ username: email }, async function (err, user) {
          if (err) {
            return done(err, false)
          }
          if (user) {
            // user email exists
            return done(null, false)
          } else {
            // create a new user
            newUser = new User({
              username: email,
              password
            })
            try {
              await newUser.save()
              return done(null, newUser)
            } catch (error) {
              return done(error, false)
            }
          }
        })
      }
    )
  )

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

  app.use(passport.initialize())
  app.use(passport.session())
}
