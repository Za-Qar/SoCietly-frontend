import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Event from "../../Components/Event/event.js";

//styling
import style from "./events.module.css";

function GetAllEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const [attendingList, setAttendingList] = useState([]);

  /*---------------Increment Counter backend----------------*/
  let addToAttend = (id, arr) => {
    console.log(id, arr);
    fetch(`https://falcon5ives.herokuapp.com/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ attendingList: arr }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  async function get() {
    let res = await fetch("https://falcon5ives.herokuapp.com/events");
    let data = await res.json();
    console.log(data);
    setAllEvents(data.payload);
  }

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    setInterval(() => {
      get();
    }, 300000);
  }, []);

  return (
    <div>
      <button onClick={() => console.log(allEvents)}>log</button>
      <p>Get All Events</p>
      <button>Create Event</button>
      <button>My Events</button>

      <section>
        <h3>Education</h3>
        {allEvents.map((item, index) => {
          if (item.eventtype === "education") {
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
                setAttending={setAttendingList}
                addToAttend={addToAttend}
              />
            );
          }
        })}
      </section>

      <section>
        <h3>Social</h3>
        {allEvents.map((item, index) => {
          if (item.eventtype === "social") {
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
                setAttending={setAttendingList}
                addToAttend={addToAttend}
              />
            );
          }
        })}
      </section>

      <section>
        <h3>Community</h3>
        {allEvents.map((item, index) => {
          if (item.eventtype === "community") {
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
                setAttending={setAttendingList}
                addToAttend={addToAttend}
              />
            );
          }
        })}
      </section>
    </div>
  );
}

export default GetAllEvents;
