// React
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

// Components
import Maps from "../../Components/Maps/maps.js";
import UploadImage from "../../Components/Upload/upload.js";

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

  eventId,

  hide,
  setHide,

  description,
}) {
  /*
  userId,
  patchEvent,
  attendinglist,
  date,
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
  fetchUserEvents,*/
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
  const [imageSelected, setImageSelected] = useState(null);

  //For Maps
  const [marker, setMarker] = useState(null);

  // const createEvent = async (e) => {
  //   e.preventDefault();
  //   await fetch(`http://localhost:3000/users/imageupload`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       image: imageSelected,
  //     }),
  //     headers: { "content-type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("this is the image upload data: ", data))
  //     .catch((error) => console.log("image upload error: ", error));
  // };

  let createEvent = async (msg) => {
    console.log("Event data received", msg, marker);
    console.log("this is the eventId: ", eventId);

    if (imageSelected === null) {
      alert(
        "Dear fellow SoC memeber, please upload an image before you submit"
      );
      return;
    }

    await fetch(
      eventsEdit
        ? `http://localhost:3000/events/${eventId}`
        : `http://localhost:3000/events/`,
      {
        method: eventsEdit ? "PATCH" : "POST",
        body: JSON.stringify({
          eventName: msg.eventName,
          eventType: msg.eventTypes,
          uid: user.uid,
          date: msg.date,
          time: msg.time,
          description: msg.description,
          image: imageSelected,
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
    console.log("this is the selected image: ", imageSelected);
  }

  if (!complete) {
    return (
      <div className="createContainer">
        <div className={style.closeButtonContainer}>
          {eventsEdit && (
            <button
              onClick={() =>
                hide === "show" ? setHide("hide") : setHide("show")
              }
              className={style.closeButton}
            >
              x
            </button>
          )}
        </div>
        <div className="signupTitle">
          <div className="signupTitleAligner">
            <p>Create Event</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(createEvent)}>
          <React.Fragment>
            <Grid container spacing={3}>
              {/*----------Event Name----------*/}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="eventName"
                    as={
                      <TextField id="eventName" label="Event Name" required />
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

              {/*----------Description----------*/}
              <Grid item xs={12} sm={6}>
                <p>Description:</p>
                <textarea
                  name="description"
                  rows="10"
                  cols="30"
                  ref={register}
                  placeholder={description}
                  className={style.maxWidth}
                ></textarea>
              </Grid>

              {/*----------Upload Image----------*/}
              {/* <Grid item xs={12} sm={6}>
                <p>Image:</p>
                <input
                  name="image"
                  ref={register}
                  required
                  className={style.maxWidth}
                />
              </Grid> */}

              <Grid item xs={12} sm={6}>
                <p>Image:</p>
                <UploadImage setImageSelected={setImageSelected} />
              </Grid>

              {/*----------Location----------*/}
              <Grid item xs={12}>
                <p>Location:</p>
                <div>
                  <Maps marker={marker} setMarker={setMarker} isEditing />
                  <button onClick={consoleLog}>Console.log</button>
                </div>
              </Grid>

              {/*----------Event Type----------*/}
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-simple-select-label">
                  Event Type
                </InputLabel>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="eventTypes"
                    as={
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.formControl}
                        name="eventTypes"
                        ref={register}
                      >
                        <MenuItem value="education">Education</MenuItem>
                        <MenuItem value="social">Social</MenuItem>
                        <MenuItem value="community">Community</MenuItem>
                      </Select>
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Volunteers----------*/}
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-simple-select-label">
                  Volunteers
                </InputLabel>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="eventVolunteers"
                    as={
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.formControl}
                        name="eventVolunteers"
                        ref={register}
                      >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <input type="submit" className="button maxWidth" />
              </Grid>
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
