//React
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

//Context
import { useAuthContext } from "../../Context/authContext";

//Auth
import { signInWithGoogle, logout } from "../Firebase/auth";

//Components
import Loading from "../Loading/loading";
import CreateJourney from "../CreateJourney/createJourney";
import Tags from "../../MaterialUi/tags/tags.js";

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
import "./signup.css";

export default function Signup({ signup, setSignup }) {
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
  const [authUser, loading, error] = useAuthContext();

  // React Form
  const { register, handleSubmit, watch, errors, control } = useForm();

  // State
  const [complete, setComplete] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  function addToSkills(e) {
    e.preventDefault();
    if (skills.includes(skillInput)) {
      e.preventDefault();
      console.log("item already added");
      return;
    }
    const newSkill = [...skills, skillInput];

    console.log("this is skill input val: ", skillInput);
    console.log("this is the newSkill val: ", newSkill);

    setSkills(newSkill);
    setSkillInput("");
  }

  function deleteSkill(index, e) {
    e.preventDefault();
    console.log(index);
    const newSkills = [...skills.slice(0, index), ...skills.slice(index + 1)];
    setSkills(newSkills);
  }

  function createUser(msg) {
    console.log("User Input recieved", msg);

    const {
      admin,
      name,
      surname,
      email,
      cohort,
      currentRole,
      currentEmployer,
      introduction,
      linkedin = "",
      github = "",
      twitter = "",
      portfolio = "",
      other = "",
    } = msg;

    const socialArray = [
      { linkedin: linkedin },
      { github: github },
      { twitter: twitter },
      { portfolio: portfolio },
      { other: other },
    ];

    // Sets new user object in correct format
    const newUser = {
      admin: admin,
      name: name,
      surname: surname,
      email: email,
      profileImage: authUser.photoURL,
      cohort: cohort,
      currentRole: currentRole,
      currentEmployer: currentEmployer,
      skills: skills,
      introduction: introduction,
      social: socialArray,
    };

    // Posts user data to backend
    fetch(`https://falcon5ives.herokuapp.com/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .catch((error) => console.log("user creation error error: ", error));

    setComplete(true);
  }

  if (loading) {
    return <Loading />;
  }

  // Renders journey signup form once user sign up is complete
  if (complete) {
    return <CreateJourney signup={signup} setSignup={setSignup} />;
  }

  return authUser ? (
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
                      label="Surname"
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
                  as={<TextField id="email" label="email" fullWidth required />}
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
                      label="10 Second Intro..."
                      fullWidth
                      multiline
                      rows={3}
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
                  name="linkedin"
                  placeholder="https://example.com"
                  pattern="https://.*"
                  as={
                    <TextField
                      id="linkedin"
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
                  as={<TextField id="portfolio" label="Portfolio" fullWidth />}
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
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
