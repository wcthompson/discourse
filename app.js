var fs = require('fs');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// questions and answers
var questions = []

eval(fs.readFileSync("lib/nodeMarkov.js","utf-8"));
// set up the markov generators
var charMarkov = new MarkovGenerator(3, 30);
var wordMarkov = new MarkovGeneratorWord(2, 25);


app.get('/server', function(req, res){
  res.sendFile(__dirname + '/server.html');
});

app.get('/clientA', function(req, res){
  res.sendFile(__dirname + '/clientA.html');
});

app.get('/clientB', function(req, res){
  res.sendFile(__dirname + '/clientB.html');
});

io.on('connection', function(socket){
  socket.on('client a keypress', function(key){
    io.emit('keypress', "pressed " + key);
    io.emit('server_keypress', "Client A pressed " + key);
  });

  socket.on('client b keypress', function(key){
    io.emit('keypress', "pressed " + key);
    io.emit('server_keypress', "Client B pressed " + key);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
