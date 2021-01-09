//React
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

//Style
import style from "./editUserJourney.module.css";

//Context
import { useUserContext } from "../../Context/userContext";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import ModalOverlay from "../ModalOverlay/modalOverlay";

export default function EditJourney({
  journeyItem,
  startDate,
  endDate,
  setEditJourney,
  visible,
  setJourneyIndex,
}) {
  // Context
  const [user, setUser] = useUserContext();

  const { jobtitle, employer, description, id } = journeyItem;

  // React Form
  const { handleSubmit, watch, errors, control } = useForm();

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
        setJourneyIndex(null);
      })
      .catch((error) => console.log("user creation error error: ", error));
  }

  return (
    <div>
      <ModalOverlay
        visible={visible}
        onClose={() => setEditJourney(false)}
        onSave={handleSubmit(submitJourney)}
        header={"Edit Journey Entry"}
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
              defaultValue={employer}
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
                />
              }
              control={control}
              defaultValue={jobtitle}
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
              defaultValue={startDate}
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
              defaultValue={endDate}
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
              defaultValue={description}
            />
          </FormControl>
        </form>
      </ModalOverlay>
    </div>
  );
}
