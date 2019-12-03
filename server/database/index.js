const mongoose = require('mongoose')

const User = require('./schemas/User')
const models = {
  User
}

mongoose.set('useCreateIndex', true)

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

exports.connectDb = connectDb
exports.models = models
