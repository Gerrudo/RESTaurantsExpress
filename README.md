# RESTaurantsExpress
## Express Web Server for the RESTaurants Application

A web application that pulls place information from Google's Places API. Based on the request the application picks a random place to provide to the user.

## Goals/Requirments for this project:

- [x] Create request to Google Places API
- [x] Display request to user using socket.io
- [x] Randomly sort through request to pick a child item (place) from the request
- [x] Display different pieces of information to the user. For example: Address, Place name, ratings/reviews/images
- [x] Have each socket have its own session and no crosstalk between sockets
- [x] Use https and have it working with socket.io
- [x] Display Images of place
- [x] Have the page update with each request and keep information consistently displayed
- [X] Display Reviews
- [x] Display Address
- [ ] Display More information about the place
- [ ] Have page dynamically display images and other data and handle if data is missing(eg, no images)
- [ ] Display Google Maps marker for Address
- [ ] Add loading screen while request is being run
- [ ] Make the page not look like complete arse
- [ ] Have a page for previous places, this will be global to start until we decide to use external auth login
- [ ] Write more Requirments

## Bugs

### - [x] Request not being sent sometimes because of undefined photo_reference
    Bug: Was due to array of image URLs being static, so would look for non existant photo_reference when building array.
    Fix: array is now dynmaically created based on number of photo_references provided.
### - [x] Error on ImageURLArray length being undefined
    Bug: Sometimes array length for photo_references is 0, which is leading to .length being undefined.
    Fix: Need to add in check if is 0/undefined and skip over and display message of 'No Images' to user.
### - [ ] Sometimes page unresponsive for a minute at a time when asked for request
    Bug: Page displays no data after clicking go more than once, may be down to google api rate limit or websocket issue
    Fix: Needs investigation.
### - [x] Photos not being replaced upon request
    Bug: Images do not update dynamically, they are static some images sometimes do not get replaced or removed on new request.
    Fix: Have images removed on new request, or have them dynamically created and removed.
### - [ ] showPosition(position) Sometimes not being triggged (Google Chrome)
    Bug: In google chrome, the go button will bring back no results as the showPosition(position) function is not being run from after requesting the user coordinates.
    Fix: Needs investigation.
