/* eslint-disable no-return-await */
/**
 * @jest-environment node
 */

const mongoose = require('mongoose')

const dbHandler = require('../db-handler')
const User = require('@server/database/schemas/User')

// create a user a new user
const testUser = new User({
  username: 'johndoe',
  password: 'testpassword'
})

/**
 * create a test user
 */
beforeEach(async () => await testUser.save())

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect())

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase())

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase())

describe('User', () => {
  it('creates a user in the collection', async () => {
    expect(async () => {
      await User.findOne({
        username: 'johndoe'
      })
    }).toBe('foo')
  })
})
