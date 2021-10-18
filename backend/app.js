const express = require('express')
const { createServer } = require('http')

const app = express()
const server = createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

const eventHandlers = require('./eventHandlers')(io)

const PORT = 8000

/**
 * Socket event handlers
 */
io.on('connection', eventHandlers)


server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
