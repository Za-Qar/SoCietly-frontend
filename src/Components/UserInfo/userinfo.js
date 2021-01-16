import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";
import cn from "classnames";

//link
import { Link, NavLink } from "react-router-dom";

import UserImage from "../userImage/userImage";

export default function UserInfo({ user, link, homepageEdit, alumni, width }) {
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
      <div className={cn(style.container, alumni && style.infoMaxWidth)}>
        {link ? (
          <NavLink
            to={`/bootcamper/${id ? id : uid}`}
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{ textDecoration: "none", color: "black" }}
          >
            <UserImage user={user} width={width} />
            <h3>{username ? username : `${name} ${surname}`}</h3>
          </NavLink>
        ) : (
          <h3>{username ? username : `${name} ${surname}`}</h3>
        )}

        {!homepageEdit && <h4 className={style.cohortText}>Cohort {cohort}</h4>}
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
