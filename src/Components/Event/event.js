import React, { useState, useEffect } from "react";

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
  return (
    <div>
      <p>Event</p>
      <img src={image} />
      <div>{likes}</div>
      <button onClick={() => console.log(JSON.parse(location[0]))}>
        Location
      </button>
    </div>
  );
}

export default Event;
