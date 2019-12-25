/**
 * @jest-environment node
 */
/* eslint-disable handle-callback-err */
// const mongoose = require('mongoose')

const { clearDatabase, closeDatabase, connect } = require('../db-utils')
const UserModel = require('../../../server/database/schemas/User')

const MOCK_USER = {
  username: 'johndoe',
  password: 'testpassword'
}

// create a user a new user
let testUser

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await connect()
})

/**
 * Seed the database.
 */
beforeEach(async () => {
  testUser = new UserModel(MOCK_USER)
  await testUser.save()
})

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await clearDatabase()
})

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await closeDatabase()
})

describe('User', () => {
  it('creates a user in the collection', async () => {
    expect(testUser.username).toBe(MOCK_USER.username)
  })

  it('updates a user password', async () => {
    testUser.password = 'foobar'
    await testUser.save()
    const isMatch = await testUser.comparePassword('foobar')
    expect(isMatch).toBeTruthy()
  })

  describe('comparePassword', () => {
    it('should match passwords', async () => {
      testUser.comparePassword('testpassword', (err, isMatch) => {
        expect(isMatch).toBeTruthy()
      })
    })

    it('should reject unmatched passwords', async () => {
      testUser.comparePassword('testpassword2', (err, isMatch) => {
        expect(isMatch).toBeFalsy()
      })
    })
  })
})
