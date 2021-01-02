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
  setAttendindList,
  addToAttend,
}) {
  const [user] = useUserContext();
  const [marker, setMarker] = useState(JSON.parse(location));

  const [attentingGet, setAttedingGet] = useState([]);

  function getAttenting() {
    setAttedingGet(attendinglist);
  }
  useEffect(() => {
    getAttenting();
  }, []);

  function addToAttending() {
    console.log(attendinglist);
    for (let i = 0; i <= attendinglist.length; i++) {
      if (attendinglist[i] === `${user.username}`) {
        return;
      }
    }
    let attending = [...attendinglist, `${user.username}`];
    console.log(attending);
    setAttedingGet(attending);
    addToAttend(id, attending);
  }

  function logging() {
    console.log(attendinglist);
    console.log(user.username);
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
        <p>{attentingGet.join(", ")}</p>
      </div>
    );
}

export default Event;
