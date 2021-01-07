import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";

//link
import { Link } from "react-router-dom";

import UserImage from "../userImage/userImage";

export default function UserInfo({ user, link, homepageEdit }) {
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

        {!homepageEdit && <h4>Cohort {cohort}</h4>}
        <h4 className={style.h4}>
          {currentRole ? currentRole : currentrole} at
        </h4>
        <h4 className={style.h4}>
          {currentEmployer ? currentEmployer : currentemployer}
        </h4>
        {!homepageEdit && <h5>{email}</h5>}
        {!homepageEdit && <SocialMedia social={social} />}
      </div>
    )
  );
}
