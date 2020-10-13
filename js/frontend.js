var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  $('#placename').text("We've chosen "+info.result.name+" for you.");
  $('#placeaddress').text(info.result.name+" are located at "+info.result.vicinity);
});

socket.on('placeimages', function(info){
  //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later 
  $("#placeimage").attr("src",info);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.error('Geolocation not supported by browser');
  }
}

function showPosition(position) {
  var userCoords = position.coords.latitude + ', ' + position.coords.longitude
  socket.emit('usercoords', userCoords);
}