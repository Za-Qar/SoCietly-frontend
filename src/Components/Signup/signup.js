//React
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

//Context
import { useAuthContext } from "../../Context/authContext";

//Auth
import { signInWithGoogle, logout } from "../Firebase/auth";

//Components
import Loading from "../Loading/loading";
import CreateJourney from "../CreateJourney/createJourney";
import Tags from "../../MaterialUi/tags/tags.js";

// css
import "./signup.css";

// Mat ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Signup({ signup, setSignup }) {
  // Context
  const [authUser, loading, error] = useAuthContext();

  // React Form
  const { register, handleSubmit, watch, errors } = useForm();

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
    <div>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </React.Fragment>

      <h1>Sign Up</h1>
      <button onClick={logout}>Return to Home</button>
      <div>
        <form onSubmit={handleSubmit(createUser)}>
          <span>
            <img src={authUser?.photoURL} alt="user profile" />
          </span>
          <span>
            <p>Admin:</p>
            <select name="admin" ref={register}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </span>
          <span>
            <p>Name:</p>
            <input name="name" ref={register} required />
          </span>
          <span>
            <p>Surname:</p>
            <input name="surname" ref={register} required />
          </span>
          <span>
            <p>Email:</p>
            <input
              name="email"
              ref={register}
              required
              defaultValue={authUser.email}
            />
          </span>
          <span>
            <p>Cohort:</p>
            <select name="cohort" ref={register}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </span>
          <span>
            <p>Current Role:</p>
            <input name="currentRole" ref={register} required />
          </span>
          <span>
            <p>Current Employer:</p>
            <input name="currentEmployer" ref={register} required />
          </span>
          <span>
            <p>Skills:</p>
            <input
              name="skills"
              onChange={(e) => setSkillInput(e.target.value)}
              value={skillInput}
            />
            <button onClick={(e) => addToSkills(e)}>Add Skill</button>
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
          </span>
          <span>
            <p>10 Second Intro:</p>
            <textarea name="introduction" ref={register} required />
          </span>
          <span>
            <p>Social Links:</p>
            <label for="linkedin">Linkedin: </label>
            <input
              name="linkedin"
              placeholder="https://example.com"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Github">Github: </label>
            <input
              name="github"
              placeholder="https://example.com"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Twitter">Twitter: </label>
            <input
              name="twitter"
              placeholder="https://example.com"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Portfolio">Portfolio: </label>
            <input
              name="portfolio"
              placeholder="https://example.com"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Other">Other: </label>
            <input
              name="other"
              placeholder="https://example.com"
              pattern="https://.*"
              ref={register}
            ></input>
          </span>

          {/* Submit form button */}
          <input type="submit" value="Next" />
        </form>
      </div>
    </div>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
