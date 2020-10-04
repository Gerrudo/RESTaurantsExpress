var webApp = require('express')();
var http = require('http').Server(webApp);
var io = require('socket.io')(http);
var request = require('request');
var port = process.env.PORT || 80;

webApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    
    console.log(msg);

    var options = {
      'method': 'GET',
      'url': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAwEXGNngeeCg5Ak1R8wMT5UET2LDXTGmw&location=53.474184, -2.244984&radius=100&rankby=prominence&keyword =food&opennow ',
      'headers': {
        '': ''
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);

      io.emit('chat message', response.body);
    });
    

  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});