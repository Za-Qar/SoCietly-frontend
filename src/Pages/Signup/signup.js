//React
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Auth
import { signInWithGoogle, logout } from "../../Components/Firebase/auth";

//Components
import Loading from "../../Components/Loading/loading";
import CreateJourney from "../../Components/CreateJourney/createJourney";

export default function Signup() {
  // Context
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useUserContext();

  // React Form
  const { register, handleSubmit, watch, errors } = useForm();

  // State
  const [complete, setComplete] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  // const [socialLinks, setSocialLinks] = useState([]);
  // const [socialLinkInput, setSocialLinkInput] = useState();
  // const [socialTypeInput, setSocialTypeInput] = useState();

  function handleSignup() {
    signInWithGoogle();
  }

  function addToSkills() {
    if (skills.includes(skillInput)) {
      console.log("item already added");
      return;
    }

    const newSkill = [...skills, skillInput];
    setSkills(newSkill);
    setSkillInput("");
  }

  function deleteSkill(index) {
    console.log(index);
    const newSkills = [...skills.slice(0, index), ...skills.slice(index + 1)];
    setSkills(newSkills);
  }

  // function addSocial() {
  //   const newLink = { [socialTypeInput]: socialLinkInput };
  //   console.log(newLink);
  //   if (socialLinks.includes(newLink)) {
  //     console.log("link already added");
  //     return;
  //   }
  //   const newSocialLinks = [...socialLinks, newLink];
  //   setSocialLinks(newSocialLinks);
  // }

  let createUser = (msg) => {
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
      github,
      twitter,
      portfolio,
      other,
    } = msg;

    const socialArray = [
      { linkedin: linkedin },
      { github: github },
      { twitter: twitter },
      { portfolio: portfolio },
      { other: other },
    ];

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

    fetch(`https://falcon5ives.herokuapp.com/users`, {
      method: "POST",
      body: JSON.stringify({
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
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .catch((error) => console.log("user creation error error: ", error));

    setComplete(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (complete) {
    return <CreateJourney />;
  }

  return authUser ? (
    <div>
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
            <button onClick={addToSkills}>Add Skill</button>
            <ul>
              {skills.map((item, index) => {
                return (
                  <div>
                    <li>{item}</li>
                    <button
                      onClick={() => {
                        deleteSkill(index);
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
            <textarea name="introduction" ref={register} required />
          </span>
          <span>
            <p>Social Links:</p>
            {/* <select
              name="social"
              ref={register}
              onChange={(e) => setSocialTypeInput(e.target.value)}
            >
              <option value="linkedin">linkedin</option>
              <option value="github">github</option>
              <option value="twitter">twitter</option>
              <option value="portfolio">portfolio</option>
              <option value="other">other</option>
            </select> */}
            <label for="linkedin">Linkedin: </label>
            <input
              // onChange={(e) => setSocialLinkInput(e.target.value)}
              // type="url"
              name="linkedin"
              placeholder="https://example.com"
              // defaultValue="https://"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Github">Github: </label>
            <input
              // type="url"
              name="github"
              placeholder="https://example.com"
              // defaultValue="https://"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Twitter">Twitter: </label>
            <input
              // type="url"
              name="twitter"
              placeholder="https://example.com"
              // defaultValue="https://"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Portfolio">Portfolio: </label>
            <input
              // type="url"
              name="portfolio"
              placeholder="https://example.com"
              // defaultValue="https://"
              pattern="https://.*"
              ref={register}
            ></input>

            <label for="Other">Other: </label>
            <input
              // type="url"
              name="other"
              placeholder="https://example.com"
              // defaultValue="https://"
              pattern="https://.*"
              ref={register}
            ></input>

            {/* <button onClick={addSocial}>+</button> */}
          </span>
          <input type="submit" value="Next" />
        </form>
      </div>
    </div>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}

///////////////////////////////////

//   let createUser = (msg) => {
//     console.log("User Input recieved", msg, marker);
//     if (eventsEdit) {
//       fetch(`https://falcon5ives.herokuapp.com/user`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           admin: ,
//           name: ,
//           surname: ,
//           email: ,
//           profileImage: ,
//           cohort: ,
//           currentRole: ,
//           currentEmployer: ,
//           skills: ,
//           introduction: ,
//           social: ,

//         }),
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then((data) => console.log("this is the user data: ", data))
//         .catch((error) => console.log("user creation error error: ", error));

//       fetchUserEvents();
//       setComplete(true);
//     } else if (!eventsEdit) {
//       console.log("this is create event");
//       fetch(`https://falcon5ives.herokuapp.com/events/`, {
//         method: "POST",
//         body: JSON.stringify({
//           eventName: msg.eventName,
//           eventType: msg.eventTypes,
//           uid: user.uid,
//           date: msg.date,
//           time: msg.time,
//           description: msg.description,
//           image: msg.image,
//           location: marker,
//           enableVolunteers: msg.eventVolunteers,
//           attendingList: [],
//           likes: 0,
//           volunteerList: [],
//         }),
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then((data) => console.log("this is the user data: ", data))
//         .catch((error) => console.log("user creation error error: ", error));

//       setComplete(true);
//     }
//   };

//   function consoleLog() {
//     console.log(user);
//     console.log(marker);
//   }

//   if (!complete) {
//     return (
//       <div>
//         <button onClick={consoleLog}>Get User</button>
//         <form onSubmit={handleSubmit(createEvent)}>
//           {eventsEdit && (
//             <button
//               onClick={() =>
//                 hide === "show" ? setHide("hide") : setHide("show")
//               }
//             >
//               x
//             </button>
//           )}
//           <span>
//             <p>Name:</p>
//             <input
//               name="name"
//               ref={register}
//               required
//               placeholder={name}
//             />
//           </span>
//           <span>
//           <p>Surname:</p>
//             <input
//               name="surname"
//               ref={register}
//               required
//               placeholder={surname}
//             />

//           </span>
//           <span>
//             <p>Date:</p>
//             <input name="date" type="date" ref={register} required />
//           </span>
//           <span>
//             <p>Time:</p>
//             <input name="time" type="time" ref={register} required />
//           </span>
//           <span>
//             <p>Description:</p>
//             <textarea
//               name="description"
//               rows="10"
//               cols="30"
//               ref={register}
//               placeholder={description}
//             ></textarea>
//           </span>
//           <span>
//             <p>Image:</p>
//             <input name="image" ref={register} required />
//           </span>
//           <span>
//             <p>Location:</p>
//             <div>
//               <Maps marker={marker} setMarker={setMarker} isEditing />
//               <button onClick={consoleLog}>Console.log</button>
//             </div>
//           </span>
//           <span>
//             <p>Volunteers:</p>
//             <select id="eventVolunteers" name="eventVolunteers" ref={register}>
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </span>
//           <input type="submit" />
//         </form>
//       </div>
//     );
//   } else if (complete) {
//     return (
//       <div>
//         <p>Completed confirmation design comes here</p>
//       </div>
//     );
//   }
// }

// export default CreateEvent;

// // onClick={(e) => {
// //     e.preventDefault();
// //     //take the e.preventDefault(); away when it comes time for release
// //   }}
