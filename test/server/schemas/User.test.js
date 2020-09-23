/**
 * @jest-environment node
 */
/* eslint-disable handle-callback-err */
// const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { closeDatabase, connect } = require('../db-utils')
const User = require('../../../server/database/schemas/User')

const MOCK_USER = {
  username: 'johndoe',
  password: 'testpassword'
}

// create a user a new user
let testUser

// @todo move tese to db-utils https://zellwk.com/blog/jest-and-mongoose/
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
  testUser = new User(MOCK_USER)
  await testUser.save()
})

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await User.deleteMany()
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
    const isMatch = await testUser.verifyPassword('foobar')
    expect(isMatch).toBeTruthy()
  })

  it('does not update a password if not changed', async () => {
    testUser.password = MOCK_USER.password
    await testUser.save()
    const isMatch = testUser.verifyPassword(MOCK_USER.password)
    expect(isMatch).toBeTruthy()
  })

  it('should return an error on salt generation error', async () => {
    jest.spyOn(bcrypt, 'genSalt').mockImplementation((salt, cb) => {
      cb(new Error('error'), null)
    })
    testUser.password = 'foobar'
    await expect(testUser.save()).rejects.toEqual(new Error('error'))
    bcrypt.genSalt.mockRestore()
  })

  it('should return an error hash generation error', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation((pw, pw2, cb) => {
      cb(new Error('error'))
    })
    testUser.password = 'foobar'
    await expect(testUser.save()).rejects.toEqual(new Error('error'))
    bcrypt.hash.mockRestore()
  })

  describe('verifyPassword', () => {
    it('should match passwords', async () => {
      await expect(
        testUser.verifyPassword('testpassword')
      ).resolves.toBeTruthy()
    })

    it('should reject unmatched passwords', async () => {
      await expect(
        testUser.verifyPassword('testpassword2')
      ).resolves.toBeFalsy()
    })
  })
})
