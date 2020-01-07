const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const connectDb = () => {
  return mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

exports.connectDb = connectDb
