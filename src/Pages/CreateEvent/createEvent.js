import React, { useState } from "react";
import { useForm } from "react-hook-form";

//components
import Maps from "../../Components/Maps/maps.js";

//styling
import style from "./createEvent.module.css";

import { useUserContext } from "../../Context/userContext";

function CreateEvent({
  eventsEdit,
  patchEvent,
  userEventsId,
  userId,
  hide,
  setHide,

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
  fetchUserEvents,
}) {
  const [user] = useUserContext();
  const { register, handleSubmit, watch, errors } = useForm();
  const [complete, setComplete] = useState(false);

  console.log("this is the userEventsId", userEventsId);

  //For Maps
  const [marker, setMarker] = useState(null);

  let createEvent = (msg) => {
    console.log("User Input recieved", msg, marker);
    fetch(
      eventsEdit
        ? `https://falcon5ives.herokuapp.com/events/${userEventsId}`
        : `https://falcon5ives.herokuapp.com/events/`,
      {
        method: eventsEdit ? "PATCH" : "POST",
        body: JSON.stringify({
          eventName: msg.eventName,
          eventType: msg.eventTypes,
          uid: user.uid,
          date: msg.date,
          time: msg.time,
          description: msg.description,
          image: msg.image,
          location: marker,
          enableVolunteers: msg.eventVolunteers,
          attendingList: eventsEdit ? null : [],
          likes: eventsEdit ? null : 0,
          volunteerList: eventsEdit ? null : [],
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .catch((error) => console.log("user creation error error: ", error));
    setComplete(true);
  };

  function consoleLog() {
    console.log(user);
    console.log(marker);
  }

  if (!complete) {
    return (
      <div>
        <button onClick={consoleLog}>Get User</button>
        <form onSubmit={handleSubmit(createEvent)}>
          {eventsEdit && (
            <button
              onClick={() =>
                hide === "show" ? setHide("hide") : setHide("show")
              }
            >
              x
            </button>
          )}
          <span>
            <p>Event Name:</p>
            <input
              name="eventName"
              ref={register}
              required
              placeholder={eventname}
            />
          </span>
          <span>
            <p>Event Type:</p>
            <select id="eventTypes" name="eventTypes" ref={register}>
              <option value="education">Education</option>
              <option value="social">Social</option>
              <option value="community">Community</option>
            </select>
          </span>
          <span>
            <p>Date:</p>
            <input name="date" type="date" ref={register} required />
          </span>
          <span>
            <p>Time:</p>
            <input name="time" type="time" ref={register} required />
          </span>
          <span>
            <p>Description:</p>
            <textarea
              name="description"
              rows="10"
              cols="30"
              ref={register}
              placeholder={description}
            ></textarea>
          </span>
          <span>
            <p>Image:</p>
            <input name="image" ref={register} required />
          </span>
          <span>
            <p>Location:</p>
            <div>
              <Maps marker={marker} setMarker={setMarker} isEditing />
              <button onClick={consoleLog}>Console.log</button>
            </div>
          </span>
          <span>
            <p>Volunteers:</p>
            <select id="eventVolunteers" name="eventVolunteers" ref={register}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </span>
          <input type="submit" />
        </form>
      </div>
    );
  } else if (complete) {
    return (
      <div>
        <p>Completed confirmation design comes here</p>
      </div>
    );
  }
}

export default CreateEvent;

// onClick={(e) => {
//     e.preventDefault();
//     //take the e.preventDefault(); away when it comes time for release
//   }}
