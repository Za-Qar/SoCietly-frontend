import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useUserContext } from "../../Context/userContext";

import Event from "../../Components/Event/event.js";
import CreateEvent from "../../Pages/CreateEvent/createEvent.js";

export default function MyEvents() {
  // Importing user data
  const [user] = useUserContext();

  // fetchUserEvents function result
  const [userEvents, setUserEvents] = useState(null);

  //To show and hide createEvents
  const [hide, setHide] = useState("hide");

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

  //   let patchEvent = (msg) => {
  //     console.log("User Input recieved", msg);
  //     fetch(
  //       `https://falcon5ives.herokuapp.com/userevents/${userEvents.id}/${user?.uid}`,
  //       {
  //         method: "PATCH",
  //         body: JSON.stringify({
  //           eventName: msg.eventName,
  //           eventType: msg.eventTypes,
  //           uid: user.uid,
  //           date: msg.date,
  //           time: msg.time,
  //           description: msg.description,
  //           image: msg.image,
  //           // location: marker,
  //           enableVolunteers: msg.eventVolunteers,
  //           attendingList: [],
  //           likes: 0,
  //           volunteerList: [],
  //         }),
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => console.log("this is the user data: ", data))
  //       .catch((error) => console.log("user creation error error: ", error));
  //   };

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
                userId={user?.uid}
              />
            );
          })}
      </section>

      <secton className={hide}>
        <CreateEvent
          myEvents
          userEventsId={userEvents?.id}
          userId={user?.uid}
          hide={hide}
          setHide={setHide}
        />
      </secton>
    </div>
  );
}
