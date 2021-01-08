import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButtons from "../Buttons/iconButton";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function EditTimeline({
  item,
  startDate,
  endDate,
  lastItem,
  index,
  editIcon,
  deleteIcon,
  handleEditClick,
  handleDeleteClick,
  edit,
}) {
  const classes = useStyles();

  const { employer, jobtitle, description } = item;

  //   <label for="employer">Employer</label>
  //         <input name="employer" ref={register} defaultValue={employer} />

  //         <label for="jobTitle">Job Title</label>
  //         <input name="jobTitle" ref={register} defaultValue={jobtitle} />

  //         <label for="startDate">Start Date</label>
  //         <input
  //           type="date"
  //           name="startDate"
  //           ref={register}
  //           defaultValue={startDate}
  //         />

  //         <label for="endDate">End Date (if applicable)</label>
  //         <input
  //           type="date"
  //           name="endDate"
  //           ref={register}
  //           defaultValue={endDate}
  //         />

  //         <label for="description">Description</label>
  //         <textarea
  //           name="description"
  //           ref={register}
  //           defaultValue={description}
  //         ></textarea>

  //         <input type="submit" value="Submit" />

  return (
    <TimelineItem>
      <TimelineOppositeContent>
        {endDate && (
          <Typography variant="body2" color="textSecondary">
            Completed: {endDate}
          </Typography>
        )}
        <br />
        <Typography variant="body2" color="textSecondary">
          Started: {startDate}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        {index === lastItem ? (
          <TimelineDot color="primary">
            <HomeRoundedIcon />
          </TimelineDot>
        ) : (
          <TimelineDot color="primary" variant="outlined">
            <GradeRoundedIcon />
          </TimelineDot>
        )}
        {index !== lastItem && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
            {jobtitle}
          </Typography>
          <Typography>@ {employer}</Typography>
          <Typography>{description}</Typography>
          {edit && (
            <IconButtons icon={editIcon} handleClick={handleEditClick} />
          )}
          {edit && (
            <IconButtons icon={deleteIcon} handleClick={handleDeleteClick} />
          )}
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
