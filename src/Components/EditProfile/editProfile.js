//React
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

//Config
import { url } from "../../config";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Style
import style from "../EditUserJourney/editUserJourney.module.css";

//Components
import Loading from "../../Components/Loading/loading";

import ModalOverlay from "../ModalOverlay/modalOverlay";
import UserImage from "../userImage/userImage";
import Tags from "../../MaterialUi/tags/tags";

// Mat ui
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default function EditProfile({ setEdit, visible }) {
  // Context
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useUserContext();

  // React Form
  const { register, handleSubmit, watch, errors, control, reset } = useForm();

  // State
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (user) {
      setSkills(user.skills);
    }
  }, [user]);

  function findSocial(socialName) {
    const { social } = user;

    // Refactor using find()
    const newLink = social.reduce((acc, curr) => {
      const newItem = JSON.parse(curr);

      const [[social, link]] = Object.entries(newItem);
      if (socialName === social) {
        acc = link;
      }
      return acc;
    }, []);

    return newLink;
  }

  function addToSkills(e) {
    e.preventDefault();
    if (skills.includes(skillInput)) {
      console.log("item already added");
      return;
    }
    const newSkill = [...skills, skillInput];
    if (skillInput) {
      const skillsForm = document.getElementById("skills");
      skillsForm.value = "";
      setSkills(newSkill);
      setSkillInput("");
    }
  }

  function deleteSkill(index, e) {
    e.preventDefault();
    console.log(index);
    const newSkills = [...skills.slice(0, index), ...skills.slice(index + 1)];
    setSkills(newSkills);
  }

  function submitProfile(msg) {
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

    console.log(newUser);

    // Posts user data to backend
    fetch(`${url}/users/${user.uid}`, {
      method: "PATCH",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .then(() => {
        setEdit(false);
        setUser(null);
      })
      .catch((error) => console.log("user creation error error: ", error));
  }

  if (loading) {
    return <Loading />;
  }

  return authUser ? (
    <ModalOverlay
      visible={visible}
      onClose={() => setEdit(false)}
      onSave={handleSubmit(submitProfile)}
      header={"Edit Profile"}
    >
      <UserImage user={user} width={"100px"} />
      <form className={style.formContainer}>
        {/*----------Name----------*/}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <Controller
                name="name"
                as={<TextField id="firstName" label="Name" />}
                control={control}
                defaultValue={user.name}
              />
            </FormControl>
          </Grid>

          {/*----------Surname----------*/}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <Controller
                name="surname"
                as={<TextField id="surname" label="Surname" fullWidth />}
                control={control}
                defaultValue={user.surname}
              />
            </FormControl>
          </Grid>

          {/*----------Email----------*/}
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <Controller
                name="email"
                as={<TextField id="email" label="email" fullWidth />}
                control={control}
                defaultValue={authUser.email}
              />
            </FormControl>
          </Grid>

          {/*----------Cohort----------*/}
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label">Cohort</InputLabel>
            <FormControl variant="outlined" fullWidth>
              <Controller
                name="cohort"
                as={
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                defaultValue={user.cohort}
              />
            </FormControl>
          </Grid>

          {/*----------Current Role----------*/}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <Controller
                name="currentRole"
                as={
                  <TextField id="currentRole" label="Current Role" fullWidth />
                }
                control={control}
                defaultValue={user.currentRole}
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
                  />
                }
                control={control}
                defaultValue={user.currentEmployer}
              />
            </FormControl>
          </Grid>

          {/*----------Skills Input----------*/}
          <Grid item xs={12} sm={6}>
            <TextField
              id="skills"
              label="Skills"
              fullWidth
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <div className="addSkillButtonAligner">
              <button onClick={(e) => addToSkills(e)} className="button">
                Add Skill
              </button>
            </div>
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
              />
            </FormControl>
          </Grid>

          {/*----------Introduction----------*/}
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
                  />
                }
                control={control}
                defaultValue={user.introduction}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <Controller
                name="linkedin"
                placeholder="https://example.com"
                pattern="https://.*"
                as={<TextField id="linkedin" label="LinkedIn" fullWidth />}
                control={control}
                defaultValue={findSocial("linkedin")}
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
                defaultValue={findSocial("github")}
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
                defaultValue={findSocial("twitter")}
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
                defaultValue={findSocial("portfolio")}
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
                defaultValue={findSocial("other")}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </ModalOverlay>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
