const dblogger = require('debug')('steamroi:passport')
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('../database/schemas/User')

module.exports = function () {
  passport.serializeUser(function (user, done) {
    if (!user) {
      done(null)
    }
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
        const usernameExistsMessage = 'username already exists'

        User.findOne({ username: email }, function (err, user) {
          if (err) return done(err)
          if (user) {
            // user email exists
            dblogger(usernameExistsMessage)
            return done(null, false, { message: usernameExistsMessage })
          } else {
            dblogger('creating new user')
            // create a new user
            newUser = new User({
              username: email,
              password
            })

            newUser
              .save()
              .then(u => {
                return done(null, u, { message: 'user created' })
              })
              .catch(error => {
                return done(error)
              })
          }
        })
      }
    )
  )
}
