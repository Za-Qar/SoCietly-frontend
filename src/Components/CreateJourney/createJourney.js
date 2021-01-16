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

  // State
  const [waiting, setWaiting] = useState(true);
  // const [pendingJourney, setPendingJourney] = useState(false);
  const [addJourney, setAddJourney] = useState(false);

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

  // React Form
  const { register, handleSubmit, watch, errors, control, reset } = useForm();

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        const res = await fetch(
          `https://falcon5ives.herokuapp.com/users/?email=${authUser.email}`
        );

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
        setAddJourney(true);
        reset();
      })
      .catch((error) => console.log("user creation error error: ", error));
  }

  // function handleAddJourney() {
  //   setPendingJourney(false);
  //   setAddJourney(true);
  // }

  if (waiting) {
    return <Loading />;
  }

  // if (pendingJourney) {
  //   return (
  //     <div className="addAnotherContainer">
  //       <p>Would you like to add another journey entry?</p>
  //       <div className="journeyButtonAligner">
  //         <button
  //           onClick={() => {
  //             setUser(null);
  //             setSignup(false);
  //             setPendingJourney(false);
  //           }}
  //           className="button halfWidthJourney noMargin"
  //         >
  //           No
  //         </button>
  //         <button
  //           onClick={handleAddJourney}
  //           className="button-cancel halfWidthJourney yesMargin"
  //         >
  //           Yes
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="singupContainer">
      {addJourney ? (
        <div className="journeyTitle">
          <div className="signupTitleAligner">
            <h2>Continue your journey...</h2>
            <p>Look how far you've come</p>
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
      <div className="formContent">
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
                    defaultValue={addJourney ? "" : "School of Code"}
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
                    defaultValue={addJourney ? "" : "Student Developer"}
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
                        label="Summarise your experience"
                        style={{ margin: 0 }}
                        multiline
                        rows={8}
                      />
                    }
                    control={control}
                    rules={{ required: "Required" }}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
            </Grid>
          </React.Fragment>

          <div className="signupSubmit">
            <div className="signupSubmitAligner">
              <input
                type="submit"
                value="Add Journey"
                className="button buttonMarginLeft"
              />
            </div>
          </div>
        </form>
      </div>
      {user?.journey && <UserJourney user={user} />}
      {addJourney && (
        <div className="signupSubmit">
          <div className="signupSubmitAligner">
            <button
              onClick={() => {
                setUser(null);
                setSignup(false);
              }}
              className="button-blue continueButtonMargin"
            >
              Continue to Home
            </button>
          </div>
        </div>
      )}
      {!addJourney && (
        <div className="signupSubmit">
          <div className="signupSubmitAligner">
            <button
              className="button continueButtonMargin"
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            >
              Continue to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
