import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";

//link
import { Link } from "react-router-dom";

import UserImage from "../userImage/userImage";

export default function UserInfo({ user, link }) {
  const {
    uid,
    id,
    username,
    name,
    surname,
    email,
    cohort,
    currentRole,
    currentrole,
    currentEmployer,
    currentemployer,
    social,
  } = user;

  return (
    user && (
      <div>
        {link ? (
          <Link to={`/bootcamper/${id ? id : uid}`}>
            <UserImage user={user} />
            <h3>{username ? username : `${name} ${surname}`}</h3>
          </Link>
        ) : (
          <h3>{username ? username : `${name} ${surname}`}</h3>
        )}
        <h4>Cohort {cohort}</h4>
        <h4>{currentRole ? currentRole : currentrole}</h4>
        <h4>{currentEmployer ? currentEmployer : currentemployer}</h4>
        <h5>{email}</h5>
        <SocialMedia social={social} />
      </div>
    )
  );
}
