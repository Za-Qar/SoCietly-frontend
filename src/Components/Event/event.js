import React, { useState, useEffect } from "react";

// import cn from "classnames";
// import css from "./event.module.css";
import "./event.css";

import CreateEvent from "../../Pages/CreateEvent/createEvent.js";

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
  myEvents,

  eventDiv,
  eventNameClass,
  dateClass,
  timeClass,
  imgClass,
  likesClass,
  mapsClass,
  descClass,
  attLengthClass,
  attendButClass,
  attListClass,
  editButClass,
  delButClass,
}) {
  const [user] = useUserContext();
  const [marker, setMarker] = useState(JSON.parse(location));

  //To show and hide createEvents
  const [hide, setHide] = useState("hide");

  const [attentingGet, setAttedingGet] = useState([]);

  function getAttenting() {
    setAttedingGet(attendinglist);
  }
  useEffect(() => {
    getAttenting();
  }, []);

  function addToAttending() {
    for (let i = 0; i <= attendinglist.length; i++) {
      if (attendinglist[i] === `${user.username}`) {
        return alert("You've already decalred you're attending :)");
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
      <div className={eventDiv}>
        <h3 className={eventNameClass}>{eventname}</h3>
        <h4 className={dateClass}>{date}</h4>
        <h5 className={timeClass}>{time}</h5>
        <img src={image} className={imgClass} />
        <div className={likesClass}>{likes}</div>
        {!myEvents && (
          <Maps marker={marker} setMarker={setMarker} className={mapsClass} />
        )}
        <p className={descClass}>{description}</p>
        <p className={attLengthClass}>Attending: {attendinglist.length}</p>
        {!myEvents && (
          <button onClick={addToAttending} className={attendButClass}>
            Attend
          </button>
        )}
        <p className={attListClass}>
          Attending List: {attentingGet.join(", ")}
        </p>

        {myEvents && <button className={delButClass}>Delete Event</button>}

        {myEvents && (
          <button
            className={editButClass}
            onClick={() =>
              hide === "hide" ? setHide("show") : setHide("hide")
            }
          >
            Edit Event
          </button>
        )}

        <secton className={hide}>
          <CreateEvent
            eventsEdit
            userEventsId={id}
            userId={user?.uid}
            hide={hide}
            setHide={setHide}
          />
        </secton>
      </div>
    );
}

export default Event;
