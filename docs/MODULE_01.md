# Sketchio ( SETUP )

`(TOC)` 

​	Hello there!! Welcome to Sketchio, Ten Days of Code. Before we dive into the project there are certain stuff you need to do:

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

   ​	To actually define event handlers in a different file, add the following lines in `app.js`:

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

​	`create-react-app` is neat little tool to quickly initialise a `React` application, and to know about the difference between `npx` and `npm`, check [this](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/) out.

