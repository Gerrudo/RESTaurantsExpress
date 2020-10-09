var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  $('#usercoordinates').append($('<li>').text(info));
});

socket.on('placeimages', function(info){
  $('#placeimage').html(info);
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