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
  fetchUserEvents,
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

  let deleteEvent = (id) => {
    console.log("delete", id);

    // fetch(`https://falcon5ives.herokuapp.com/events/${id}`, {
    //   method: "delete",
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  };

  function logging() {
    console.log(attendinglist);
    console.log(user.username);
    console.log(id);
  }

  if (volunteerlist)
    return (
      <div className={eventDiv}>
        <h3 className={eventNameClass}>{eventname}</h3>

        <div className="row">
          <div className="column1">
            <img src={image} className={imgClass} />
          </div>
          <div className="column2">
            <p className={descClass}>{description}</p>
          </div>
        </div>

        <div className="row">
          <div className="column3">
            <h4 className={dateClass}>{date}</h4>
          </div>
          <div className="column3">
            <h5 className={timeClass}>{time}</h5>
          </div>
          <div className="column3">
            <div className={likesClass}>{likes}</div>
          </div>
        </div>
        {!myEvents && (
          <Maps marker={marker} setMarker={setMarker} className={mapsClass} />
        )}

        <p className={attLengthClass}>Attending: {attendinglist.length}</p>
        {!myEvents && (
          <button onClick={addToAttending} className={attendButClass}>
            Attend
          </button>
        )}
        <p className={attListClass}>
          Attending List: {attentingGet.join(", ")}
        </p>

        {myEvents && (
          <button className={delButClass} onClick={() => deleteEvent(id)}>
            Delete Event
          </button>
        )}

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

        <section className={hide}>
          <CreateEvent
            attendinglist={attendinglist}
            date={date}
            description={description}
            enablevolunteers={enablevolunteers}
            eventname={eventname}
            eventtype={eventtype}
            id={id}
            image={image}
            likes={likes}
            location={location}
            time={time}
            uid={uid}
            volunteerlist={volunteerlist}
            eventsEdit
            userEventsId={id}
            userId={user?.uid}
            hide={hide}
            setHide={setHide}
            fetchUserEvents={fetchUserEvents}
          />
        </section>
      </div>
    );
}

export default Event;