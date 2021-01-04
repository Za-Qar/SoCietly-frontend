//React
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Auth
import { signInWithGoogle } from "../../Components/Firebase/auth";

//Components
import Loading from "../../Components/Loading/loading";

export default function Signup() {
  const [authUser, loading, error] = useAuthContext();

  const [user] = useUserContext();
  const { register, handleSubmit, watch, errors } = useForm();
  const [complete, setComplete] = useState(false);

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  console.log(authUser);
  console.log(skills);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <form>
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
              value={authUser.email}
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
              required
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
          {/* <span>
            <p>Date:</p>
            <input name="date" type="date" ref={register} required />
          </span>
          <span>
            <p>Time:</p>
            <input name="time" type="time" ref={register} required />
          </span>
          <span>
            <p>Description:</p>
            <textarea
              name="description"
              rows="10"
              cols="30"
              ref={register}
              placeholder={description}
            ></textarea>
          </span>
          <span>
            <p>Image:</p>
            <input name="image" ref={register} required />
          </span>
          <span>
            <p>Location:</p>
          </span>
          <span>
            <p>Volunteers:</p>
            <select id="eventVolunteers" name="eventVolunteers" ref={register}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </span>
          <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
}

///////////////////////////////////

//   let createEvent = (msg) => {
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
