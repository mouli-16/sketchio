const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { createServer } = require('http')

require('dotenv').config()

const app = express()
const server = createServer(app)
const io = socketio(server, {
  serveClient: false,
  cors: {
    origin: process.env.CORS_ORIGINS || '*'
  }
})

// const routes = require('./routes')
const eventHandlers = require('./eventHandlers')(io)

const PORT = process.env.PORT || 8000

/**
 * Socket event handlers
 */
io.on('connection', eventHandlers)

/**
 * Middlewares
 */
app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGINS || '*'
}))


server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
