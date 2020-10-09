$(function find() {
    var socket = io();
    $('form').submit(function(){
      socket.emit('request', $('#m').val());

      $('#m').val('');
      return false;
    });

    socket.on('request', function(coordinates){
      $('#usercoordinates').append($('<li>').text(coordinates));
      window.scrollTo(0, document.body.scrollHeight);
    });
  });

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.error('Geolocation not supported by browser');
  }
}

function showPosition(position) {
  var socket = io();
  var userCoords = position.coords.latitude + ', ' + position.coords.longitude
  console.log('User Coordinates are: ' + userCoords)
  socket.emit('usercoords', userCoords);
}