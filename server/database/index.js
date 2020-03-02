const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connectDefaultDb = () => {
  return mongoose.connect(process.env.MONGO_URL, dbOptions)
}

const connectDb = () => {
  return mongoose.createConnection(process.env.MONGO_URL, dbOptions)
}

const connectModel = (connection, model, schema) => {
  const conn = connection || connectDb()
  conn.model(model, schema)
}

exports.connectDb = connectDb
exports.connectDefaultDb = connectDefaultDb
exports.connectModel = connectModel
