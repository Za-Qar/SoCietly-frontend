import React, { useState, useEffect } from "react";

//Config
import { url } from "../../config";

//Images
import undrawEdu from "../../Images/undraw_Graduation_ktn0.svg";
import undrawSocial from "../../Images/undraw_goal_0v5v.svg";
import undrawComm from "../../Images/undraw_community_8nwl.svg";

//components
import JobUpdates from "../../Components/jobUpdates/jobUpdates";
import Card from "../../MaterialUi/Card/card.js";
import UserLeftSide from "../../Components/userLeftSide/userLeftSide.js";

//Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./homepage.module.css";

// React Router Dom
import { Link } from "react-router-dom";

export default function Homepage() {
  const [user, setUser] = useUserContext();
  const [allEvents, setAllEvents] = useState(null);

  const [date, setDate] = useState("");

  async function get() {
    let res = await fetch(`${url}/events/`);
    let data = await res.json();
    setAllEvents(data.payload);
  }

  useEffect(() => {
    if (allEvents === null) {
      get();
    }
  }, [user, allEvents]);

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

  const styling = {
    eventDiv: "homeDiv",
    eventNameClass: "homeName",
    dateClass: "homeDate",
    timeClass: "homeTime",
    imgClass: "homeImg",
    likesClass: "homeLikes",
    mapsClass: "homeMaps",
    descClass: "homeDesc",
    attLengthClass: "homeAttLength",
    attendButClass: "homeAttendBut",
    attListClass: "homeAttList",
    editButClass: "homeEditBut",
    delButClass: "homeDelBut",
  };
  return (
    <div>
      {user && (
        <div>
          <div class="left"></div>

          <div className={style.row}>
            <UserLeftSide />

            {/*--------- Column 1---------*/}
            <div className={style.column1}>
              <section className={style.columnTwo}>
                <div className={style.welcome}>
                  <h3
                    style={{
                      fontSize: "1.9rem",
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                  >
                    Hello {user.username} 👋
                  </h3>
                  <h4 style={{ marginTop: "0" }}>
                    What’s new with you? Have a look around the SoC community
                  </h4>
                </div>

                <section>
                  <div className={style.eventSec}>
                    <div className={style.eventSecSpan}>
                      <Link to="/events">
                        <img
                          className={style.eventImage}
                          src={undrawEdu}
                          alt="education"
                        />
                        <h4>Education</h4>
                      </Link>
                    </div>

                    <span className={style.eventSecSpan}>
                      <Link to="/events">
                        <h4>Community</h4>
                        <div className={style.img}>
                          <img
                            className={style.eventImage}
                            src={undrawComm}
                            alt="community"
                          />
                        </div>
                      </Link>
                    </span>

                    <span className={style.eventSecSpan}>
                      <Link to="/events">
                        <h4>Social</h4>
                        <div className={style.img}>
                          <img
                            className={style.eventImage}
                            src={undrawSocial}
                            alt="social"
                          />
                        </div>
                      </Link>
                    </span>
                  </div>
                </section>

                <section className={style.weekEvents}>
                  <h3 style={{ fontSize: "1.2rem" }}>Event This Week</h3>

                  {allEvents &&
                    allEvents.map((item, index) => {
                      let eventTrans = new Date(item.date);
                      let eventDate = eventTrans.setDate(eventTrans.getDate());

                      let date = new Date();
                      let inOneWeek = date.setDate(date.getDate() + 7);

                      let nowTrans = new Date();
                      let now = nowTrans.setDate(nowTrans.getDate() - 1);

                      let displayDate = eventTrans.toDateString();

                      if (eventDate >= now && eventDate <= inOneWeek) {
                        return (
                          <div className={style.eventCard}>
                            <Card
                              key={index}
                              date={displayDate}
                              item={item}
                              styling={styling}
                              homepageTrue
                              setUserEvents={setAllEvents}
                            />
                          </div>
                        );
                      }
                    })}

                  {/* <div className={style.eventContainer}>
                    {allEvents &&
                      allEvents.map((item, index) => {
                        let eventTrans = new Date(item.date);
                        let eventDate = eventTrans.setDate(
                          eventTrans.getDate()
                        );

                        let date = new Date();
                        let inOneWeek = date.setDate(date.getDate() + 7);

                        let nowTrans = new Date();
                        let now = nowTrans.setDate(nowTrans.getDate());

                        let displayDate = eventTrans.toDateString();

                        if (eventDate >= now && eventDate <= inOneWeek) {
                          return (
                            <Event
                              key={index}
                              date={displayDate}
                              item={item}
                              styling={styling}
                              homepageTrue
                            />
                          );
                        }
                      })}
                  </div> */}
                </section>
              </section>
            </div>

            {/*--------- Column 2---------*/}
            <div className={style.column2}>
              <JobUpdates />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
