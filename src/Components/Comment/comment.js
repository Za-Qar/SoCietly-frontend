import React from "react";

// React Router Dom
import { Link } from "react-router-dom";

// User context
import { useUserContext } from "../../Context/userContext";

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
    likes,
  } = comments;
  console.log(comments);
  /*--------User context--------*/
  const [user] = useUserContext();

  if (user) {
    return (
      <div>
        <Link to={`/bootcamper/${commentuserid}`}>
          <img src={profileimage} />
          <p>
            {name} {surname}
          </p>
        </Link>
        <p>{comment}</p>
        <p>{timedate}</p>
        <p>{likes.length}</p>
      </div>
    );
  }
}
