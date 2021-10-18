module.exports = (io) => {
    function eventHandlers (socket) {
        /*Handle various events here*/
        console.log('A client just got Connected !!');
        
        socket.on('disconnect', () => {
            console.log('Client disconnected :(');
        })
    }
    return eventHandlers
}
