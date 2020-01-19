var webApp = require('express')();
var http = require('http').Server(webApp);
var io = require('socket.io')(http);
var port = process.env.PORT || 80;

webApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});