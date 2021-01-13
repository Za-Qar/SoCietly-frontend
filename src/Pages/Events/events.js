import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Config
import { url } from "../../config";

// Components
import Event from "../../Components/Event/event.js";
import UserLeftSide from "../../Components/userLeftSide/userLeftSide.js";

// Material Ui
import Card from "../../MaterialUi/Card/card.js";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// Styling
import style from "./events.module.css";

// User Context
import { useUserContext } from "../../Context/userContext";

function GetAllEvents() {
  // Importing user data
  const [user] = useUserContext();

  const [allEvents, setAllEvents] = useState([]);
  const [attendingList, setAttendingList] = useState([]);
  const [filerValue, setFilterValue] = useState("");

  function getEventType(event) {
    let eventTypeArr = event.map((event) => event.eventtype);
    console.log(eventTypeArr);
    return eventTypeArr.reduce((acc, curr) => {
      if (acc.find((value) => value === curr)) {
        return acc;
      }
      return [...acc, curr];
    }, []);
  }

  // console.log(getEventType());

  /*---------------Add to Attend Patch----------------*/
  let addToAttend = (id, arr) => {
    console.log(id, arr);
    fetch(`${url}/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ attendingList: arr }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  async function get() {
    let res = await fetch(`${url}/events`);
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

  // Filter
  const [hideEducation, setHideEducation] = useState("");
  const [hideSocial, setHideSocial] = useState("");
  const [hideCommunity, setHideCommunity] = useState("");

  function filter(val) {
    if (val === "social") {
      setHideEducation("hide");
      setHideCommunity("hide");
      setHideSocial("");
    } else if (val === "community") {
      setHideEducation("hide");
      setHideSocial("hide");
      setHideCommunity("");
    } else if (val === "education") {
      setHideCommunity("hide");
      setHideSocial("hide");
      setHideEducation("");
    } else if (val === "all") {
      setHideCommunity("");
      setHideSocial("");
      setHideEducation("");
    }
  }
  console.log(getEventType(allEvents));
  return (
    <div>
      {user && (
        <div className={style.row}>
          <UserLeftSide />
          <div className="container marginTop">
            <div className="column1">
              <section className="columnTwo">
                <div className="welcome">
                  <h3>Hello {user?.username}</h3>
                  <h4>Here are the current planned events</h4>
                </div>
                <div className={style.buttons}>
                  <Link to="/createevent">
                    <button className="button">Create Event</button>
                  </Link>
                  <Link to="/myevents">
                    <button className="button">My Events</button>
                  </Link>
                </div>

                <div>
                  <label for="filter">Filter by Cohort</label>
                  <select
                    name="filter"
                    onChange={(e) => {
                      filter(e.target.value);
                    }}
                  >
                    <option selected value={"all"}>
                      All
                    </option>
                    {getEventType(allEvents).map((event) => {
                      return <option value={event}>{event}</option>;
                    })}
                  </select>
                </div>

                <section className={`contentContainer ${hideEducation}`}>
                  <h3>Education</h3>
                  <div>
                    <Grid container spacing={3}>
                      {allEvents.map((item, index) => {
                        if (item.eventtype === "education") {
                          let date = new Date(item.date).toDateString();
                          return (
                            <Grid item xs={3}>
                              <Paper>
                                <Card
                                  key={uuidv4()}
                                  date={date}
                                  setAttending={setAttendingList}
                                  addToAttend={addToAttend}
                                  item={item}
                                />
                              </Paper>
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </div>
                </section>

                <section className={`contentContainer ${hideSocial}`}>
                  <h3>Social</h3>

                  <Grid container spacing={3}>
                    {allEvents.map((item, index) => {
                      if (item.eventtype === "social") {
                        let date = new Date(item.date).toDateString();
                        return (
                          <Grid item xs={3}>
                            <Paper>
                              <Card
                                key={uuidv4()}
                                date={date}
                                setAttending={setAttendingList}
                                addToAttend={addToAttend}
                                item={item}
                              />
                            </Paper>
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </section>

                <section className={`contentContainer ${hideCommunity}`}>
                  <h3>Community</h3>
                  <Grid container spacing={3}>
                    {allEvents.map((item, index) => {
                      if (item.eventtype === "community") {
                        let date = new Date(item.date).toDateString();
                        return (
                          <Grid item xs={3}>
                            <Paper>
                              <Card
                                key={uuidv4()}
                                date={date}
                                setAttending={setAttendingList}
                                addToAttend={addToAttend}
                                item={item}
                              />
                            </Paper>
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </section>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllEvents;
