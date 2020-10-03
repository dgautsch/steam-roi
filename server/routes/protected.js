const r = (module.exports = require('express').Router())
const isAuthenticated = require('../middleware/is-authenticated')

/**
 * These routes require authentication to be accessed.
 * If a user directly navigates here, the server will send the user
 * back to the home page. In the future we should enhance with a 404.
 */
r.get('/account', isAuthenticated)
r.get('/private', isAuthenticated)
