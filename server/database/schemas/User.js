const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String
  }
})

UserSchema.pre('save', function () {
  const user = this
  return new Promise((resolve, reject) => {
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      reject(new Error('Password unchanged, cancelling save operation.'))
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) reject(err)

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) reject(err)

        // override the cleartext password with the hashed one
        user.password = hash
        resolve()
      })
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err)
      resolve(isMatch)
    })
  })
}

module.exports = mongoose.model('User', UserSchema)
