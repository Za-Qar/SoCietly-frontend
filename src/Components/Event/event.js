import React, { useState, useEffect } from "react";

import Maps from "../../Components/Maps/maps.js";

import { useUserContext } from "../../Context/userContext";

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
  const [user] = useUserContext();
  const [marker, setMarker] = useState(JSON.parse(location));

  function addToAttending() {
    attendinglist.push(user.username);
    console.log(attendinglist);
  }

  function logging() {
    console.log(id);
  }

  if (volunteerlist)
    return (
      <div>
        <p>Event</p>
        <h3>{eventname}</h3>
        <h4>{date}</h4>
        <h5>{time}</h5>
        <img src={image} />
        <div>{likes}</div>
        <Maps marker={marker} setMarker={setMarker} />
        <p>{description}</p>
        <p>Attending:</p>
        <p>{attendinglist.length}</p>
        <button onClick={addToAttending}>Attend</button>
        <button onClick={logging}>Log</button>
      </div>
    );
}

export default Event;
