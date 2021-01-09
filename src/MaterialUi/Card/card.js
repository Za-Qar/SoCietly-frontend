// React and Material ui
import React from "react";
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

// Cloudinary
import { Image } from "cloudinary-react";

// Styling
import "./card.css";

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

export default function EventCard({ key, date, item }) {
  /*--------Props--------*/
  const {
    attendinglist,
    description,
    enablevolunteers,
    eventname,
    eventtype,
    id,
    image,
    likes,
    location,
    time,
    uid,
    volunteerlist,
  } = item;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  console.log(image);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={eventname}
        subheader={date}
      />
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
          <br /> <br />
          {attendinglist}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
        </CardContent>
      </Collapse>
    </Card>
  );
}
