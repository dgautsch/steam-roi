const dblogger = require('debug')('steamroi:passport')
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('../database/schemas/User')

passport.serializeUser(function (user, done) {
  if (!user) {
    done(null)
  }
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  User.findById(user._id, function (err, user) {
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

// Local Register Strategy
passport.use(
  'local-register',
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
          dblogger(`User ${user.id} exists, cancelling account creation.`)
          return done(null, false, { message: 'USER_EXISTS' })
        } else {
          // create a new user
          newUser = new User({
            username: email,
            password
          })

          newUser
            .save()
            .then(u => {
              return done(null, u, { message: 'USER_CREATED' })
            })
            .catch(error => {
              return done(error)
            })
        }
      })
    }
  )
)

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      User.findOne({ username: email }, function (err, user) {
        if (err) return done(err)

        // no user was found
        if (!user) {
          return done(null, false, { message: 'USER_NOT_FOUND' })
        }

        // verify password matches
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'INVALID_PASSWORD' })
        }

        // return authenticaterd user
        dblogger(`Logging in ${user}`)
        return done(null, user, { message: 'USER_AUTHENTICATED' })
      })
    }
  )
)

module.exports = passport
