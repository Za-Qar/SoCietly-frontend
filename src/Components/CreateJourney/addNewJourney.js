//React
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

//Config
import { url } from "../../config";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Components
import Loading from "../../Components/Loading/loading";

//Style
import style from "../EditUserJourney/editUserJourney.module.css";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import ModalOverlay from "../ModalOverlay/modalOverlay";

export default function AddNewJourney({ setAddJourney, addNewJourney }) {
  // Context
  const [user, setUser] = useUserContext();

  // React Form
  const { handleSubmit, watch, errors, control } = useForm();

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

    fetch(`${url}/journeys`, {
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
      <ModalOverlay
        visible={true}
        onClose={() => setAddJourney(false)}
        onSave={handleSubmit(createNewJourney)}
        header={"Add Journey Entry"}
      >
        <form className={style.formContainer}>
          <FormControl variant="outlined">
            <Controller
              name="employer"
              as={
                <TextField
                  id="employer"
                  variant="outlined"
                  label="Employer"
                  style={{ margin: 8 }}
                />
              }
              control={control}
              rules={{ required: "Required" }}
            />
          </FormControl>
          <FormControl variant="outlined">
            <Controller
              name="jobTitle"
              as={
                <TextField
                  id="jobTitle"
                  variant="outlined"
                  label="Job Title"
                  style={{ margin: 8 }}
                  rules={{ required: "Required" }}
                />
              }
              control={control}
            />
          </FormControl>
          <FormControl variant="outlined" style={{ margin: 8 }}>
            <label className={style.formLabel} for="startDate">
              Start Date
            </label>
            <Controller
              name="startDate"
              as={<input className={style.dateInput} type="date" />}
              control={control}
              rules={{ required: "Required" }}
            />
          </FormControl>
          <FormControl variant="outlined" style={{ margin: 8 }}>
            <label className={style.formLabel} for="endDate">
              End Date (if applicable)
            </label>
            <Controller
              name="endDate"
              as={<input className={style.dateInput} type="date" />}
              control={control}
            />
          </FormControl>
          <FormControl variant="outlined">
            <Controller
              name="description"
              as={
                <TextField
                  id="description"
                  variant="outlined"
                  label="Description"
                  style={{ margin: 8 }}
                  multiline
                  rows={8}
                />
              }
              control={control}
              rules={{ required: "Required" }}
            />
          </FormControl>
        </form>
      </ModalOverlay>
    </div>
    // <div>
    //   <h3>My new role</h3>
    //   <form onSubmit={handleSubmit(createNewJourney)}>
    //     <label for="employer">Employer</label>
    //     <input name="employer" ref={register} required />

    //     <label for="jobTitle">Job Title</label>
    //     <input name="jobTitle" ref={register} required />

    //     <label for="startDate">Start Date</label>
    //     <input type="date" name="startDate" ref={register} required />

    //     <label for="endDate">End Date (if applicable)</label>
    //     <input type="date" name="endDate" ref={register} />

    //     <label for="description">Description</label>
    //     <textarea name="description" ref={register} required></textarea>

    //     <input type="submit" value="Submit" />
    //   </form>
    // </div>
  );
}
