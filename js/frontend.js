var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  $('#placename').text("We've chosen "+info.result.name+" for you.");
  $('#placeaddress').text(info.result.name+" is located at "+info.result.vicinity);
});

socket.on('placeimages', function(placeImageUrls){
  let numOfImages = 3;
  //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later 
  for(let i=0; i<numOfImages; i++){
    $("#placeimage"+i).attr("src",placeImageUrls[i]);
  };
});

socket.on('placereviews', function(placeReviews){
  let numOfReviews = 4;
  //Instead of inserting text here could insert HTML for each review
  for(let i=0; i<numOfReviews; i++){
    $("#reviewer"+i+"Name").text("this is"+i);
    $("#reviewer"+i+"Rating").text("this is"+i);
    $("#reviewer"+i+"Text").text("this is"+i);
  }

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