# RESTaurantsExpress
Express Web Server for the RESTaurants Application

A web application that pulls place information from Google's Places API. Based on the request the application picks a random place to provide to the user.

Goals/Requirments for this project:

- [x] Create request to Google Places API
- [x] Display request to user using socket.io
- [x] Randomly sort through request to pick a child item (place) from the request
- [x] Display different pieces of information to the user. For example: Address, Place name, ratings/reviews/images
- [x] Have each socket have its own session and no crosstalk between sockets
- [x] Use https and have it working with socket.io
- [x] Display Images of place
- [x] Have the page update with each request and keep information consistently displayed
- [ ] Display Reviews
- [x] Display Address
- [ ] Display Google Maps marker for Address
- [ ] Add loading screen while request is being run
- [ ] Make the page not look like complete arse
- [ ] Have a page for previous places, this will be global to start until we decide to use external auth login
- [ ] Write more Requirments
