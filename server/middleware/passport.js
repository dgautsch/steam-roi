const logger = require('debug')('steamroi:passport')
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
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      function handleUserAuth () {
        User.findOne({ username: email }, function (err, user) {
          if (err) return done(err)
          if (user) {
            logger(`User ${user.id} exists, attempting login.`)
            return loginUser()
          } else if (req.path === '/register') {
            logger('New account, attempting creation.')
            return createUser()
          }
          return done(null, false, { message: 'USER_NOT_FOUND' })
        })
      }

      function loginUser () {
        return User.findOne({ username: email }, async function (err, user) {
          if (err) return done(err)

          // no user was found
          if (!user) {
            return done(null, false, { message: 'USER_NOT_FOUND' })
          }

          // verify password matches
          const passwordValid = await user.verifyPassword(password)
          if (!passwordValid) {
            return done(null, false, { message: 'INVALID_PASSWORD' })
          }

          // return authenticaterd user
          logger(`Logging in ${user.username}`)
          return done(null, user, { message: 'USER_AUTHENTICATED' })
        })
      }

      function createUser () {
        // create a new user
        const newUser = new User({
          username: email,
          password
        })

        newUser
          .save()
          .then(user => {
            logger(`User created ${user.username}`)
            return done(null, user, { message: 'USER_CREATED' })
          })
          .catch(error => {
            return done(error)
          })
      }

      if (!req.user) {
        handleUserAuth()
      } else {
        // User is already authenticated
        logger(`User ${req.user.id} already authenticated.`)
        done(null, req.user, { message: 'USER_AUTHENTICATED' })
      }
    }
  )
)

module.exports = passport
