$("#resultsdiv").hide();

var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  console.log('Data Received')
  $("#resultsdiv").show();
  //Information
  $('#placenamebig').text("We've Chosen "+info.result.name+"!");
  $('#placename').text("We've chosen "+info.result.name+" for you.");
  $('#placeaddress').text(info.result.name+" is located at "+info.result.vicinity);
  //Reviews
  $('#menu2').html('');
  let numOfReviews = info.result.reviews.length;

  for(let i=0; i<numOfReviews; i++){
    $("#menu2").append('<div class="well"><h5 id="reviewer'+i+'Name">'+info.result.reviews[i].author_name+'</h5><p id="reviewer'+i+'Rating">'+info.result.reviews[i].rating+'</p><p id="reviewer'+i+'Text">'+info.result.reviews[i].text+'</p></div>');
  };
});

socket.on('placeimages', function(placeImageUrls){
  $('#menu3').html('');
  let numOfImages = placeImageUrls.length;
  //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later 
  for(let i=0; i<numOfImages; i++){
    $('#menu3').append('<div class="well"><img id="placeimage'+i+'" src="'+placeImageUrls[i]+'" style="width:100%;"></div>')
  };
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log('Got Location')
  } else { 
    console.error('Geolocation not supported by browser');
  }
}

function showPosition(position) {
  var userCoords = position.coords.latitude + ', ' + position.coords.longitude
  socket.emit('usercoords', userCoords);
  console.log('Request Sent')
}


