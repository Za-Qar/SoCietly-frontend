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
      <div>
        <p>Would you like to add another journey entry?</p>
        <button onClick={handleAddJourney}>Yes</button>
        <button
          onClick={() => {
            setUser(null);
            setSignup(false);
            setPendingJourney(false);
          }}
        >
          No
        </button>
      </div>
    );
  }

  return (
    <div>
      {addJourney ? (
        <div>
          <h2>Continue your journey...</h2>
          <p>Look how far you have come</p>
        </div>
      ) : (
        <div>
          <h2>Start here...</h2>
          <p>Tell us about your School of Code journey</p>
        </div>
      )}
      <form onSubmit={handleSubmit(createJourney)}>
        <React.Fragment>
          {/*----------Name----------*/}
          <Grid container spacing={3}>
            <label for="employer">Employer</label>
            <input
              name="employer"
              ref={register}
              defaultValue={addJourney ? null : "School of Code"}
              required
            />

            <label for="jobTitle">Job Title</label>
            <input
              name="jobTitle"
              ref={register}
              defaultValue={addJourney ? null : "Student Developer"}
              required
            />

            <label for="startDate">Start Date</label>
            <input type="date" name="startDate" ref={register} required />

            <label for="endDate">End Date (if applicable)</label>
            <input type="date" name="endDate" ref={register} />

            <label for="description">Description</label>
            <textarea name="description" ref={register} required></textarea>
          </Grid>
        </React.Fragment>

        <input type="submit" value="Continue" />
      </form>
      {user?.journey && <UserJourney user={user} />}
    </div>
  );
}
