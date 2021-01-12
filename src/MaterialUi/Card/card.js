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

//Config
import { url } from "../../config";

// Comp
import Maps from "../../Components/Maps/maps.js";
import CreateEvent from "../../Pages/CreateEvent/createEvent.js";
import UserImage from "../../Components/userImage/userImage.js";

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
    backgroundColor: "#F0F7F4",
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
  setUserEvents,
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
  console.log(item);
  console.log(attendinglist);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  /*--------User context--------*/
  const [user] = useUserContext();

  /*--------Maps marker state--------*/
  const [marker, setMarker] = useState(JSON.parse(location));

  //To show and hide createEvents
  const [hide, setHide] = useState("hide");
  const [hideCard, setHideCard] = useState("");

  const [attentingGet, setAttedingGet] = useState([]);
  const [like, setLike] = useState(0);
  const [redLike, setRedLike] = useState("");
  const [attendingYellow, setAttendingYellow] = useState("");

  function getAttenting() {
    setAttedingGet(attendinglist);
  }
  useEffect(() => {
    getAttenting();
  }, []);

  /*---------------Add to Attend Patch----------------*/
  let addToAttend = (eventid, arr) => {
    console.log(eventid, arr);
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
        return alert("You've already decalred you're attending :)");
      }
    }
    let attending = [...attendinglist, `${user.username}`];
    console.log(attending);
    setAttedingGet(attending);
    setAttendingYellow("yellow");
    addToAttend(eventid, attending);
    // setUserEvents(null);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Delete Event
  async function deleteEvent(eventId) {
    console.log("clicked");
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
              // .then(() => setUserEvents(null))
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

  // Add likes
  function addLikes() {
    console.log(like);
    setLike(like + 1);
    redLike === "" ? setRedLike("red") : setRedLike("red");
    // backEndLike(like, id);
    // setUserEvents(null);
  }

  function attendingColour() {
    // return attendinglist?.includes(user.username)
    //   ? setAttendingYellow("yellow")
    //   : setAttendingYellow("");
    if (attendinglist?.includes(user.username)) {
      setAttendingYellow("yellow");
    }
    return;
  }

  useEffect(() => {
    attendingColour();
  }, [attentingGet]);

  return (
    <Card className={cn(classes.root, hideCard)}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <UserImage user={eventUser} width={"100%"} />
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <Link to={`/bootcamper/${id}`} className="cardName">
            {name} {surname}
          </Link>
        }
        // subheader={date}
      />
      <div className="cardContainer cardTitle">
        <Link to={`/event/${eventid}`}>{eventname}</Link>
        <br />
        <p>{date}</p>
      </div>

      <div className="cardContainer">
        <Image
          key={key}
          cloudName="falcons"
          publicId={image}
          width="300"
          crop="scale"
          className="img"
        />
      </div>
      {/* <CardMedia
        className={classes.media}
        image={
          <Image
            key={key}
            cloudName="falcons"
            publicId={image}
            width="300"
            crop="scale"
          />
        }
        title="Paella dish"
      /> */}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          People attending this event:
          <br />
          {attendinglist?.includes(user?.username)
            ? "You"
            : attentingGet?.join(", ")}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={addLikes}>
          <FavoriteIcon className={redLike} />
          {like}
        </IconButton>
        <IconButton>
          <HowToRegIcon onClick={addToAttending} className={attendingYellow} />
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
        />
      </section>
    </Card>
  );
}
