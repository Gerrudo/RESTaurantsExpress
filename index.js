const fs = require('fs');
const express = require('express');
const app = express();
const https = require('https')
const request = require('request');
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

io.on('connection', function(socket){
  console.log(`Socket ${socket.id} connected.`);
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });

  socket.on('usercoords', userCoords => {
    socket.join(socket.id);
    //apiKey should be broken out into another file called requestVarFile.js
    const apiKey0 = require('./requestVarFile.js')
    const apiKey1 = require('./requestVarFile.js')

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
      
      //Search by location
      let getPlaceUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + apiKey0 + '&location=' + userCoords + '&rankby=distance&keyword =food&type=restaurant';
      let placesjson = await reusableRequest(getPlaceUrl,apiKey1);
      let placesobj = JSON.parse(placesjson);

      //Choose Random place
      let randomplace = placesobj.results[ Math.floor(Math.random() * placesobj.results.length)];

      //Get placeDetails
      let getPlaceDetailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+randomplace.place_id+'&key='+apiKey0;
      let placeDetailsJson = await reusableRequest(getPlaceDetailsUrl);
      let placeDetailsObj = JSON.parse(placeDetailsJson);

      //Get ID for Photo Reference(May become deprated in favour of placedetails results)
      let placePhotoRef = randomplace.photos[0].photo_reference;

      //People will be able to see API key when sent to frontend, but it is on usable by my IP, will need to address this
      let getPlaceImageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference='+placePhotoRef+'&key='+apiKey0;

      //Here now emits JS Object, can parse through place info on the otherside.
      io.to(socket.id).emit('placedetails', placeDetailsObj);
      io.to(socket.id).emit('placeimages', getPlaceImageUrl);
    }

    postResults();

  });
});