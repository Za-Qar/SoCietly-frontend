import React, { useState, useEffect } from "react";

//components
import UserInfo from "../../Components/UserInfo/userinfo";
import UserImage from "../../Components/userImage/userImage";
import JobUpdates from "../../Components/jobUpdates/jobUpdates";
import Event from "../../Components/Event/event.js";

//Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./homepage.module.css";

export default function Homepage() {
  const [user, setUser] = useUserContext();
  const [allEvents, setAllEvents] = useState([]);

  const [date, setDate] = useState("");

  async function get() {
    let res = await fetch("https://falcon5ives.herokuapp.com/events");
    let data = await res.json();
    setAllEvents(data.payload);
  }

  useEffect(() => {
    get();
  }, []);

  function makeDate() {
    let currentdate = new Date();
    var dateOnly =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();
    setDate(dateOnly);
    // setDate(currentdate.setDate(currentdate.getDate() - 7));
    // 2020-12-10T00:00:00.000Z
  }

  useEffect(() => {
    const timeInterval = setInterval(makeDate, 8.64e7);
    return () => clearInterval(timeInterval); //change page, time will stop
  }, []);

  useEffect(() => {
    makeDate();
  }, []);

  // let eventDate = new Date(allEvents[0]?.date);
  // console.log("eventDate: ", eventDate.setDate(eventDate.getDate()));

  // var oneWeekAgo = new Date();
  // console.log("oneWeekAgo: ", oneWeekAgo.setDate(oneWeekAgo.getDate() - 7));

  // var now = new Date();
  // console.log("now: ", now.setDate(now.getDate()));

  return (
    <div>
      {user && (
        <div>
          <h1>Homepage</h1>
          <UserImage user={user} width={"100px"} />

          <section>
            <h3>This week</h3>
            <div>
              {allEvents &&
                allEvents.map((item, index) => {
                  let eventTrans = new Date(item.date);
                  let eventDate = eventTrans.setDate(eventTrans.getDate());

                  let date = new Date();
                  let inOneWeek = date.setDate(date.getDate() + 7);

                  let nowTrans = new Date();
                  let now = nowTrans.setDate(nowTrans.getDate());

                  let displayDate = eventTrans.toDateString();

                  if (eventDate >= now && eventDate <= inOneWeek) {
                    return (
                      <Event
                        key={index}
                        attendinglist={item.attendinglist}
                        date={displayDate}
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
            </div>
          </section>

          <UserInfo user={user} />
          <JobUpdates />
        </div>
      )}
    </div>
  );
}
