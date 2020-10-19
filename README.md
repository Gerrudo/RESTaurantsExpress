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
- [x] Display More information about the place
- [x] Have page dynamically display images and other data
- [x] Have opening hour array display properly
- [x] Handle is page data is missing, eg, no images/reviews
- [x] Add loading screen while request is being run
- [x] Display Google Maps marker for Address
- [ ] Add Dismiss button to error message
- [ ] Add filter options for search: e.g type, open_now, radius
- [ ] Format code including variables and consolidate any functions to make code look cleaner
- [ ] Format jQuery UI functions like .hide and .show to make them easier to see and control (This step maybe skipped in favour of using a new framework)
- [ ] Setup Mongo DB and have recent searches shown on the homepage
- [ ] Rework the front end of the appliction using a framework: e.g Angular
- [ ] Write more Requirments

## Bugs

- [x] Request not being sent sometimes because of undefined photo_reference
    Bug: Was due to array of image URLs being static, so would look for non existant photo_reference when building array.
    Fix: array is now dynmaically created based on number of photo_references provided.
- [x] Error on ImageURLArray length being undefined
    Bug: Sometimes array length for photo_references is 0, which is leading to .length being undefined.
    Fix: Need to add in check if is 0/undefined and skip over and display message of 'No Images' to user.
- [x] Sometimes page unresponsive for a minute at a time when asked for request
    Bug: Page displays no data after clicking go more than once, may be down to google api rate limit or websocket issue
    Fix: Needs investigation.
- [x] Photos not being replaced upon request
    Bug: Images do not update dynamically, they are static some images sometimes do not get replaced or removed on new request.
    Fix: Have images removed on new request, or have them dynamically created and removed.
- [x] Google Maps Embed showing key is not authorised
    Bug: When using Google Maps Embed API, it is showing that there key is not authorised for that API.
    Fix: apiKey0 was showing as apiKey1, which was no longer in use.
- [ ] showPosition(position) Sometimes not being triggged (Google Chrome)
    Bug: In google chrome, the go button will bring back no results as the showPosition(position) function is not being run from after requesting the user coordinates.
    Fix: Needs investigation.
- [x] Photos page only showing one photo on request
    Bug: In the photos tabs, there is now only one image being displayed up on request.
    Fix: Was due to element uing .html instead of .append to add more elements recursively.
- [ ] Sometimes if reviews = undefined, no results text is not displayed
    Bug: When there are no results, text saying 'No Reviews' is not being displayed.
    Fix: Evaluate and test undefined check on reviews object.
- [ ] (High Priority) Maps Embed API and Places Photos API broken outside of my network
    Bug: APIs mentioned do not work outside of my IP. 
    Fix: Need to have these requests made by the server somehow using HTTP referals so can keep the keys locked but still usable by the client.