const dblogger = require('debug')('steamroi:db')
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('../database/schemas/User')

module.exports = function (app) {
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
        usernameField: 'email',
        passwordField: 'password'
      },
      function (email, password, done) {
        let newUser

        User.findOne({ username: email }, function (err, user) {
          if (err) return done(err)
          if (user) {
            // user email exists
            dblogger('Username already exists.')
            return done(new Error('Username already exists.'), false)
          } else {
            dblogger('Creating new user')
            // create a new user
            newUser = new User({
              username: email,
              password
            })

            newUser
              .save()
              .then(u => {
                return done(null, u)
              })
              .catch(error => {
                return done(error, false)
              })
          }
        })
      }
    )
  )

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (user, done) {
    User.findById(user.id, function (err, user) {
      if (err) {
        return done(err, false)
      }
      done(null, user)
    })
  })

  app.use(passport.initialize())
  app.use(passport.session())
}
