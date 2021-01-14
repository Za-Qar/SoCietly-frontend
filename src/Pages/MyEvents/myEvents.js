import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Config
import { url } from "../../config";

// User Context
import { useUserContext } from "../../Context/userContext";

// Components
import Event from "../../Components/Event/event.js";
import CreateEvent from "../../Pages/CreateEvent/createEvent.js";
import Card from "../../MaterialUi/Card/card.js";
import UserLeftSide from "../../Components/userLeftSide/userLeftSide.js";

//styling
import style from "./myEvents.module.css";

export default function MyEvents({ profile = false }) {
  // Importing user data
  const [user] = useUserContext();

  // fetchUserEvents function result
  const [userEvents, setUserEvents] = useState(null);

  async function fetchUserEvents() {
    if (user) {
      let res = await fetch(`${url}/userevents/${user?.uid}`);
      let userEvents = await res.json();
      setUserEvents(userEvents.payload);
      console.log(userEvents.payload);
    }
  }

  useEffect(() => {
    if (userEvents === null) {
      fetchUserEvents();
    }
  }, [user, userEvents]);

  const styling = {
    eventDiv: "myEventDiv",
    eventNameClass: "myEventName",
    dateClass: "myDateClass",
    timeClass: "myTimeClass",
    imgClass: "myImgClass",
    likesClass: "myLikesClass",
    mapsClass: "myMapsClass",
    descClass: "myDescClass",
    attLengthClass: "myAttLengthClass",
    attendButClass: "myAttendButClass",
    attListClass: "myAttListClass",
    editButClass: "myEditButClass",
    delButClass: "myDelButClass",
  };

  function logging() {
    console.log(user);
    fetchUserEvents();
  }

  return (
    <div>
      {user && (
        <div className={style.row}>
          {!profile && <UserLeftSide />}
          {/*--------- Column 1---------*/}
          <div className={style.column1}>
            <section className={style.columnTwo}>
              <div className={style.welcome}>
                <h3>Hello {user?.username}</h3>
                <h4>Take a look at your events or create some</h4>
              </div>
              <div>
                <div className={style.eventButton}>
                  <Link to="/createevent">
                    <button className="button">Create Event</button>
                  </Link>
                </div>
                <div className={style.eventButton}>
                  {profile && (
                    <Link to="/myevents">
                      <button className="button">My Events</button>
                    </Link>
                  )}
                </div>
              </div>
              {userEvents === [] && <h3>User events</h3>}
              {userEvents &&
                userEvents.map((item, index) => {
                  let date = new Date(item.date).toDateString();

                  console.log(item);
                  return (
                    <div className={style.card}>
                      <Card
                        key={uuidv4()}
                        date={date}
                        item={item}
                        myEvents
                        styling={styling}
                        userId={user?.uid}
                        fetchUserEvents={fetchUserEvents}
                        setUserEvents={setUserEvents}
                      />
                    </div>
                  );
                })}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
