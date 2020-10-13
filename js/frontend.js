var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  $('#placename').text("We've chosen "+info.result.name+" for you.");
  $('#placeaddress').text(info.result.name+" are located at "+info.result.vicinity);
});

socket.on('placeimages', function(placeImageUrls){
  //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later 
  $("#placeimage").attr("src",placeImageUrls.image);
  $("#placeimage1").attr("src",placeImageUrls).image1;
  $("#placeimage2").attr("src",placeImageUrls.image2);
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