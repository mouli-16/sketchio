// const Chat = require('./chat')
// const DrawingBoard = require('./drawingBoard')
// const LeaderBoard = require('./leaderBoard')

module.exports = (io) => {
  function eventHandlers (socket) {
    console.log('A user connected.')

    // Chat(io, socket)
    // DrawingBoard(io, socket)
    // LeaderBoard(io, socket)

    socket.on('disconnect', () => {
      console.log('A user disconnected.')
    })
  }
  return eventHandlers
}
