const { addUser } = require('./users')

module.exports = (io) => {
    function eventHandlers (socket) {
        /*Handle various events here*/
        console.log('A client just got Connected !!');

        socket.on('user-name', (name) => {
            const sid = socket.id
            addUser({sid, name})
            io.emit('user-name', {sid, name})
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected :(');
        })
    }
    return eventHandlers
}
