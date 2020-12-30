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
  if (volunteerlist)
    return (
      <div>
        <p>Event</p>
        <h3>{eventname}</h3>
        <h4>{date}</h4>
        <h5>{time}</h5>
        <img src={image} />
        <div>{likes}</div>
        <Maps
          markers={markers}
          setMarkers={setMarkers}
          eventMarker={JSON.parse(location[0])}
        />
        <p>{description}</p>
        <button onClick={() => console.log(volunteerlist)}>Location</button>
      </div>
    );
}

export default Event;
