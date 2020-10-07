var socket = io();

socket.on('request', function(coordinates){
  $('#usercoordinates').append($('<li>').text(coordinates));
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.error('Geolocation not supported by browser');
  }
}

function showPosition(position) {
  var userCoords = position.coords.latitude + ', ' + position.coords.longitudeconsole.log('User Coordinates are: ' + userCoords)
  socket.emit('usercoords', userCoords);
}