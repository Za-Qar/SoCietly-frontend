import React, { useState, useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// User context
import { useUserContext } from "../../Context/userContext";

// Components
import UserImage from "../userImage/userImage.js";

// Styling
import style from "./comment.module.css";
import cn from "classnames";

// Material ui
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function Comment({ id, comments, newCommentId }) {
  const {
    commentid,
    commentuserid,
    name,
    surname,
    timedate,
    commenteventid,
    profileimage,
    comment,
    cohort,
    likes,
  } = comments;

  // Formating dateTime
  const commentDateTime = new Date(timedate);
  const displayDate = commentDateTime.toLocaleDateString();
  const displayTime = commentDateTime.toLocaleTimeString();

  let userImageUser = {
    profileimage: profileimage,
    profileImage: profileimage,
    name: `${name} ${surname}`,
    cohort: cohort,
    id: commentuserid,
    uid: commentuserid,
  };
  /*--------User context--------*/
  const [user] = useUserContext();

  let commendIdForPatch = newCommentId ? newCommentId : commentid;

  // Likes
  const [redLike, setRedLike] = useState("");
  const [likeGet, setLikeGet] = useState([]);
  const [propLike, setPropLike] = useState([]);

  useEffect(() => {
    setPropLike(likes);
    setLikeGet(propLike);
  }, []);

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

      addToLike(removeLike);
    } else {
      let likesArr = [...propLike, `${user.username}`];

      setLikeGet(likesArr);
      setPropLike(likesArr);
      setRedLike("red");
      addToLike(likesArr);
    }
  }

  /*---------------Add to Like Patch----------------*/
  let addToLike = (arr) => {
    console.log(arr);
    fetch(`http://localhost:3000/comments/${commendIdForPatch}`, {
      method: "PATCH",
      body: JSON.stringify({ likes: arr }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  if (user) {
    return (
      <div className="contentContainer">
        <div className={style.row}>
          <div className={style.column1}>
            <UserImage user={userImageUser} />
          </div>
          <div className={style.column2}>
            <Link to={`/bootcamper/${commentuserid}`}>
              <p>
                {name} {surname}
              </p>
            </Link>
            <p>{`${displayDate} - ${displayTime}`}</p>
          </div>
        </div>
        <p className={style.comment}>{comment}</p>
        <IconButton
          aria-label="add to favorites"
          onClick={addLikes}
          className={style.likes}
        >
          <FavoriteIcon className={redLike} />
          {propLike?.length}
        </IconButton>
        {/* <p className={style.likes}>{likes.length}</p> */}
      </div>
    );
  }
}
