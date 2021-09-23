const { addUser, removeUser, getUsersInRoom } = require('../users');

class Chat {
  constructor (io, socket) {
    this.io = io
    this.socket = socket

    socket.on('chat:join', (data) => { this.join(data) })
    socket.on('chat:message', (data, cb) => { this.message(data, cb) })
  }

  join ({ room, name }) {
    // console.log(room ,name);
    const { error, user } = addUser({ name, room });
    this.room = room
    this.socket.join(this.room)
    this.socket.to(this.room).emit('chat:admin:join', { room, name })
    this.socket.to(this.room).emit('roomData', { room: this.room, users: getUsersInRoom(this.room) });
  }

  message (msg, cb) {
    console.log(msg);
    this.socket.to(this.room).emit('chat:message', msg)
    cb(msg)
  }
}

module.exports = (io, socket) => {new Chat(io, socket)}
