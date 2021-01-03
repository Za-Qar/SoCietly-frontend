import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useUserContext } from "../../Context/userContext";

import Event from "../../Components/Event/event.js";
import CreateEvent from "../../Pages/CreateEvent/createEvent.js";

export default function MyEvents(params) {
  const [user] = useUserContext();

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

  function logging() {
    console.log(user);
    fetchUserEvents();
  }

  return (
    <div>
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
                isEditing
              />
            );
          })}
      </section>
    </div>
  );
}
