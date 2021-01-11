import React, { useState, useEffect } from "react";

// import cn from "classnames";
// import css from "./event.module.css";
import "./event.css";

import CreateEvent from "../../Pages/CreateEvent/createEvent.js";

import Maps from "../../Components/Maps/maps.js";

import { useUserContext } from "../../Context/userContext";

// import Card from "../../MaterialUi/Card/card.js";

function Event({
  date,
  item,

  setAttendindList,
  addToAttend,
  myEvents,
  homepageTrue,
  styling,

  fetchUserEvents,
}) {
  console.log(styling);
  console.log(item);

  /*--------Props--------*/
  const {
    attendinglist,
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
    eventid,
  } = item;

  /*--------Classes--------*/
  const {
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
  } = styling;

  console.log(eventid);

  /*--------User context--------*/
  const [user] = useUserContext();

  /*--------Maps marker state--------*/
  const [marker, setMarker] = useState(JSON.parse(location));

  /*--------useStates--------*/
  const [like, setLike] = useState(0);
  let [clicked, setClicked] = useState(false);

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

  // let backEndLike = (likes, id) => {
  //   console.log("User Input recieved", likes);

  //   fetch(`https://falcon5ives.herokuapp.com/events/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       eventName: null,
  //       eventType: null,
  //       uid: user.uid,
  //       date: null,
  //       time: null,
  //       description: null,
  //       image: null,
  //       location: marker,
  //       enableVolunteers: null,
  //       attendingList: null,
  //       likes: likes,
  //       volunteerList: null,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("this is the user data: ", data))
  //     .catch((error) => console.log("user creation error error: ", error));
  // };
  // Click like button to add to likes
  function addLikes() {
    console.log(like);
    setLike(like + 1);
    // backEndLike(like, id);
  }

  // function likeClicked() {
  //   console.log(clicked);
  //   clicked = false;
  //   console.log("button clicked");
  // }

  //When button is clicked it re renders backend and displays on front end
  // create 2 states for button (clicked and not clicked)
  //if like was added by click another click should minus click
  //button should toggle between clicked and unclicked

  // Delete Event
  let deleteEvent = (eventId) => {
    console.log("delete", eventId);

    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    fetchUserEvents();
  };

  // // Patch Event
  // let patchEvent = (eventId) => {
  //   console.log("User Input recieved", msg);
  //   fetch(`https://falcon5ives.herokuapp.com/${eventId}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       eventName: msg.eventName,
  //       eventType: msg.eventTypes,
  //       uid: user.uid,
  //       date: msg.date,
  //       time: msg.time,
  //       description: msg.description,
  //       image: msg.image,
  //       location: marker,
  //       enableVolunteers: msg.eventVolunteers,
  //       attendingList: [],
  //       likes: 0,
  //       volunteerList: [],
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("this is the user data: ", data))
  //     .catch((error) => console.log("user creation error error: ", error));
  // };

  function logging() {
    console.log(attendinglist);
    console.log(user.username);
    console.log(id);
  }

  if (volunteerlist)
    return (
      <div className={eventDiv}>
        <div className="row">
          <div className="column1">
            <div className="imgContainer">
              <img src={image} className={imgClass} />
            </div>
          </div>
          <div className="column2">
            <h3 className={eventNameClass}>{eventname}</h3>
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
            <div className={likesClass}>
              {/* {likes} */}
              {like}
              <button onClick={addLikes} className="likeButton">
                LIKE
              </button>
            </div>
          </div>
        </div>
        <div className="mapsDiv">
          {!myEvents ||
            (homepageTrue && (
              <Maps
                marker={marker}
                setMarker={setMarker}
                className={mapsClass}
              />
            ))}
        </div>

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
          <button className={delButClass} onClick={() => deleteEvent(eventid)}>
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
            eventId={eventid}
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
