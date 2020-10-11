const fs = require('fs');
const express = require('express');
const app = express();
const https = require('https')
const request = require('request');
const { response } = require('express');
const port = process.env.PORT || 443;

const key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
const options = {
  key: key,
  cert: cert
};

const server = https.createServer(options, app);

const io = require('socket.io').listen(server);

server.listen(port, function(){
  console.log('listening on *:' + port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  app.use("/js", express.static(__dirname + "/js"));
});

//socket for google api to client
io.on('connection', function(socket){
  console.log(`Socket ${socket.id} connected.`);
  
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });

  socket.on('usercoords', userCoords => {
    socket.join(socket.id);
    console.log('Requested by: ' + socket.id);

    //apiKey should be broken out into another file called requestVarFile.js
    const apiKey0 = require('./requestVarFile.js')
    const apiKey1 = require('./requestVarFile.js')

/*
    var placesRequestOptions = {
      'method': 'GET',
      'url': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + apiKey0 + '&location=' + userCoords + '&rankby=distance&keyword =food&type=restaurant',
      'headers': {
        apiKey1 : ''
      }
    };

    var placesImageRequestOptions = {
      'method': 'GET',
      'url': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference='+placePhotoRef+'&key='+apiKey0,
      'headers': {
      }
    };

    function placesRequest(options){
      return new Promise (function (resolve) {
        request(options, function (error, response) {
          if (error) throw new Error(error);
          var placesobj = JSON.parse(response.body);
          resolve(placesobj);
        });
      })
    }

    function placesImageRequest(options){
      return new Promise (function (resolve) {
        request(options, function (error, response) {
          if (error) throw new Error(error);
          var placesobj = JSON.parse(response.body);
          resolve(placeimage);
        });
      })
    }
*/
    function reusableRequest(url, headers){
      
      let options = {
        'method': 'GET',
        'url': url,
        'headers': {
          headers : ''
        }
      };

      return new Promise (function (resolve) {
        request(options, function (error, response) {
          if (error) throw new Error(error);
          resolve(response.body);
        });
      })
    }

    async function postResults() {
      let getPlaceUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + apiKey0 + '&location=' + userCoords + '&rankby=distance&keyword =food&type=restaurant';
      let placesjson = await reusableRequest(getPlaceUrl,apiKey1);
      let placesobj = JSON.parse(placesjson);
      let randomplace = placesobj.results[ Math.floor(Math.random() * placesobj.results.length)];

      let placePhotoRef = randomplace.photos[0].photo_reference;
      let getPlaceImageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference='+placePhotoRef+'&key='+apiKey0;
      let placeimageresponse = await reusableRequest(getPlaceImageUrl);
      //console.log(placeimageresponse);
      
      console.log('Sending: ' + randomplace.name);

      io.to(socket.id).emit('placedetails', 'Your place is: ' + randomplace.name);
      console.log('Sent to: ' + socket.id);
      if (randomplace.opening_hours.open_now == true){
        io.to(socket.id).emit('placedetails', 'Open now?: Yes')
      }else  {
        io.to(socket.id).emit('placedetails', 'Open now?: No')
      };
      io.to(socket.id).emit('placeimages', placeimageresponse);
    }
    postResults();
  });
});