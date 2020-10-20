function ShowDetails(info){
  const placeNameLarge = (
    <h2>
      {info.result.name} <small> - Please select a tab for more information.</small>
    </h2>
  );
  const placeDetailsAddress = (
    <li class="list-group-item">{info.result.formatted_address}</li>
  );
  const phoneNumber = (
    <li class="list-group-item">{info.result.international_phone_number}</li>
  );
  const websiteURL = (
    <li class="list-group-item">{info.result.website}</li>
  );
  const openingHours = info.result.opening_hours.weekday_text.map((days) =>
  <li class="list-group-item">{days}</li>
  );
  ReactDOM.render(
    placeNameLarge,
    placeDetailsAddress,
    phoneNumber,
    websiteURL,
    openingHours,
    document.getElementById('placeDetailsTabContent')
  );
};


