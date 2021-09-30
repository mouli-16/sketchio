const { createRoom, checkRoom, addUser, removeUser, getUserById, getUserByName, updateUser, getUsersInRoom } = require('./users');

module.exports = (io) => {
    function eventHandlers(socket) {
        console.log('A user connected');

        socket.on('create room', (name, cb) => {
            console.log('event create room');
            const { error, user } = createRoom({sid: socket.id, name, points: 0})
            if (error) {
                cb(error, null)
                return
            }
            cb(null, user.room)
        })

        socket.on('check room', ({room:_room,name}, cb) => {
            const { error, room } = checkRoom(_room,name)
            if (error) {
                cb(error, null)
                return
            }
            cb(null, room)
        })

        socket.on('join', ({ room, name, points }, cb) => {
            const { error, user } = addUser({sid: socket.id, room, name, points})
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

        socket.on('message', ({message:msg, turn=null}, cb) => {
            const user = getUserById(socket.id)
            console.log('onMessage', msg, user, socket.id);
            if(!user) {
                cb('user not found', null)
                return
            }
            console.log('turn:', turn);
            if(turn) {
                const user2 = getUserByName(turn)
                console.log('in message event:', user2);
                const word = user2.word
                if(word && word === msg) {
                    if(user.name === turn) {
                        cb('You cannot guess, it\'s your turn', null)
                        return
                    }
                    socket.to(user.room).emit('message', {message: 'I guessed it!!', sentBy: user.name})
                    cb(null, {correctGuess: true, msg:`You guessed it right, the word is ${word}`})
                    return
                }
            }
            socket.to(user.room).emit('message', {message: msg, sentBy: user.name})
            cb(null, {msg})
        })

        socket.on('word chosen', (word, cb) => {
            const user = getUserById(socket.id)
            if(!user) {
                cb('user not found', null)
                return
            }
            if(user.word) {
                cb('You have already chosen a word', null)
                return
            }
            const { error } = updateUser({...user, word})
            if (error) {
                cb(error, null)
                return
            }
            socket.to(user.room).emit('message', {message: 'I have chosen a word', sentBy: user.name, chosen: true})
            cb(null, word)
        })

        socket.on('canvas-data', (data)=> {
            // console.log('draw data', data);
            const user = getUserById(socket.id)
            if(!user) {
                console.log('user not found', null)
                return
            }
            
            socket.to(user.room).emit('canvas-data', data);
        })

        socket.on('disconnect', () => {
            const user = getUserById(socket.id)
            const users = user == undefined ? undefined : getUsersInRoom(user.room)
            console.log('A user disconnected\n', 'users:', users);
            removeUser(socket.id)
        })
    }
    return eventHandlers
}