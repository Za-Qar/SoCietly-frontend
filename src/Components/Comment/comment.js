import React from "react";

// React Router Dom
import { Link } from "react-router-dom";

// User context
import { useUserContext } from "../../Context/userContext";

// Components
import UserImage from "../userImage/userImage.js";

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
  console.log(comments);

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
      <div>
        {/* <UserImage user={userImageUser}/> */}
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
