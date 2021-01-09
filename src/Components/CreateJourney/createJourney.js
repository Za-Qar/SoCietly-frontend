//React
import { useState, useEffect } from "react";
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

        <input type="submit" value="Continue" />
      </form>
      {user?.journey && <UserJourney user={user} />}

      <div className="singupContainer">
        <div className="signupTitle">
          <div className="signupTitleAligner">
            <p>Signup Form</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(createUser)}>
          <div className="signupImgSec">
            <img src={authUser?.photoURL} alt="user profile" />
          </div>

          <div className="signupImgSec">
            <button onClick={logout} className="button">
              Return to Home
            </button>
          </div>

          <React.Fragment>
            {/*----------Name----------*/}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="name"
                    as={<TextField id="firstName" label="Name" required />}
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Surname----------*/}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="surname"
                    as={
                      <TextField
                        id="surname"
                        label="surname"
                        fullWidth
                        required
                      />
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Email----------*/}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="email"
                    as={
                      <TextField id="email" label="email" fullWidth required />
                    }
                    control={control}
                    rules={{ required: "Required" }}
                    defaultValue={authUser.email}
                  />
                </FormControl>
              </Grid>

              {/*----------Cohort----------*/}
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
                        name="cohort"
                        ref={register}
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                      </Select>
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Admin----------*/}
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-simple-select-label">Admin</InputLabel>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="admin"
                    as={
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.formControl}
                        name="admin"
                        ref={register}
                      >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </Select>
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Current Role----------*/}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="currentRole"
                    as={
                      <TextField
                        id="currentRole"
                        label="Current Role"
                        fullWidth
                        required
                      />
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Current Employer----------*/}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="currentEmployer"
                    as={
                      <TextField
                        id="currentEmployer"
                        label="Current Employer"
                        fullWidth
                        required
                      />
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Skills Input----------*/}
              <Grid item xs={12} sm={6}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setSkillInput(e.target.value)}
                  value={skillInput}
                >
                  <Controller
                    name="skills"
                    as={<TextField id="skills" label="skills" required />}
                    control={control}
                    rules={{ required: "Required" }}
                  />
                  <div className="addSkillButtonAligner">
                    <button onClick={(e) => addToSkills(e)} className="button">
                      Add Skill
                    </button>
                  </div>
                </FormControl>
              </Grid>

              {/*----------Skills----------*/}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="skills"
                    as={
                      <ul>
                        <div className="root">
                          {skills.map((item, index) => {
                            return (
                              <Tags
                                key={`${item}${index}`}
                                item={item}
                                index={index}
                                deleteSkill={deleteSkill}
                              />
                            );
                          })}
                        </div>
                      </ul>
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              {/*----------Scoial Links----------*/}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="introduction"
                    as={
                      <TextField
                        id="introduction"
                        label="Introduction"
                        fullWidth
                        required
                      />
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="linkedIn"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    as={
                      <TextField
                        id="linkedIn"
                        label="LinkedIn"
                        fullWidth
                        required
                      />
                    }
                    control={control}
                    rules={{ required: "Required" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="github"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    as={<TextField id="github" label="Github" fullWidth />}
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="twitter"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    as={<TextField id="twitter" label="Twitter" fullWidth />}
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="portfolio"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    as={
                      <TextField id="portfolio" label="Portfolio" fullWidth />
                    }
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <Controller
                    name="other"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    as={<TextField id="other" label="Other" fullWidth />}
                    control={control}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </React.Fragment>

          <div className="signupSubmit">
            <div className="signupSubmitAligner">
              {/* Submit form button */}
              <input type="submit" value="Next" className="button" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
