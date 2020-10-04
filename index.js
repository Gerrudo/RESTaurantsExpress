var webApp = require('express')();
var http = require('http').Server(webApp);
var io = require('socket.io')(http);
var request = require('request');
var port = process.env.PORT || 80;

webApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('request', function(coordinates, randomplace){

    //apiKey should be broken out into another file called requestVarFile.js
    const apiKey = require('./requestVarFile.js')
    
    var options = {
      'method': 'GET',
      'url': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyB7Nn16LpCaK-UTAVqSd16-beitmXF8f-I&location=' + coordinates + '&radius=100&rankby=prominence&keyword =food&opennow ',
      'headers': {
        apiKey : ''
      }
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);

      var placesobj = JSON.parse(response.body)

      var randomplace = placesobj.results[ Math.floor(Math.random() * placesobj.results.length)];

      io.emit('request', coordinates);
      io.emit('request', randomplace.name);
    });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});