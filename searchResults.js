function ShowDetails(info) {
  var placeNameLarge = React.createElement(
    "h2",
    null,
    info.result.name,
    " ",
    React.createElement(
      "small",
      null,
      " - Please select a tab for more information."
    )
  );
  var placeDetailsAddress = React.createElement(
    "li",
    { "class": "list-group-item" },
    info.result.formatted_address
  );
  var phoneNumber = React.createElement(
    "li",
    { "class": "list-group-item" },
    info.result.international_phone_number
  );
  var websiteURL = React.createElement(
    "li",
    { "class": "list-group-item" },
    info.result.website
  );
  var openingHours = info.result.opening_hours.weekday_text.map(function (days) {
    return React.createElement(
      "li",
      { "class": "list-group-item" },
      days
    );
  });
  ReactDOM.render(placeNameLarge, placeDetailsAddress, phoneNumber, websiteURL, openingHours, document.getElementById('placeDetailsTabContent'));
};