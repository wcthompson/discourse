var fs = require('fs');
var express = require('express');
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

//ROUTES
app.use(express.static('public'))

app.get('/server', function(req, res){
  res.sendFile(__dirname + '/server.html');
});

app.get('/clientA', function(req, res){
  res.sendFile(__dirname + '/clientA.html');
});

app.get('/clientB', function(req, res){
  res.sendFile(__dirname + '/clientB.html');
});

app.get('/audience', function(req, res){
  res.sendFile(__dirname + '/audience.html');
});

io.on('connection', function(socket){
  // set up client handlers
  socket.on('CLIENT A WORD', function(word){
    io.emit('SERVER ADD WORD CLIENT A', word)
  });

  socket.on('CLIENT B WORD', function(word){
    io.emit('SERVER ADD WORD CLIENT B', word)
  });

  socket.on('CHANGE SIDES', function(){
    io.emit('SERVER CHANGE SIDES')
  });

  socket.on('QUESTION', function(q){
    io.emit('QUESTION', q);
  })
});

var port = process.env.PORT || 8080;

http.listen(port, function(){
  console.log('listening on *:'+port);
});
