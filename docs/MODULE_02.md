# Sketchio ( MODULE  02 ) || [🎬](https://drive.google.com/file/d/19OIzHN0KT2rzYJS3_2gNlSmKk9ssdZ9Z/view?usp=sharing)

`(TOC)`

​	In the **MODULE 01** we discussed a simple `connection` event, `console.log`ed it and also discussed storing users in the `backend`. So in this module let's try to implement:

+ A normal chat,
+ The logic of setting up a _word_ to guess,
+ The logic for guessing the _word_, and
+ Implement `Socket.IO`'s room functionality.

## Normal Chat

​	So how does a chat work ? A player sends a message to the server, server sends (or _broadcasts_) the message to other players and this happens with each player. In `socket.io`, roughly we can do this by:

```javascript
// Client
socket.emit('msg', /*The message*/)

// Server
socket.on('msg', /*A callback function to handle the broadcast of the message*/)
```

​	For example, the `callback` function to implement the broadcast of message to everyone connected except the sender, can be done via `socket.broadcast.emit` (i.e. to emit the message that server just received from the sender to everyone connected except the sender).

​	The `client` side part for this should include a mechanism to take input from the player and `emit` it to server. With `Socket.IO` you can define `callback` functions when you `emit` data, which gets fired up once the other end has received that data and calls it, yes you have read it right, you can define `callback` functions in the `client` side code and call them in the `server` side code or vice versa, these are called as [Acknowledgements](https://socket.io/docs/v4/emitting-events/#acknowledgements). An example of using acknowledgements:

```javascript
// Client
socket.emit('msg', /*The message*/, (param1, param2) => {
    // A callback function to call on the other side
    console.log(param1, param2)
})

// Server
socket.on('msg', (msg, callback) => {
    console.log(msg)
    callback('From the server', msg)
})
```

​	So when you `emit` the player's input, define a `callback` function that will handle the mechanism to display message for the sender. And then define another `callback` for `socket.on` to handle the mechanism of displaying messages received (indirectly) from another player. We have split the mechanism of displaying messages depending upon whether a player is the sender or receiver of the message. Mechanism for displaying message can be to store messages into an array and simply make a `paragraph` tag for every item in that array and render it. Pseudo code for doing this in `React` is:

```jsx
// In a funtion based component
msgs = [/*Keep a track of message content and sender*/]
return (
    <div className='messages'>
    {msgs.map((msg,i) => <p key={i}>msg.sender: msg.content</p>)}
    </div>
)
```

## `word` Setup logic

​	There are different ways, you can implement this feature, either having a dedicated `input` field or something like that. But to spice up things a little, why not implement this in the chat itself. You can do this by having some prefix to differentiate between this and the normal chat and `emit` out a different `event` if the message that a player enters has that prefix, like:

```javascript
// in the `input` field's onsubmit handler
if (msg.startsWith('!')) {
    socket.emit('word', /*The `word` goes here*/)
} else {
    socket.emit('msg', ... )
}
```

​	And on the server side you can broadcast this event to other players connected and handle it further. But you would need to store the `word` on the server side so that whenever someone guesses a word you can check if the guess is right or wrong by comparing it on the `server` side. You could add `word` as a property to the user (who is setting the `word`) in `users.js` by changing the `addUser` function (if you are using an array to store users) like:

```javascript
users.push({sid, name, word})
```

​	Moreover you also need to notify all other players about this and in the `client` side you need to store the fact that a particular player has set a `word`, you can do this by storing the name of that player in a variable and sending this within the `msg` event.

## `word` Guessing logic

​	Now that a word is set, to actually check if a player guessed it right, as we have discussed above, it should be done on the `server` side and then emit a `event` to notify all others or you can simply modify the content of the message so that it indicates that a player has guessed the word, like:

```javascript
// Server
const { word } = findUserByName(msg.turn)
if (msg.content === word) {
    msg.content = 'I have guessed the word'
}
// and then broadcast `msg` to all other players and fire up the `callback` function
```

## `Socket.IO` rooms

​	Now with `Socket.IO` we can also define a room and make players join it (For documentation on rooms refer [here](https://socket.io/docs/v4/rooms/)). Now for this module let us pre-define the name of the room as `room1`, so that in the future you can add a join/create room functionality. So at the top of `eventHandlers` function, you need to add a statement calling the `join` method with `room1` as the parameter (we'll change this when we add join/create). And now you also need to change some of the `emit` functions, so If you want to emit to everyone in the room except the sender, use `socket.to('room1').emit` and for more refer the [cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/).

## Conclusion

​	If you have done so far, you have a functional chat that can also be used to set and guess word. Besides now you have a fair understanding of how to use `Socket.IO` to implement `WebSockets`, and also implement `broadcasts`, `acknowledgements` and `rooms`.
