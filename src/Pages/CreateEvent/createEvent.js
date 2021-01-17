// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

//Config
import { url } from "../../config";

// Components
import Maps from "../../Components/Maps/maps.js";
import UploadImage from "../../Components/Upload/upload.js";

//styling
import style from "./createEvent.module.css";
import "./createEvent.css";
import cn from "classnames";

// userContext
import { useUserContext } from "../../Context/userContext";

// Modal
import ModalOverlay from "../../Components/ModalOverlay/modalOverlay.js";

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

import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

function CreateEvent({
  eventsEdit,

  eventId,

  hide,
  setHide,

  description,
  eventname,
  time,
  date,
  editEvent,
}) {
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
  const [onlineEvent, setOnlineEvent] = useState(false);

  const [hideMap, setHideMap] = useState("");
  const [hideLink, setHideLink] = useState("hide");

  const [error, setError] = useState(false);

  //For Maps and eventlink
  const [marker, setMarker] = useState(null);
  const [eventLinkForm, setEventLinkForm] = useState("");

  // All user emails
  const [userEmails, setUserEmail] = useState("");

  // Get user emails
  let getAllUserEmails = async () => {
    let res = await fetch(`${url}/users`);
    let data = await res.json();

    return data.payload.map((user) => {
      setUserEmail(user.email);
    });
  };

  useEffect(() => {
    getAllUserEmails();
  }, []);

  // Send email function
  async function sendEmail(data, msg) {
    if (msg.description === undefined) {
      msg.description = "";
    } else {
      msg.description = msg.description + ".";
    }
    await fetch(`${url}/mail`, {
      method: "POST",
      body: JSON.stringify({
        to: ["za.qa@outlook.com", "qarout.zaid@gmail.com"],
        subject: `SoC: ${msg.eventName}`,
        text: `${user.username} has created a new School of Code event. ${msg.description} You can view more details here: https://societly.netlify.app/event/${data.eventid}`,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .catch((error) => console.log("event creation error: ", error));
  }

  // PATCH/POST Event
  let createEvent = async (msg) => {
    if (imageSelected === null && !eventsEdit) {
      alert(
        "Dear fellow SoC memeber, please upload an image before you submit"
      );
      return;
    }

    await fetch(eventsEdit ? `${url}/events/${eventId}` : `${url}/events/`, {
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
        likes: eventsEdit ? null : [],
        volunteerList: eventsEdit ? null : [],
        eventLink: eventsEdit ? null : eventLinkForm,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => sendEmail(data, msg))
      .catch((error) => {
        console.log("event creation error: ", error);
        setError(true);
      });
    setComplete(true);
  };

  function checkUncheck() {
    hideMap === "" ? setHideMap("hide") : setHideMap("");
    hideLink === "hide" ? setHideLink("") : setHideLink("hide");
  }

  if (!complete) {
    return (
      <div className="singupContainer marginTop">
        <div className="signupTitle">
          <div className="signupTitleAligner">
            <h3>Create Event</h3>
          </div>
        </div>
        <div className="formContent">
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

          {editEvent && (
            <ModalOverlay
              header={"Edit Event"}
              visible={true}
              onSave={handleSubmit(createEvent)}
              onClose={() => setHide("hide")}
            >
              <form>
                <React.Fragment>
                  <Grid container spacing={3}>
                    {/*----------Event Name----------*/}
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <Controller
                          name="eventName"
                          as={<TextField id="eventName" label="Event Name" />}
                          control={control}
                          defaultValue={eventname}
                        />
                      </FormControl>
                    </Grid>

                    {/*----------Date----------*/}
                    <Grid item xs={12} sm={6}>
                      <p className={style.formLabel}>Date:</p>
                      <input
                        name="date"
                        type="date"
                        ref={register}
                        required
                        className={cn(style.maxWidth, style.dateInput)}
                        defaultValue={date}
                      />
                    </Grid>

                    {/*----------Time----------*/}
                    <Grid item xs={12} sm={6}>
                      <p className={style.formLabel}>Time:</p>
                      <input
                        name="time"
                        type="time"
                        ref={register}
                        required
                        className={cn(style.maxWidth, style.dateInput)}
                        defaultValue={time}
                      />
                    </Grid>

                    {/*----------Description----------*/}

                    {/* <Grid item xs={12} sm={6}>
                  <div className={`${hideLink}`}>
                    <FormControl variant="outlined" fullWidth>
                      <Controller>
                        <TextField
                          name="description"
                          rows="10"
                          cols="30"
                          multiLine=""
                        />
                      </Controller>
                    </FormControl>
                  </div>
                </Grid> */}

                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <Controller
                          name="description"
                          as={
                            <TextField
                              id="description"
                              variant="outlined"
                              label="Description"
                              style={{ margin: 8 }}
                              multiline
                              rows={8}
                            />
                          }
                          control={control}
                          defaultValue={description}
                        />
                      </FormControl>
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
                      <p className={style.formLabel}>Image:</p>
                      <UploadImage setImageSelected={setImageSelected} />{" "}
                    </Grid>

                    {/*----------Location----------*/}
                    <Grid item xs={12}>
                      <div>
                        <h3>Is this event online?</h3>
                        <Switch
                          focusVisibleClassName={classes.focusVisible}
                          disableRipple
                          onChange={checkUncheck}
                          classes={{
                            root: classes.root,
                            switchBase: classes.switchBase,
                            thumb: classes.thumb,
                            track: classes.track,
                            checked: classes.checked,
                          }}
                        />
                      </div>
                    </Grid>

                    {/*----------Event Link----------*/}
                    <Grid item xs={12}>
                      <div className={`${hideLink}`}>
                        <FormControl variant="outlined" fullWidth>
                          <TextField
                            name="eventLink"
                            id="eventLink"
                            label="Event Link"
                            onChange={(e) => setEventLinkForm(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </Grid>

                    {/*----------Event Location - Map----------*/}
                    <Grid item xs={12}>
                      <div className={`${hideMap}`}>
                        <p className={style.formLabel}>Location:</p>
                        <div>
                          <Maps
                            marker={marker}
                            setMarker={setMarker}
                            isEditing
                          />
                        </div>
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
                        Open to volunteers?
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
                  </Grid>
                </React.Fragment>
              </form>
            </ModalOverlay>
          )}

          {!editEvent && (
            <form onSubmit={handleSubmit(createEvent)}>
              <React.Fragment>
                <Grid container spacing={3}>
                  {/*----------Event Name----------*/}
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <Controller
                        name="eventName"
                        as={
                          <TextField
                            id="eventName"
                            label="Event Name"
                            required
                          />
                        }
                        control={control}
                        rules={{ required: "Required" }}
                        defaultValue={eventname}
                      />
                    </FormControl>
                  </Grid>

                  {/*----------Date----------*/}
                  <Grid item xs={12} sm={6}>
                    <p className={style.formLabel}>Date:</p>
                    <input
                      name="date"
                      type="date"
                      ref={register}
                      required
                      className={cn(style.maxWidth, style.dateInput)}
                      defaultValue={date}
                    />
                  </Grid>

                  {/*----------Time----------*/}
                  <Grid item xs={12} sm={6}>
                    <p className={style.formLabel}>Time:</p>
                    <input
                      name="time"
                      type="time"
                      ref={register}
                      required
                      className={cn(style.maxWidth, style.dateInput)}
                      defaultValue={time}
                    />
                  </Grid>

                  {/*----------Description----------*/}

                  {/* <Grid item xs={12} sm={6}>
                  <div className={`${hideLink}`}>
                    <FormControl variant="outlined" fullWidth>
                      <Controller>
                        <TextField
                          name="description"
                          rows="10"
                          cols="30"
                          multiLine=""
                        />
                      </Controller>
                    </FormControl>
                  </div>
                </Grid> */}

                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Controller
                        name="description"
                        as={
                          <TextField
                            id="description"
                            variant="outlined"
                            label="Description"
                            style={{ margin: 8 }}
                            multiline
                            rows={8}
                          />
                        }
                        control={control}
                        defaultValue={description}
                      />
                    </FormControl>
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
                    <p className={style.formLabel}>Image:</p>
                    <UploadImage setImageSelected={setImageSelected} />{" "}
                  </Grid>

                  {/*----------Location----------*/}
                  <Grid item xs={12}>
                    <div>
                      <h3>Is this event online?</h3>
                      <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        onChange={checkUncheck}
                        classes={{
                          root: classes.root,
                          switchBase: classes.switchBase,
                          thumb: classes.thumb,
                          track: classes.track,
                          checked: classes.checked,
                        }}
                      />
                    </div>
                  </Grid>

                  {/*----------Event Link----------*/}
                  <Grid item xs={12}>
                    <div className={`${hideLink}`}>
                      <FormControl variant="outlined" fullWidth>
                        <TextField
                          name="eventLink"
                          id="eventLink"
                          label="Event Link"
                          onChange={(e) => setEventLinkForm(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </Grid>

                  {/*----------Event Location - Map----------*/}
                  <Grid item xs={12}>
                    <div className={`${hideMap}`}>
                      <p className={style.formLabel}>Location:</p>
                      <div>
                        <Maps marker={marker} setMarker={setMarker} isEditing />
                      </div>
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
                      Open to volunteers?
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
          )}
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="container marginTop center">
        <div className="signupTitle red">
          <div className="signupTitleAligner red">
            <h3>Event Creation Error</h3>
          </div>
        </div>

        <div>
          <Link to="/">
            <button className="button marginRight">Return to Home</button>
          </Link>
          <Link to="/myevents">
            <button className="button marginLeft">My Events</button>
          </Link>
        </div>
      </div>
    );
  } else if (complete) {
    return (
      <div className="container marginTop center">
        <div className="signupTitle">
          <div className="signupTitleAligner">
            <h3>Event Create Successfully</h3>
          </div>
        </div>

        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>

        <div>
          <Link to="/">
            <button className="button marginRight">Return to Home</button>
          </Link>
          <Link to="/myevents">
            <button className="button marginLeft">My Events</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
