$("#resultsdiv").hide();
$('#loading').hide();

var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  console.log('Data Received')
  $('#loading').hide();
  $("#resultsdiv").show();
  //Information
  $('#placenamebig').text("We've Chosen "+info.result.name+"!");
  $('#placename').text("We've chosen "+info.result.name+" for you.");
  $('#placeaddress').text(info.result.name+" is located at "+info.result.vicinity);
  //Reviews
  $('#menu2').html('');
  let numOfReviews = info.result.reviews.length;

  for(let i=0; i<numOfReviews; i++){
    $("#menu2").append(`
      <div class="media">
        <img src="${info.result.reviews[i].profile_photo_url}" class="mr-3">
          <div class="media-body">
          <h5 class="mt-0">${info.result.reviews[i].author_name}</h5>
          ${info.result.reviews[i].text}
          </div>
      </div>
      <br></br>
    `);
  };
});

socket.on('placeimages', function(placeImageUrls){
  $('#menu3').html('');
  let numOfImages = placeImageUrls.length;
  //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later 
  for(let i=0; i<numOfImages; i++){
    $('#menu3').append(`
      <img class="img-thumbnail" id="placeimage${[i]}" src="${placeImageUrls[i]}" 
        style="width:100%; 
        object-fit: cover; 
        width: 500px; 
        height: 500px;
        ">
    `)
  };
});

socket.on('error', function(err){
  $('#loading').hide();
  $("#error").html(`
    <div class="alert alert-danger" role="alert">
      Something went wrong, <a href="https://dev.tomsnetwork.uk" class="alert-link">please click here to refresh the page</a>.
      <p>${err}</p>
    </div>
  `)
})

function getLocation() {
  $("#resultsdiv").hide();
  $('#loading').show();
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


