const mongoose = require('mongoose')

const User = require('./schemas/User')
const models = {
  User
}

mongoose.set('useCreateIndex', true)

const connectDb = () => {
  return new Promise((resolve, reject) => {
    const connection = mongoose.createConnection(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (connection) {
      resolve(connection)
    } else {
      reject(Error('Database connection failed'))
    }
  })
}

exports.connectDb = connectDb
exports.models = models
