$("#resultsdiv").hide();
$('#loading').hide();

var socket = io(':443',{secure: true});

socket.on('placedetails', function(info){
  console.log('Data Received')
  $('#loading').hide();
  $("#resultsdiv").show();
  
  function checkDataForUndef(dataToCheck){
    if (dataToCheck === undefined){
      let isDataUndef = true;
      return isDataUndef
    }else{
      let isDataUndef = false;
      return isDataUndef
    }
  }

  //Information
  $('#placenamebig').html(`${info.result.name}<small> - Please select a tab for more information.</small>`);

  let placeDetailsArray = [
    info.result.formatted_address,
    info.result.international_phone_number,
    info.result.website,
  ]
  //.weekday_text way broken out into it's own try catch as was causing placeDetailsArray not to be constructed, as sometimes opening_hours is undefined.

  for (let i=0; i<placeDetailsArray.length; i++){
    let isDataUndef = checkDataForUndef(placeDetailsArray[i]);
    if (isDataUndef === false){
      $(`#placedetailslist${i}`).text(`${placeDetailsArray[i]}`);
    }else{
      $(`#placedetailslist${i}`).text(`No Data`);
    }
  }
  $('#openinghours').empty();
  try{
    let isDataUndef = checkDataForUndef(info.result.opening_hours.weekday_text);
    if(isDataUndef === false){
      for(let i=0; i<info.result.opening_hours.weekday_text.length; i++){
        $(`#openinghours`).append(`<li class="list-group-item">${info.result.opening_hours.weekday_text[i]}</li>`)}
    }
    }catch(error){
      $(`#openinghours`).append(`<li class="list-group-item">No Data</li>`);
  }

  //Reviews
  $('#menu2').empty();
  if(info.result.reviews == undefined){
    $('#menu2').append(`<p>No Reviews</p>`)
  }else{
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
  }
});

//Photos
socket.on('placeimages', function(placeImageUrls){
  $('#menu3').html('');
  if (placeImageUrls.length == 0){
    $('#menu3').append(`<p>No Images</p>`)
  }else{
    let numOfImages = placeImageUrls.length;
    //API key is readable in this URL, but is NOT usable by anyone outside my network, will address in later commits
    for(let i=0; i<numOfImages; i++){
      $('#menu3').html(`
        <img class="img-thumbnail" id="placeimage${[i]}" src="${placeImageUrls[i]}" 
          style="width:100%; 
          object-fit: cover; 
          width: 500px; 
          height: 500px;
          ">
      `)
    };
  }
});

//Google Maps
socket.on('placemaps', function(placeMapsUrl){
 $('#menu4').empty();
 $('#menu4').html(`
  <iframe
    width="600"
    height="450"
    frameborder="0" style="border:0"
    src="${placeMapsUrl}" 
    allowfullscreen>
  </iframe>
 `);
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


