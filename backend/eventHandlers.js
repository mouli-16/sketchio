const { createRoom, checkRoom, addUser, removeUser, getUser, getUsersInRoom } = require('./users');

module.exports = (io) => {
    function eventHandlers(socket) {
        console.log('A user connected');

        socket.on('create room', (name, cb) => {
            const { error, user } = createRoom({sid: socket.id, name})
            if (error) {
                cb(error, null)
                return
            }
            cb(null, user.room)
        })

        socket.on('check room', (_room, cb) => {
            const { error, room } = checkRoom(_room)
            if (error) {
                cb(error, null)
                return
            }
            cb(null, room)
        })

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
            socket.to(user.room).emit('message', {message: msg, sentBy: user.name})
            cb(null, msg)
        })

        socket.on('canvas-data', (data)=> {
            console.log('draw data', data);
            const user = getUser(socket.id)
            if(!user) {
                console.log('user not found', null)
                return
            }
            
            socket.to(user.room).emit('canvas-data', data);
        })

        socket.on('disconnect', () => {
            const user = getUser(socket.id)
            const users = user == undefined ? undefined : getUsersInRoom(user.room)
            console.log('A user disconnected\n', 'users:', users);
            removeUser(socket.id)
        })
    }
    return eventHandlers
}