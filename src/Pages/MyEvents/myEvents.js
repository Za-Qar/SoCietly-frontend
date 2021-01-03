import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useUserContext } from "../../Context/userContext";

import Event from "../../Components/Event/event.js";
import CreateEvent from "../../Pages/CreateEvent/createEvent.js";

export default function MyEvents() {
  // Importing user data
  const [user] = useUserContext();

  // Event classes
  const [eventNameClass, setEventNameClass] = useState(null);
  const [dateClass, setDateClass] = useState(null);
  const [timeClass, setTimeClass] = useState(null);
  const [imgClass, setImgClass] = useState(null);
  const [likesClass, setLikesClass] = useState(null);
  const [mapsClass, setMapsClass] = useState(null);
  const [descClass, setDescClass] = useState(null);
  const [attLengthClass, setAttLengthClass] = useState(null);
  const [attendButClass, setAttendButClass] = useState(null);
  const [attListClass, setAttListClass] = useState(null);
  const [editButClass, setEditButClass] = useState(null);
  const [delButClass, setDlButClass] = useState(null);

  // fetchUserEvents function result
  const [userEvents, setUserEvents] = useState(null);

  async function fetchUserEvents() {
    let res = await fetch(
      `https://falcon5ives.herokuapp.com/userEvents/${user?.uid}`
    );
    let userEvents = await res.json();
    setUserEvents(userEvents.payload);
    console.log(userEvents.payload);
  }

  useEffect(() => {
    fetchUserEvents();
  }, [user]);

  let patchEvent = (msg) => {
    console.log("User Input recieved", msg);
    fetch(`https://falcon5ives.herokuapp.com/userevents/`, {
      method: "PATCH",
      body: JSON.stringify({
        eventName: msg.eventName,
        eventType: msg.eventTypes,
        uid: user.uid,
        date: msg.date,
        time: msg.time,
        description: msg.description,
        image: msg.image,
        // location: marker,
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
  };

  function logging() {
    console.log(user);
    fetchUserEvents();
  }

  return (
    <div className="container">
      <button onClick={logging}>logging</button>
      <section>
        <h3>User events</h3>
        {userEvents &&
          userEvents.map((item, index) => {
            let date = new Date(item.date).toDateString();
            return (
              <Event
                key={uuidv4()}
                attendinglist={item.attendinglist}
                date={date}
                description={item.description}
                enablevolunteers={item.enablevolunteers}
                eventname={item.eventname}
                eventtype={item.eventtype}
                id={item.id}
                image={item.image}
                likes={item.likes}
                location={item.location}
                time={item.time}
                uid={item.uid}
                volunteerlist={item.volunteerlist}
                myEvents
                eventDiv={"myEventDiv"}
                eventNameClass={"myEventName"}
                dateClass={"myDateClass"}
                timeClass={"myTimeClass"}
                imgClass={"myImgClass"}
                likesClass={"myLikesClass"}
                mapsClass={"myMapsClass"}
                descClass={"myDescClass"}
                attLengthClass={"myAttLengthClass"}
                attendButClass={"myAttendButClass"}
                attListClass={"myAttListClass"}
                editButClass={"myEditButClass"}
                delButClass={"myDelButClass"}
              />
            );
          })}
      </section>
    </div>
  );
}
