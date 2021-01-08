import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import EmojiEventsRoundedIcon from "@material-ui/icons/EmojiEventsRounded";
import FiberNewRoundedIcon from "@material-ui/icons/FiberNewRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
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
