import React, { useState } from "react";

function GetAllEvents() {
  const [allEvents, setAllEvents] = useState([]);
  async function get() {
    let res = await fetch("http://localhost:3000/events");
    let data = await res.json();
    setAllEvents(data);
  }

  return (
    <div>
      <p>Get All Events</p>
      <button
        onClick={() => {
          get();
          console.log(allEvents.payload);
        }}
      >
        Log
      </button>
    </div>
  );
}

export default GetAllEvents;
