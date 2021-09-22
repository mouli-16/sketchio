class Chat {
  constructor (io, socket) {
    this.io = io
    this.socket = socket

    socket.on('chat:join', (data) => { this.join(data) })
    socket.on('chat:message', (data, cb) => { this.message(data, cb) })
  }

  join ({ room, name }) {
    // console.log(room ,name);
    this.room = room
    this.socket.join(this.room)
    this.socket.to(this.room).emit('chat:admin:join', { room, name })
  }

  message (msg, cb) {
    console.log(msg);
    this.socket.to(this.room).emit('chat:message', msg)
    cb(msg)
  }
}

module.exports = (io, socket) => {new Chat(io, socket)}
