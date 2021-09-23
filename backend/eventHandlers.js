const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

module.exports = (io) => {
    function eventHandlers(socket) {
        console.log('A user connected');

        socket.on('join', ({ room, name }, cb) => {
            const { error, user } = addUser({sid: socket.id, room, name})
            const users = getUsersInRoom(room)
            if (error) {
                cb(error, null)
                return
            }
            console.log('user:', user, '\nusers:', users);
            socket.join(room)
            socket.to(room).emit('player joined', user)
            cb(null, users)
        })

        socket.on('message', (msg, cb) => {
            const user = getUser(socket.id)
            console.log('onMessage', msg, user, socket.id);
            if(!user) {
                cb('user not found', null)
                return
            }
            socket.to(user.room).emit('message', msg)
            cb(null, msg)
        })

        socket.on('canvas-data', (data)=> {
            console.log('draw data', data);
            const user = getUser(socket.id)
            socket.to(user.room).emit('canvas-data', data);
        })

        socket.on('disconnect', () => {
            const user = getUser(socket.id)
            const users = getUsersInRoom(user?.room)
            console.log('A user disconnected\n', 'users:', users);
            removeUser(socket.id)
        })
    }
    return eventHandlers
}