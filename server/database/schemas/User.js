const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
})

const User = mongoose.model('User', userSchema)

exports.User = User
