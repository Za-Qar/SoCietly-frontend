// React
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

// Components
import Maps from "../../Components/Maps/maps.js";

//styling
import style from "./createEvent.module.css";

// userContext
import { useUserContext } from "../../Context/userContext";

// Mat ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

function CreateEvent({
  eventsEdit,
  patchEvent,
  userEventsId,
  userId,
  hide,
  setHide,

  attendinglist,
  date,
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
  setAttendindList,
  addToAttend,
  fetchUserEvents,
}) {
  // Styling
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
      height: "1erm",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  // Context
  const [user] = useUserContext();

  // React Form
  const { register, handleSubmit, watch, errors, control } = useForm();

  // State
  const [complete, setComplete] = useState(false);

  console.log("this is the userEventsId", userEventsId);

  //For Maps
  const [marker, setMarker] = useState(null);

  let createEvent = (msg) => {
    console.log("User Input recieved", msg, marker);
    fetch(
      eventsEdit
        ? `https://falcon5ives.herokuapp.com/events/${userEventsId}`
        : `https://falcon5ives.herokuapp.com/events/`,
      {
        method: eventsEdit ? "PATCH" : "POST",
        body: JSON.stringify({
          eventName: msg.eventName,
          eventType: msg.eventTypes,
          uid: user.uid,
          date: msg.date,
          time: msg.time,
          description: msg.description,
          image: msg.image,
          location: marker,
          enableVolunteers: msg.eventVolunteers,
          attendingList: eventsEdit ? null : [],
          likes: eventsEdit ? null : 0,
          volunteerList: eventsEdit ? null : [],
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .catch((error) => console.log("user creation error error: ", error));
    setComplete(true);
  };

  function consoleLog() {
    console.log(user);
    console.log(marker);
  }

  if (!complete) {
    return (
      <div className="formContainer">
        <div className="signupTitle">
          <div className="signupTitleAligner">
            <p>Create Event</p>
          </div>
        </div>
        <button onClick={consoleLog}>Get User</button>
        <form onSubmit={handleSubmit(createEvent)}>
          <React.Fragment>
            <Grid container spacing={3}>
              {eventsEdit && (
                <button
                  onClick={() =>
                    hide === "show" ? setHide("hide") : setHide("show")
                  }
                >
                  x
                </button>
              )}
              <span>
                <p>Event Name:</p>
                <input
                  name="eventName"
                  ref={register}
                  required
                  placeholder={eventname}
                />
              </span>
              <span>
                <p>Event Type:</p>
                <select id="eventTypes" name="eventTypes" ref={register}>
                  <option value="education">Education</option>
                  <option value="social">Social</option>
                  <option value="community">Community</option>
                </select>
              </span>

              {/*----------Event Type----------*/}
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-simple-select-label">Cohort</InputLabel>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="cohort"
                    as={
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.formControl}
                        name="eventTypes"
                        ref={register}
                      >
                        <MenuItem value="education">1</MenuItem>
                        <MenuItem value="social">2</MenuItem>
                        <MenuItem value="community">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                      </Select>
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Date----------*/}
              <Grid item xs={12} sm={6}>
                <p>Date:</p>
                <input
                  name="date"
                  type="date"
                  ref={register}
                  required
                  className={style.maxWidth}
                />
              </Grid>

              {/*----------Time----------*/}
              <Grid item xs={12} sm={6}>
                <p>Time:</p>
                <input
                  name="time"
                  type="time"
                  ref={register}
                  required
                  className={style.maxWidth}
                />
              </Grid>

              <span>
                <p>Description:</p>
                <textarea
                  name="description"
                  rows="10"
                  cols="30"
                  ref={register}
                  placeholder={description}
                ></textarea>
              </span>
              <span>
                <p>Image:</p>
                <input name="image" ref={register} required />
              </span>
              <span>
                <p>Location:</p>
                <div>
                  <Maps marker={marker} setMarker={setMarker} isEditing />
                  <button onClick={consoleLog}>Console.log</button>
                </div>
              </span>
              <span>
                <p>Volunteers:</p>
                <select
                  id="eventVolunteers"
                  name="eventVolunteers"
                  ref={register}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </span>
              <span>
                <input type="submit" className="button" />
              </span>
            </Grid>
          </React.Fragment>
        </form>
      </div>
    );
  } else if (complete) {
    return (
      <div>
        <p>Completed confirmation design comes here</p>
      </div>
    );
  }
}

export default CreateEvent;

// onClick={(e) => {
//     e.preventDefault();
//     //take the e.preventDefault(); away when it comes time for release
//   }}
