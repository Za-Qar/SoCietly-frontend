//React
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Style
import style from "../EditUserJourney/editUserJourney.module.css";

//Components
import Loading from "../../Components/Loading/loading";
import CreateJourney from "../../Components/CreateJourney/createJourney";
import ModalOverlay from "../ModalOverlay/modalOverlay";
import UserImage from "../userImage/userImage";

export default function EditProfile({ setEdit, visible }) {
  // Context
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useUserContext();

  // React Form
  const { register, handleSubmit, watch, errors } = useForm();

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
    setSkills(newSkill);
    setSkillInput("");
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
    fetch(`https://falcon5ives.herokuapp.com/users/${user.uid}`, {
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
      <form className={style.formContainer}>
        <span>
          {/* <img src={user?.profileImage} alt="user profile" /> */}
          <UserImage user={user} width={"100px"} />
        </span>
        <span>
          <p>Name:</p>
          <input name="name" ref={register} defaultValue={user.name} />
        </span>
        <span>
          <p>Surname:</p>
          <input name="surname" ref={register} defaultValue={user.surname} />
        </span>
        <span>
          <p>Cohort:</p>
          <select name="cohort" ref={register} defaultValue={user.cohort}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </span>
        <span>
          <p>Current Role:</p>
          <input
            name="currentRole"
            ref={register}
            defaultValue={user.currentRole}
          />
        </span>
        <span>
          <p>Current Employer:</p>
          <input
            name="currentEmployer"
            ref={register}
            defaultValue={user.currentEmployer}
          />
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
            {skills.map((item, index) => {
              return (
                <div key={index}>
                  <li>{item}</li>
                  <button
                    onClick={(e) => {
                      deleteSkill(index, e);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </ul>
        </span>
        <span>
          <p>10 Second Intro:</p>
          <textarea
            name="introduction"
            ref={register}
            defaultValue={user.introduction}
          />
        </span>
        <span>
          <p>Social Links:</p>
          <label for="linkedin">Linkedin: </label>
          <input
            name="linkedin"
            placeholder="https://example.com"
            pattern="https://.*"
            ref={register}
            defaultValue={findSocial("linkedin")}
          ></input>

          <label for="Github">Github: </label>
          <input
            name="github"
            placeholder="https://example.com"
            pattern="https://.*"
            ref={register}
            defaultValue={findSocial("github")}
          ></input>

          <label for="Twitter">Twitter: </label>
          <input
            name="twitter"
            placeholder="https://example.com"
            pattern="https://.*"
            ref={register}
            defaultValue={findSocial("twitter")}
          ></input>

          <label for="Portfolio">Portfolio: </label>
          <input
            name="portfolio"
            placeholder="https://example.com"
            pattern="https://.*"
            ref={register}
            defaultValue={findSocial("portfolio")}
          ></input>

          <label for="Other">Other: </label>
          <input
            name="other"
            placeholder="https://example.com"
            pattern="https://.*"
            ref={register}
            defaultValue={findSocial("other")}
          ></input>
        </span>
      </form>
    </ModalOverlay>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
