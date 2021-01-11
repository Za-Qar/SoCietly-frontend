//React
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Components
import Loading from "../../Components/Loading/loading";
import { set } from "date-fns";
import UserJourney from "../UserJourney/journey";

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

// Styling
import "./createJourney.css";

export default function CreateJourney({ signup, setSignup }) {
  // Context
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useUserContext();
  const [waiting, setWaiting] = useState(true);
  const [pendingJourney, setPendingJourney] = useState(false);
  const [addJourney, setAddJourney] = useState(false);

  console.log(user);

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

  // React Form
  const { register, handleSubmit, watch, errors, control } = useForm();

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        const res = await fetch(
          `https://falcon5ives.herokuapp.com/users/?email=${authUser.email}`
        );
        console.log("fetch");
        const data = await res.json();

        const payload = data.payload[0];

        !user && setUser(payload);
      }
    }
    getUser();
  }, [authUser, waiting]);

  useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
      console.log("timeout complete");
    }, 3000);
  }, []);

  function createJourney(msg) {
    console.log("User Input recieved", msg);

    const { employer, jobTitle, startDate, endDate, description } = msg;

    const newJourney = {
      uid: user.id ? user.id : user.uid,
      employer: employer,
      jobTitle: jobTitle,
      startDate: startDate,
      endDate: endDate ? endDate : null,
      description: description,
    };

    console.log(newJourney);

    fetch(`https://falcon5ives.herokuapp.com/journeys`, {
      method: "POST",
      body: JSON.stringify(newJourney),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .then(() => {
        setUser(null);
        // setSignup(false);
        setPendingJourney(true);
      })
      .catch((error) => console.log("user creation error error: ", error));
  }

  function handleAddJourney() {
    setPendingJourney(false);
    setAddJourney(true);
  }

  if (waiting) {
    return <Loading />;
  }

  if (pendingJourney) {
    return (
      <div className="singupContainer">
        <p>Would you like to add another journey entry?</p>
        <div className="journeyButtonAligner">
          <button
            onClick={handleAddJourney}
            className="button halfWidthJourney yesMargin"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setUser(null);
              setSignup(false);
              setPendingJourney(false);
            }}
            className="button halfWidthJourney noMargin"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="singupContainer">
      {addJourney ? (
        <div className="journeyTitle">
          <div className="signupTitleAligner">
            <h2>Continue your journey...</h2>
            <p>Look how far you have come</p>
          </div>
        </div>
      ) : (
        <div className="journeyTitle">
          <div className="signupTitleAligner">
            <h2>Start here...</h2>
            <p>Tell us about your School of Code journey</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(createJourney)}>
        <React.Fragment>
          <Grid container spacing={3}>
            {/*----------Employer----------*/}
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <Controller
                  name="employer"
                  as={<TextField id="employer" label="Employer" required />}
                  control={control}
                  rules={{ required: "Required" }}
                  defaultValue={addJourney ? null : "School of Code"}
                />
              </FormControl>
            </Grid>

            {/*----------Job Title----------*/}
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <Controller
                  name="jobTitle"
                  as={<TextField id="jobTitle" label="Job Title" required />}
                  control={control}
                  rules={{ required: "Required" }}
                  defaultValue={addJourney ? null : "Student Developer"}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className="formLabel" for="startDate">
                Start Date
              </label>
              <br />
              <br />
              <input
                type="date"
                name="startDate"
                ref={register}
                required
                className="maxWidthJourney dateInput"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className="formLabel" for="endDate">
                End Date (if applicable)
              </label>
              <br />
              <br />
              <input
                type="date"
                name="endDate"
                ref={register}
                className="maxWidthJourney dateInput"
              />
            </Grid>

            <Grid item xs={24} sm={12}>
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
                />
              </FormControl>
            </Grid>
          </Grid>
        </React.Fragment>

        <div className="signupSubmit">
          <div className="signupSubmitAligner">
            <input type="submit" value="Continue" className="button" />
          </div>
        </div>
      </form>
      {user?.journey && <UserJourney user={user} />}
    </div>
  );
}
