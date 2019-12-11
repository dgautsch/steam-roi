const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/.env') })
const app = require('./server.js')
const debug = require('debug')('steamroi:server')
const http = require('http')
const port = normalizePort(process.env.PORT || '3000')
const server = http.createServer(app)
const { connectDb } = require('./database')

connectDb()
  .then(async () => {
    app.set('port', port)
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
  })
  .catch(err => {
    debug('Could not connect to database')
    throw new Error(err.message)
  })

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Database connected and server listening on ' + bind)
}
