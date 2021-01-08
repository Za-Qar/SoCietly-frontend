//React
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "./editUserJourney.css";

//Context
import { useUserContext } from "../../Context/userContext";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TimelineItem from "@material-ui/lab/TimelineItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

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
  const { register, handleSubmit, watch, errors, control } = useForm();

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
  // <label for="employer">Employer</label>
  // {/* <input name="employer" ref={register} defaultValue={employer} /> */}

  // <TextField
  //   id="outlined-basic"
  //   label="Outlined"
  //   variant="outlined"
  //   ref={register}
  //   defaultValue={employer}
  // />

  // <label for="jobTitle">Job Title</label>
  //       <input name="jobTitle" ref={register} defaultValue={jobtitle} />

  /* <label for="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          ref={register}
          defaultValue={startDate}
        />
 */

  /* <label for="endDate">End Date (if applicable)</label>
<input
  type="date"
  name="endDate"
  ref={register}
  defaultValue={endDate}
/> */

  /* <label for="description">Description</label>
        <textarea
          name="description"
          ref={register}
          defaultValue={description}
        ></textarea> */

  return (
    <div>
      <ModalOverlay
        visible={visible}
        onClose={() => setEditJourney(false)}
        onSave={handleSubmit(submitJourney)}
        header={"Edit Journey Entry"}
      >
        <form className="form-container">
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
            <label className="form-label" for="startDate">
              Start Date
            </label>
            <Controller
              name="startDate"
              as={<input className="date-input" type="date" />}
              control={control}
              defaultValue={startDate}
            />
          </FormControl>
          <FormControl variant="outlined" style={{ margin: 8 }}>
            <label className="form-label" for="endDate">
              End Date (if applicable)
            </label>
            <Controller
              name="endDate"
              as={<input className="date-input" type="date" />}
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
