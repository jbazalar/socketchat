var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var msg = {"newuser":"A user connected"};
var port = process.env.PORT || 8000;

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  //res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log(msg.newuser);
  io.emit('chat message', msg.newuser);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
	io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on '+port);
});