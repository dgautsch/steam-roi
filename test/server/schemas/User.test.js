/**
 * @jest-environment node
 */

// const mongoose = require('mongoose')

const { setupMockDb } = require('../db-handler')
const User = require('../../../server/database/schemas/User')

const MOCK_USER = {
  username: 'johndoe',
  password: 'testpassword'
}

// create a user a new user
const testUser = new User(MOCK_USER)

/**
 * create a test user
 */
beforeEach(async () => testUser.save())

/**
 * setup mock db setup and teardown
 */
setupMockDb()

describe('User', () => {
  it('creates a user in the collection', async () => {
    const user = await User.findOne({
      username: 'johndoe'
    })
    expect(user.username).toBe(MOCK_USER.username)
  })
})
