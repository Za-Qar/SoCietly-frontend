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

export default function AddNewJourney({ setAddJourney }) {
  // Context
  const [user, setUser] = useUserContext();

  // React Form
  const { register, handleSubmit, watch, errors } = useForm();

  function createNewJourney(msg) {
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
        setAddJourney(false);
        setUser(null);
      })
      .catch((error) => console.log("user creation error error: ", error));
  }

  return (
    <div>
      <h3>My new role</h3>
      <form onSubmit={handleSubmit(createNewJourney)}>
        <label for="employer">Employer</label>
        <input name="employer" ref={register} required />

        <label for="jobTitle">Job Title</label>
        <input name="jobTitle" ref={register} required />

        <label for="startDate">Start Date</label>
        <input type="date" name="startDate" ref={register} required />

        <label for="endDate">End Date (if applicable)</label>
        <input type="date" name="endDate" ref={register} />

        <label for="description">Description</label>
        <textarea name="description" ref={register} required></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
