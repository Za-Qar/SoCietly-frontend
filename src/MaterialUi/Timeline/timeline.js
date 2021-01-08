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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline({
  item,
  startDate,
  endDate,
  lastItem,
  index,
}) {
  const classes = useStyles();

  const { employer, jobtitle, description } = item;

  // <div key={index}>
  //             <h4>{item.jobtitle}</h4>
  //             <h5>@ {item.employer}</h5>
  //             {newEndDate && <h5>Completed: {newEndDate}</h5>}
  //             <h5>Started: {newStartDate}</h5>
  //             <p>{item.description}</p>
  //             {showJourneyEdit && (
  //               <div></div>

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
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
