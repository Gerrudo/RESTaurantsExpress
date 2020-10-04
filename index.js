var webApp = require('express')();
var http = require('http').Server(webApp);
var io = require('socket.io')(http);
var request = require('request');
var port = process.env.PORT || 80;

webApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('request', function(coordinates){

    //apiKey should be broken out into another file called requestVarFile.js
    const apiKey0 = require('./requestVarFile.js')
    const apiKey1 = require('./requestVarFile.js')

    var options = {
      'method': 'GET',
      'url': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + apiKey0 + '&location=' + coordinates + '&rankby=distance&keyword =food&type=restaurant',
      'headers': {
        apiKey1 : ''
      }
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);

      var placesobj = JSON.parse(response.body)
      var randomplace = placesobj.results[ Math.floor(Math.random() * placesobj.results.length)];

      io.emit('request', 'Your coordinates are: ' + coordinates);
      io.emit('request', 'Your place is: ' + randomplace.name);
      if (randomplace.opening_hours.open_now == true){
        io.emit('request', 'Open now?: Yes')
      }else  {
        io.emit('request', 'Open now?: No')
      };

    });

  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});