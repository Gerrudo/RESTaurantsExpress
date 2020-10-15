$("#resultsdiv").hide();

var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  $("#resultsdiv").show();
  //Information
  $('#placenamebig').text("We've Chosen "+info.result.name+"!");
  $('#placename').text("We've chosen "+info.result.name+" for you.");
  $('#placeaddress').text(info.result.name+" is located at "+info.result.vicinity);
  //Reviews
  let numOfReviews = 4;
  $('#placeoverallrating').text("Overall Rating: "+info.result.rating);
  //Instead of inserting text here could insert HTML for each review
  for(let i=0; i<numOfReviews; i++){
    $("#reviewer"+i+"Name").text(info.result.reviews[i].author_name);
    $("#reviewer"+i+"Rating").text("Rating: "+info.result.reviews[i].rating+"/5");
    if (info.result.reviews[i].text.length >= 1) {
      $("#reviewer"+i+"Text").text("'"+info.result.reviews[i].text+"'");
    }else{
      $("#reviewer"+i+"Text").text("");
    }
  };
});

socket.on('placeimages', function(placeImageUrls){
  let numOfImages = placeImageUrls.length;
  //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later 
  for(let i=0; i<numOfImages; i++){
    $("#placeimage"+i).attr("src",placeImageUrls[i]);
  };
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


