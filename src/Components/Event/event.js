import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Maps from "../Maps/maps.js";
import "./event.css";

import { useUserContext } from "../../Context/userContext";

function Event() {
  const [user] = useUserContext();
  const { register, handleSubmit, watch, errors } = useForm();
  const [complete, setComplete] = useState(false);

  //For Maps
  const [markers, setMarkers] = useState([]);

  let createEvent = (msg) => {
    console.log("User Input recieved", msg);
    fetch(`http://localhost:3000/events`, {
      method: "POST",
      body: JSON.stringify({
        eventName: msg.eventName,
        eventType: msg.eventTypes,
        uid: user.uid,
        date: msg.date,
        time: msg.time,
        description: msg.description,
        image: msg.image,
        location: markers,
        enableVolunteers: msg.eventVolunteers,
        attendingList: [],
        likes: 0,
        volunteerList: [],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .catch((error) => console.log("user creation error error: ", error));

    setComplete(true);
  };

  function consoleLog() {
    console.log(user);
    console.log(markers);
  }

  if (!complete) {
    return (
      <div>
        <button onClick={consoleLog}>Get User</button>
        <form onSubmit={handleSubmit(createEvent)}>
          <span>
            <p>Event Name:</p>
            <input name="eventName" ref={register} required />
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
            ></textarea>
          </span>
          <span>
            <p>Image:</p>
            <input name="image" ref={register} required />
          </span>
          <span>
            <p>Location:</p>
            <div>
              <input name="location" ref={register} />
              <Maps markers={markers} setMarkers={setMarkers} />

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

export default Event;

// onClick={(e) => {
//     e.preventDefault();
//     //take the e.preventDefault(); away when it comes time for release
//   }}
