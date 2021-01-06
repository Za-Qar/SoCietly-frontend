//React
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Components
import Loading from "../../Components/Loading/loading";

export default function EditJourney({
  journeyItem,
  startDate,
  endDate,
  setEditJourney,
}) {
  // Context
  const [user, setUser] = useUserContext();

  console.log(user);

  const { jobtitle, employer, description, id } = journeyItem;

  //   <h4>{item.jobTitle}</h4>
  //               <h5>{item.employer}</h5>
  //               <h5>{item.startDate}</h5>
  //               <p>{item.description}</p>

  // React Form
  const { register, handleSubmit, watch, errors } = useForm();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setWaiting(false);
  //       console.log("timeout complete");
  //     }, 3000);
  //   }, []);

  function submitJourney(msg) {
    console.log("User Input recieved", msg);

    const { employer, jobTitle, startDate, endDate, description } = msg;

    const newJourney = {
      //   uid: user.id ? user.id : user.uid,
      employer: employer,
      jobTitle: jobTitle,
      startDate: startDate,
      endDate: endDate ? endDate : null,
      description: description,
    };

    console.log(newJourney);

    fetch(`https://falcon5ives.herokuapp.com/journeys/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newJourney),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .then(() => {
        setUser(null);
        setEditJourney(false);
      })
      .catch((error) => console.log("user creation error error: ", error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitJourney)}>
        <label for="employer">Employer</label>
        <input name="employer" ref={register} defaultValue={employer} />

        <label for="jobTitle">Job Title</label>
        <input name="jobTitle" ref={register} defaultValue={jobtitle} />

        <label for="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          ref={register}
          defaultValue={startDate}
        />

        <label for="endDate">End Date (if applicable)</label>
        <input
          type="date"
          name="endDate"
          ref={register}
          defaultValue={endDate}
        />

        <label for="description">Description</label>
        <textarea
          name="description"
          ref={register}
          defaultValue={description}
        ></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
