const fs = require('fs');
const express = require('express');
const app = express();
const https = require('https')
const request = require('request');
const port = process.env.PORT || 443;
const key = fs.readFileSync(__dirname + '/certs/privkey.pem');
const cert = fs.readFileSync(__dirname + '/certs/cert.pem');
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
  res.sendFile(__dirname + '/restaurantsexpress-react-app/index.html');
  app.use("/client", express.static(__dirname + "/client"));
  app.use("/src", express.static(__dirname + "/src"));
});

io.on('connection', function(socket){
  console.log(socket.id+' Connected');
  socket.on('disconnect', () => {
    console.log(socket.id+' Disconnected');
  });

  socket.on('usercoords', userCoords => {
    console.log(socket.id+' Request Received')
    socket.join(socket.id);
    //apiKey should be broken out into another file called requestVarFile.js
    const apiKey0 = require('./requestVarFile.js')

    function reusableRequest(url){
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
      try{
        //Search by location
        console.log(socket.id+' Getting Place Data...')
        let getPlaceUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + apiKey0 + '&location=' + userCoords + '&rankby=distance&keyword =food&type=restaurant';
        let placesjson = await reusableRequest(getPlaceUrl);
        let placesobj = JSON.parse(placesjson);
        
        //Choose Random place
        let randomplace = placesobj.results[ Math.floor(Math.random() * placesobj.results.length)];
        let getPlaceDetailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+randomplace.place_id+'&key='+apiKey0;

        //Get placeDetails
        console.log(socket.id+' Getting Image Data...')
        let placeDetailsJson = await reusableRequest(getPlaceDetailsUrl);
        let placeDetailsObj = JSON.parse(placeDetailsJson);
        let placeImageUrls = [];
        //This prevents the application from erroring, if there are no images for the place, creates URL array if place has images.
        if (placeDetailsObj.result.photos !== undefined){
          //Constructing image URLs into an Array
          //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later 
          for(let i=0; i<placeDetailsObj.result.photos.length; i++){
            placeImageUrls.push('https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference='+placeDetailsObj.result.photos[i].photo_reference+'&key='+apiKey0)
          }
        }   
         
        //Get PlaceMaps Details
        placeMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey0}&q=place_id:${placeDetailsObj.result.place_id}`

        //Here now emits JS Object, can parse through place info on the otherside.
        console.log(socket.id+' Sending Data to Page')
        io.to(socket.id).emit('placedetails', placeDetailsObj);
        //If there are no images, the frontend will be sent 'noimages', this will make the page display accordingly and create no elements.
        io.to(socket.id).emit('placeimages', placeImageUrls);
        io.to(socket.id).emit('placemaps', placeMapsUrl);
        console.log(socket.id+' Data Sent')
      }catch(err){
        console.error(socket.id+' '+err);
        io.to(socket.id).emit('error', err.message);
      }
    };
    postResults();
  });
});