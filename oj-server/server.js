const express = require('express'); // import express package
const app = express();
const path = require('path');
const restRouter = require('./routes/rest'); // import rest router

var http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
// require('./services/editorSocketService')(io) is function call
var editorSocketService = require('./services/editorSocketService')(io);

// find the MongoDB URL for the deployment we just created in mLab, replace the username and password
// we should put username and password to a separate service
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://AlexFlanker:Stj920625@ds053156.mlab.com:53156/ocj-test-db');

// if the url matches '/api/v1', it will use restRouter to handle the traffic
app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public')});
})
// connect to the server
const server = http.createServer(app);
io.attach(server);
server.listen(3030);

server.on('listening', onListening);
// listening call back
function onListening() {
    console.log('App listenig on port 3030!')
}