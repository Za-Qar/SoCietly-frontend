import React, { useState, useEffect } from "react";

import Maps from "../../Components/Maps/maps.js";

function Event({
  attendinglist,
  date,
  description,
  enablevolunteers,
  eventname,
  eventtype,
  id,
  image,
  likes,
  location,
  time,
  uid,
  volunteerlist,
}) {
  const [markers, setMarkers] = useState([]);

  return (
    <div>
      <p>Event</p>
      <img src={image} />
      <div>{likes}</div>
      <Maps
        markers={markers}
        setMarkers={setMarkers}
        eventMarker={JSON.parse(location[0])}
      />
      <button onClick={() => console.log(JSON.parse(location[0]))}>
        Location
      </button>
    </div>
  );
}

export default Event;
