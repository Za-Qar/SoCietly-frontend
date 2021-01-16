import React from "react";

// React Router Dom
import { Link } from "react-router-dom";

// User context
import { useUserContext } from "../../Context/userContext";

// Components
import UserImage from "../userImage/userImage.js";

// Styling
import style from "./comment.module.css";
import cn from "classnames";

export default function Comment({ id, comments }) {
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
        <p className={style.likes}>{likes.length}</p>
      </div>
    );
  }
}
