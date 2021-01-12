import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";
import cn from "classnames";

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
      <div className={cn(style.container)}>
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
        {!homepageEdit && (
          <a className={style.anchor} href={`mailto:${email}`}>
            <h5>{email}</h5>
          </a>
        )}
        {!homepageEdit && <SocialMedia social={social} />}
      </div>
    )
  );
}
