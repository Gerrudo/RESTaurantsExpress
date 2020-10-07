var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var port = process.env.PORT || 80;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  app.use("/js", express.static(__dirname + "/js"));
});

//socket for google api to client
io.on('connection', function(socket){

  socket.on('usercoords', userCoords => {
    console.log('usercoords', userCoords);

    //apiKey should be broken out into another file called requestVarFile.js
    const apiKey0 = require('./requestVarFile.js')
    const apiKey1 = require('./requestVarFile.js')
    //var placesobj

    var options = {
      'method': 'GET',
      'url': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + apiKey0 + '&location=' + userCoords + '&rankby=distance&keyword =food&type=restaurant',
      'headers': {
        apiKey1 : ''
      }
    };

    function placesRequest(options){
      return new Promise (function (resolve) {
        request(options, function (error, response) {
          if (error) throw new Error(error);
          var placesobj = JSON.parse(response.body);
          resolve(placesobj);
          //return placesobj
        });
      })
    }
    async function postResults() {

      let placesobj = await placesRequest(options);
      var randomplace = placesobj.results[ Math.floor(Math.random() * placesobj.results.length)];
      console.log('Sending: ' + randomplace.name);

      io.emit('request', 'Your coordinates are: ' + userCoords);
      io.emit('request', 'Your place is: ' + randomplace.name);

      if (randomplace.opening_hours.open_now == true){
        io.emit('request', 'Open now?: Yes')
      }else  {
        io.emit('request', 'Open now?: No')
      };
    }
    postResults();
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

