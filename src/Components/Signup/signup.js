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
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./addressForm/addressFrom.js";
import PaymentForm from "./paymentFrom/paymentFrom.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Sign up info", "Add journey"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Signup() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Sign up form
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

// export default function Signup({ signup, setSignup }) {
//   // Context
//   const [authUser, loading, error] = useAuthContext();

//   // React Form
//   const { register, handleSubmit, watch, errors } = useForm();

//   // State
//   const [complete, setComplete] = useState(false);
//   const [skills, setSkills] = useState([]);
//   const [skillInput, setSkillInput] = useState("");

//   function addToSkills(e) {
//     e.preventDefault();
//     if (skills.includes(skillInput)) {
//       e.preventDefault();
//       console.log("item already added");
//       return;
//     }
//     const newSkill = [...skills, skillInput];
//     setSkills(newSkill);
//     setSkillInput("");
//   }

//   function deleteSkill(index, e) {
//     e.preventDefault();
//     console.log(index);
//     const newSkills = [...skills.slice(0, index), ...skills.slice(index + 1)];
//     setSkills(newSkills);
//   }

//   function createUser(msg) {
//     console.log("User Input recieved", msg);

//     const {
//       admin,
//       name,
//       surname,
//       email,
//       cohort,
//       currentRole,
//       currentEmployer,
//       introduction,
//       linkedin = "",
//       github = "",
//       twitter = "",
//       portfolio = "",
//       other = "",
//     } = msg;

//     const socialArray = [
//       { linkedin: linkedin },
//       { github: github },
//       { twitter: twitter },
//       { portfolio: portfolio },
//       { other: other },
//     ];

//     // Sets new user object in correct format
//     const newUser = {
//       admin: admin,
//       name: name,
//       surname: surname,
//       email: email,
//       profileImage: authUser.photoURL,
//       cohort: cohort,
//       currentRole: currentRole,
//       currentEmployer: currentEmployer,
//       skills: skills,
//       introduction: introduction,
//       social: socialArray,
//     };

//     // Posts user data to backend
//     fetch(`https://falcon5ives.herokuapp.com/users`, {
//       method: "POST",
//       body: JSON.stringify(newUser),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((data) => console.log("this is the user data: ", data))
//       .catch((error) => console.log("user creation error error: ", error));

//     setComplete(true);
//   }

//   if (loading) {
//     return <Loading />;
//   }

//   // Renders journey signup form once user sign up is complete
//   if (complete) {
//     return <CreateJourney signup={signup} setSignup={setSignup} />;
//   }

//   return authUser ? (
//     <div>
//       <h1>Sign Up</h1>
//       <button onClick={logout}>Return to Home</button>
//       <div>
//         <form onSubmit={handleSubmit(createUser)}>
//           <span>
//             <img src={authUser?.photoURL} alt="user profile" />
//           </span>
//           <span>
//             <p>Admin:</p>
//             <select name="admin" ref={register}>
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </span>
//           <span>
//             <p>Name:</p>
//             <input name="name" ref={register} required />
//           </span>
//           <span>
//             <p>Surname:</p>
//             <input name="surname" ref={register} required />
//           </span>
//           <span>
//             <p>Email:</p>
//             <input
//               name="email"
//               ref={register}
//               required
//               defaultValue={authUser.email}
//             />
//           </span>
//           <span>
//             <p>Cohort:</p>
//             <select name="cohort" ref={register}>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//             </select>
//           </span>
//           <span>
//             <p>Current Role:</p>
//             <input name="currentRole" ref={register} required />
//           </span>
//           <span>
//             <p>Current Employer:</p>
//             <input name="currentEmployer" ref={register} required />
//           </span>
//           <span>
//             <p>Skills:</p>
//             <input
//               name="skills"
//               onChange={(e) => setSkillInput(e.target.value)}
//               value={skillInput}
//             />
//             <button onClick={(e) => addToSkills(e)}>Add Skill</button>
//             <ul>
//               <div className="root">
//                 {skills.map((item, index) => {
//                   return (
//                     <Tags
//                       key={`${item}${index}`}
//                       item={item}
//                       index={index}
//                       deleteSkill={deleteSkill}
//                     />
//                   );
//                 })}
//               </div>
//             </ul>
//           </span>
//           <span>
//             <p>10 Second Intro:</p>
//             <textarea name="introduction" ref={register} required />
//           </span>
//           <span>
//             <p>Social Links:</p>
//             <label for="linkedin">Linkedin: </label>
//             <input
//               name="linkedin"
//               placeholder="https://example.com"
//               pattern="https://.*"
//               ref={register}
//             ></input>

//             <label for="Github">Github: </label>
//             <input
//               name="github"
//               placeholder="https://example.com"
//               pattern="https://.*"
//               ref={register}
//             ></input>

//             <label for="Twitter">Twitter: </label>
//             <input
//               name="twitter"
//               placeholder="https://example.com"
//               pattern="https://.*"
//               ref={register}
//             ></input>

//             <label for="Portfolio">Portfolio: </label>
//             <input
//               name="portfolio"
//               placeholder="https://example.com"
//               pattern="https://.*"
//               ref={register}
//             ></input>

//             <label for="Other">Other: </label>
//             <input
//               name="other"
//               placeholder="https://example.com"
//               pattern="https://.*"
//               ref={register}
//             ></input>
//           </span>

//           {/* Submit form button */}
//           <input type="submit" value="Next" />
//         </form>
//       </div>
//     </div>
//   ) : (
//     <Redirect to={"/login"}></Redirect>
//   );
// }
