import React, { useEffect, useState } from "react";

//Config
import { url } from "../../config";

// Components
import Card from "../../MaterialUi/Card/card.js";
import UserLeftSide from "../../Components/userLeftSide/userLeftSide.js";
import Loading from "../../Components/Loading/loading.js";

// React Router Dom
import { useParams } from "react-router-dom";

// User context
import { useUserContext } from "../../Context/userContext";

export default function EventPage() {
  // Importing user data
  const [user] = useUserContext();

  const { id } = useParams();

  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [eventUser, setEventUser] = useState("");

  // Fetch event by id
  useEffect(() => {
    async function fetchEvent() {
      if (id) {
        let res = await fetch(`${url}/events/${id}`);
        let data = await res.json();
        setEvent(data.payload[0]);
      }
    }
    fetchEvent();
  }, [id]);

  // Create Date
  useEffect(() => {
    function fetchDate() {
      if (event) {
        let eventDate = event.date;
        let dateFormat = new Date(eventDate).toDateString();
        setDate(dateFormat);
      }
    }
    fetchDate();
  }, [event]);

  //   // Match event with user
  //   useEffect(() => {
  //     async function fetchUserEvent() {
  //       if (event) {
  //         let res = await fetch(`http://localhost:3000/users/?id=${event.uid}`);
  //         let data = await res.json();
  //         setEventUser(data.payload[0]);
  //       }
  //     }
  //     fetchUserEvent();
  //   }, [event]);

  return user && date ? (
    <div>
      <UserLeftSide />
      <div className="container">
        <Card item={event} date={date} />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
