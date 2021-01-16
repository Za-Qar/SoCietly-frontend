// React and Material ui
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import PanToolIcon from "@material-ui/icons/PanTool";
import CommentIcon from "@material-ui/icons/Comment";

//Config
import { url } from "../../config";

// Comp
import Maps from "../../Components/Maps/maps.js";
import CreateEvent from "../../Pages/CreateEvent/createEvent.js";
import UserImage from "../../Components/userImage/userImage.js";
import Comments from "../../Components/Comments/comments.js";

// Cloudinary
import { Image } from "cloudinary-react";

// Styling
import "./card.css";
import cn from "classnames";

// User context
import { useUserContext } from "../../Context/userContext";

// Local svg
import attendingIcon from "../../Images/checking-attendance.svg";

// React Router Dom
import { Link } from "react-router-dom";

// React confrim-alert box
import { confirmAlert } from "react-confirm-alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    backgroundColor: "white",
  },
  media: {
    height: 0,
    paddingTop: "30%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function EventCard({
  key,
  date,
  item,
  myEvents,
  fetchUserEvents,
  userLeftSide,
}) {
  /*--------Props--------*/
  const {
    attendinglist,
    description,
    enablevolunteers,
    eventname,
    eventtype,
    image,
    likes,
    location,
    time,
    uid,
    volunteerlist,
    eventid,
    eventlink,

    name,
    surname,
    profileimage,
    id,
    cohort,
  } = item;

  const eventUser = {
    profileimage: profileimage,
    name: name,
    cohort: cohort,
    id: id,
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  /*--------User context--------*/
  const [user] = useUserContext();

  /*--------Maps marker state--------*/
  const [marker, setMarker] = useState(JSON.parse(location));

  //To show and hide createEvents
  const [hide, setHide] = useState("hide");
  const [hideCard, setHideCard] = useState("");

  // Comments
  const [hideComment, setHideComment] = useState("hide");
  const [commentColour, setCommentColour] = useState("");

  const [attentingGet, setAttedingGet] = useState([]);
  const [attendingYellow, setAttendingYellow] = useState("");

  // const [like, setLike] = useState(0);
  const [redLike, setRedLike] = useState("");
  const [likeGet, setLikeGet] = useState([]);
  const [propLike, setPropLike] = useState([]);

  function getAttenting() {
    setAttedingGet(attendinglist);
    setPropLike(likes);
    setLikeGet(propLike);
  }
  useEffect(() => {
    getAttenting();
  }, []);

  /*---------------Add to Attend Patch----------------*/
  let addToAttend = (eventid, arr) => {
    fetch(`${url}/events/${eventid}`, {
      method: "PATCH",
      body: JSON.stringify({ attendingList: arr }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  function addToAttending() {
    for (let i = 0; i <= attendinglist.length; i++) {
      if (attendinglist[i] === `${user.username}`) {
        return alert("You've already declared you're attending :)");
      }
    }
    let attending = [...attendinglist, `${user.username}`];

    setAttedingGet(attending);
    setAttendingYellow("yellow");
    addToAttend(eventid, attending);
    // setUserEvents(null);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Send email function
  async function deleteEmail() {
    await fetch(`${url}/mail`, {
      method: "POST",
      body: JSON.stringify({
        to: ["za.qa@outlook.com", "qarout.zaid@gmail.com"],
        subject: `SoC: Event canceled, ${eventname}`,
        text: `The event created by ${user.username} has been deleted. Apologies of any inconvinienced this may have caused. You can view visit SoCietly here: https://societly.netlify.app`,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) =>
        console.log("this is the delete event email data: ", data)
      )
      .catch((error) => console.log("delete event email error: ", error));
  }

  // Delete Event
  async function deleteEvent(eventId) {
    //linting rule which is why confirm doesn't work.
    //I can still window.confirm
    confirmAlert({
      title: "Are you sure you want to delete this event?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("delete", eventId);
            setHideCard("hide");

            fetch(`${url}/events/${eventid}`, {
              method: "delete",
            })
              .then((res) => res.json())
              .then((data) => console.log(data))
              .then(() => deleteEmail())
              .catch((error) => console.log(error));
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  /*---------------Add to Like Patch----------------*/
  let addToLike = (eventid, arr) => {
    console.log(eventid, arr);
    fetch(`${url}/events/${eventid}`, {
      method: "PATCH",
      body: JSON.stringify({ likes: arr }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  // Add likes
  /*
  - If person's is not in the array, then add is
  - If person's name is in the array then remove it
  */
  function addLikes() {
    if (propLike?.includes(user.username)) {
      let index = propLike.indexOf(user.username);
      let removeLike = [
        ...propLike.slice(0, index),
        ...propLike.slice(index + 1),
      ];
      setLikeGet(removeLike);
      setPropLike(removeLike);
      setRedLike("");

      addToLike(eventid, removeLike);
    } else {
      let likesArr = [...propLike, `${user.username}`];

      setLikeGet(likesArr);
      setPropLike(likesArr);
      setRedLike("red");
      addToLike(eventid, likesArr);
    }
  }

  // Setting icon colours
  function setIconColour() {
    if (attendinglist?.includes(user.username)) {
      setAttendingYellow("yellow");
    }
    if (likes?.includes(user.username)) {
      setRedLike("red");
    }
    return;
  }

  useEffect(() => {
    setIconColour();
  }, [attentingGet, likeGet]);

  function showComment() {
    if (hideComment === "hide") {
      setHideComment("");
      setCommentColour("commentColour");
    } else {
      setHideComment("hide");
      setCommentColour("");
    }
  }

  if (!userLeftSide) {
    return (
      <Card className={cn(classes.root, hideCard)}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <UserImage user={eventUser} width={"100%"} />
            </Avatar>
          }
          title={
            <Link to={`/bootcamper/${id}`} className="cardName">
              {name} {surname}
            </Link>
          }
        />
        <div className="cardContainer2 cardTitle">
          <Link to={`/event/${eventid}`}>{eventname}</Link>
          <br />
          <p>{date}</p>
        </div>

        <div className="cardContainer">
          <Image
            key={key}
            cloudName="falcons"
            publicId={image}
            width="1500"
            crop="scale"
            className="img"
          />
        </div>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            People attending this event:
            <br />
            {attendinglist?.includes(user?.username)
              ? `${attentingGet?.join(", ")}`
              : attentingGet?.join(", ")}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={addLikes}>
            <FavoriteIcon className={redLike} />
            {propLike?.length}
          </IconButton>
          <IconButton>
            <HowToRegIcon
              onClick={addToAttending}
              className={attendingYellow}
            />
            {/* {attendinglist?.length} */}
            {attentingGet?.length}
          </IconButton>
          {myEvents && (
            <IconButton
              onClick={() =>
                hide === "hide" ? setHide("show") : setHide("hide")
              }
            >
              <EditIcon />
            </IconButton>
          )}

          {myEvents && (
            <IconButton
              onClick={() => {
                deleteEvent(eventid);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          )}

          <IconButton onClick={() => showComment()}>
            <CommentIcon className={commentColour} />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
            {eventlink && (
              <div>
                <h3>Event Link:</h3>
                <a href={eventlink}>
                  <Typography paragraph>{eventlink}</Typography>
                </a>
              </div>
            )}
            {!eventlink && <Maps marker={marker} setMarker={setMarker} />}
          </CardContent>
        </Collapse>

        <section className={`${hideComment} commentContainer`}>
          <Comments eventid={eventid} />
        </section>

        <section className={hide}>
          <CreateEvent
            attendinglist={attendinglist}
            date={date}
            description={description}
            enablevolunteers={enablevolunteers}
            eventname={eventname}
            eventtype={eventtype}
            id={id}
            image={image}
            likes={likes}
            location={location}
            time={time}
            uid={uid}
            volunteerlist={volunteerlist}
            eventsEdit
            eventId={eventid}
            userId={user?.uid}
            hide={hide}
            setHide={setHide}
            fetchUserEvents={fetchUserEvents}
            editEvent
          />
        </section>
      </Card>
    );
  } else if (userLeftSide) {
    return (
      <div className="attendingContainer">
        <Card className={cn(classes.root, hideCard)}>
          <div className="cardContainer attendingStyle">
            <Link to={`/event/${eventid}`}>{eventname}</Link>
            <br />
            <p>{date}</p>
          </div>
        </Card>
      </div>
    );
  }
}
