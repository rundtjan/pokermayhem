'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var port = process.env.PORT || 8080;

var app = express();


app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app);

var http = require('http').createServer(app);
var io = require('socket.io')(http);

  ///////everything hereafter to handle the websocket with socket.io:

io.on('connection', (socket) => {
   console.log('a user connected');
   io.emit("testing", "testing")
   socket.on('disconnect', () => {
       console.log('user disconnected');
     });

   socket.on('refresh', () => {
      console.log("refreshing")
       io.emit('refresh')
     });
   
   socket.on('resetpw', () => {
       //console.log(id, json)
       socket.broadcast.emit('reset')
   });

});

 ///////// socket.io ends here

http.listen(port, function () {
   console.log('Node.js listening on port 8080...');
});

