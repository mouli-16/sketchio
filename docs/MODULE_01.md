# Sketchio ( MODULE 1 )

`(TOC)` 

## Introduction

​	Hey there !!, welcome to **Sketchio**, a multiplayer game wherein you sketch and others guess, it's a clone of the very popular Skribbl game (which is an online modification of [Pictionary](https://en.wikipedia.org/wiki/Pictionary) game that we play).

​	We will cover the entire project over a period of 10 days, after which you will be given some time for open innovation, where you are free to add as many features as you wish to make your project unique and outstanding. But before we move on further, let’s have a rough overview of the project.

### Overview of the project

​	Over the period of 10 days, we will be building a project that will have: 

+ A chat component, so that players can communicate, set user defined _words_, and _guess_ the word from the sketch,

+ A draw board component, to sketch with different stroke colours and sizes,

+ A leader board component to display the points and standings of players, and

+ A landing page to join and create rooms

​	As you can see, this is an example of a **Full Stack Project**.

### What do you mean by a Full Stack Project?

​	Any application be it a website, or a desktop application or a mobile phone application, has a certain user interface, something you see and interact with, that interface is called the Frontend of that application (or the client-side application). Now, apart from the visual and interactive part, an application also requires something called as Backend (or the server-side application) to govern the behaviour of it, for example when you search for something on Google, how does it fetch the results? or rather what makes the results and sends it to you ? or maybe when you are playing a multiplayer online game, what makes it multiplayer ? This is an invisible part that the end users don't really see, but it encapsulates the main logic of the application. Besides these, there is one more part called as a Database which as the name suggests stores data, for example when you are shopping on Amazon, your cart items are stored in the database, so when you visit the website again, you can see them.

​	So a full stack project is simply one which involves both frontend and backend, and usually utilising a Database (sometimes this is also considered as part of the backend) to store data. Now, there are a lot of different pre-written frameworks / libraries in different languages already present out there, and usually constitute the [stack](https://en.wikipedia.org/wiki/Solution_stack) of the application. One popular stack (at least at the time of writing this) is the [**MERN**](https://www.mongodb.com/mern-stack) stack, which means **M**ongoDB for the database, **E**xpress for the server, **R**eact for the frontend library, and **N**ode as the runtime environment for development in JavaScript.

### Architecture of a typical App

![Architecture](Images/architecture.png)

## Prerequisites

​	The project can be followed by anyone who is interested, but a basic knowledge in the following would help:

+ Basics of internet like, IP address, Ports, TCP etc

+ Basics of HTML and JavaScript (Arrays, functions, classes etc)

​	Now Before we dive into the project there are certain stuff you need to do:

+ Install `node`

+ Setup a folder structure

## `node` Installation

+ [Linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
+ [Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
+ [OS X](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/)

## Setup a folder structure

​	We would recommend having 2 subfolders `frontend` and `backend` in the root of the project directory. And, now that you have `node` installed, let us add some boilerplate code, files and folders.

### Backend

​	First open up a terminal / command prompt / powershell and navigate to the `backend` directory and run `npm init`, it'll ask some questions, answer them or leave them blank for default values. then run the following:

```bash
npm install express socket.io
```

​	The above command will download and install two `npm` packages, namely `express` and `socket.io`,

+ `express`: In the very basic terms, `Express js` is a framework which essentials means, a lot of code is already written for you to perform the various task based on the requirements, it's an web framework, particularly used in the server side development, so that you can make scalable web applications. [[documentation](https://expressjs.com/en/4x/api.html)]
+ `socket.io`: `Socket.IO` is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients  and servers. It can be considered as a "slight" wrapper around the `WebSocket API`. More on that in the next module (Psst there's a cheatsheet for this package, which will help you :upside_down_face:). [[documentation](https://socket.io/docs/v4/)]

​	Now let us create the following files in this directory:

1. `app.js`: This will be the entry point file, in which we will initialise a `http` `server instance`, and with which we will initialise `Socket.IO` using `express` to create a [`requestListener`](https://www.w3schools.com/nodejs/func_http_requestlistener.asp), that handles request from the user, as well as response back to the user, like:

   ```javascript
   const { createServer } = require('http') // createServer is the funtion used to create a HTTP server instance
   const app = require('express') // requestListener
   const server = createServer(app) // HTTP server instance
   const io = require('socket.io')(server) // socket.io server object
   ```

   ​	Now the `server` (HTTP server instance) actually requires to _listen_ to requests and for that it requires a `port` number, so the following would be needed to actually make the `server` listen to requests:

   ```javascript
   const PORT = 8000
   ...
   server.listen(PORT, () => {
       // This is a callback funtion, which will be fired once the server starts listening
       console.log('server listening on port:', PORT)
   })
   ```

2. `eventHandlers.js`: This will contain all the code required for handling various `socket` `events`.

   ​	To actually define event handlers in a different file (which is recommended, _separation of concerns_), add the following lines in `app.js`:

   ```javascript
   const eventHandlers = require('./eventHandlers')(io)
   io.on('connection', eventHandlers)
   ```

   ​	And in the `eventHandlers.js` file, you export a function that takes `io` as parameter and returns another function (this is the function that gets stored into the `eventHandlers` constant as shown above), which actually handles various `events`, by taking a `socket` object as parameter, like:

   ```javascript
   module.exports = (io) => {
       function eventHandlers (socket) {
           /*Handle various events here*/
       }
       return eventHandlers
   }
   ```

3. `users.js`: This will act as our database, you can either use this as a `model` with some database like `mongoDB` or `sqlite `, or maybe just initialise an array in it and add methods to create/update/delete data etc from that array, for example:

   ```javascript
   users = []
   ...
   function addUser(name, /*and other things*/) {
       users.push({ name, /*other data pertaining to user*/ })
   }
   ```
   
4. `.gitignore`: This file is what tells `git` to ignore some of the folders / files to include them in the source control. If you have run the `npm install` command as shown above then you may have noticed a folder `node_modules` is created which actually contains the packages we installed and it is not a good practice to commit them to the source control, so add a line "`node_modules`" in this file.

### Frontend


​	Now, lets come to the `client side` part, first navigate to the `frontend` folder and run the following:

```bash
npx create-react-app .
```

​	`create-react-app` is neat little tool to quickly initialise a `React` application, (and to know about the difference between `npx` and `npm`, check [this](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/) out). It'll take a few minutes after which a you can see a bunch of folders and files created. But what is `React` anyway?

​	`React` or `ReactJS` is a frontend JavaScript library for building user interfaces or UI components. Which essentially means, it helps us create the client side part, the part that determines what the client sees and how you want to present your application to your end user (For more details go through [this](https://reactjs.org/docs/getting-started.html) link).

​	And with this, to implement `WebSockets` we need `socket.io-client`, so run:

```bash
npm install socket.io-client
```

​	And after the installation, except `App.js` and `index.js`, remove everything from `src` folder and create two folders named `components` and `pages` in `src` for different components and pages of the project respectively. You can also create a `styles` folder for all your `css` files or store them in `components` and `pages` along with their respective `jsx` files but do create separate `css` files for each component and page to reduce complexity.

​	Now, what does `Socket.IO` do is create an `socket` object to make a connection to the `server`. So to use it globally across all components we can initialise it in a file, say `sockets.js`, and export it. Also to initialise `socket` object we require something called the endpoint of the WebSockets server, which in our case (local development) would be `ws://localhost:<port number>` (we need this because the client side is served separately from the server side). So it would be something like:

```javascript
import io from "socket.io-client";
export const socket = io(/*endpoint*/);
```

​	Now, let's dive into one of the core concept of the project, namely **WebSockets**.

## WebSockets

> WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.
>
> The WebSocket protocol enables interaction between a web browser (or other client application) and a web server with lower overhead, facilitating real-time data transfer from and to the server. This is made possible by providing a standardized way for the server to send content to the client without being first requested by the client, and allowing messages to be passed back and forth while keeping the connection open. In this way, a two-way ongoing conversation can take place between the client and the server. ~ [_Wikipedia_](https://en.wikipedia.org/wiki/WebSocket)

​	So `WebSocket` is nothing but a protocol that lets us have a full-duplex communication between server and the client. And to implement it we use `Socket.IO` (there are other packages also that we can use, but `Socket.IO` is one of the popular ones, super easy to implement and understand,  and also gives a lot of other functionalities such as broadcasting and namespacing). Now there's something called as `event`s in `Socket.IO`, which lets us emit some data from one end to another and on receiving the data, we can run a `callback` function to do something useful with that data (by ends, we mean that both `server` and `client` can emit and receive data through events). A simple overview on how to use `Socket.IO` for emitting data is:

```javascript
socket.emit('EventName', 'Some data, that can be string or an object')
```

```javascript
socket.on('EventName', (data) => {
    console.log(data) // The data we send from one end gets printed once it has arrived
})
```

​	So in simple terms, on one end you could emit data and on another end you can define a `callback` function to fire up once it receives that data, Now if you feel confident enough in the above fundamentals, let's build a simple connection between the `frontend` and `backend`.

## First connection

​	Now lets make the first connection between the server and the client:

+ The `eventHandlers` function in `backend/eventHandlers.js` file, as we have already discussed, will fire up once the connection is established, so add a `console.log` statement to know if a `client` got connected and besides this, with `Socket.IO` we get a `disconnect` event (refer the documentation to know more about such special events) emitted whenever a client gets disconnected. So using this we can add another `console.log` statement in the callback function of the event to know if a `client` got disconnected.
+ The same goes in the client side, so something like the following would be required in our root component (`App.js`) :

```javascript
socket.on("connect", () => {
    console.log(socket.connected); // true
});
```

```javascript
socket.on("disconnect", () => {
    console.log(socket.connected); // false
});
```
​	where `socket.connnected` is an attribute which describes whether the socket is currently connected to the server or not.

## Task

​	If you have done so far, you have a bare-bone React app connected to a server using socket. So now as a task you may implement a counter that keeps track of the users connected to the server. So store every user that connects, i.e. store their name and socket id, and also `console.log` all that data in the client side.

