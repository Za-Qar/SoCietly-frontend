import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Event from "../../Components/Event/event.js";

function GetAllEvents() {
  const [allEvents, setAllEvents] = useState([]);
  async function get() {
    let res = await fetch("https://falcon5ives.herokuapp.com/events");
    let data = await res.json();
    setAllEvents(data.payload);
  }

  useEffect(() => {
    get();
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
            return (
              <Event
                key={uuidv4()}
                attendinglist={item.attendinglist}
                date={item.date}
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
              />
            );
          }
        })}
      </section>

      <section>
        <h3>Social</h3>
        {allEvents.map((item, index) => {
          if (item.eventtype === "social") {
            return (
              <Event
                key={uuidv4()}
                attendinglist={item.attendinglist}
                date={item.date}
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
              />
            );
          }
        })}
      </section>

      <section>
        <h3>Community</h3>
        {allEvents.map((item, index) => {
          if (item.eventtype === "community") {
            return (
              <Event
                key={uuidv4()}
                attendinglist={item.attendinglist}
                date={item.date}
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
              />
            );
          }
        })}
      </section>
    </div>
  );
}

export default GetAllEvents;
