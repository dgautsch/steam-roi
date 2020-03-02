const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()

const dbUtils = {}

/**
 * Connect to the in-memory database.
 */
dbUtils.connect = async () => {
  const uri = await mongod.getConnectionString()

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }

  await mongoose.connect(uri, mongooseOpts)
}

/**
 * Drop database, close the connection and stop mongod.
 */
dbUtils.closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

/**
 * Remove all the data for all db collections.
 */
dbUtils.clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

module.exports = {
  connect: dbUtils.connect,
  closeDatabase: dbUtils.closeDatabase,
  clearDatabase: dbUtils.clearDatabase
}

module.exports.setupMockDb = () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(async () => dbUtils.connect())

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => dbUtils.clearDatabase())

  /**
   * Remove and close the db and server.
   */
  afterAll(async () => dbUtils.closeDatabase())
}
