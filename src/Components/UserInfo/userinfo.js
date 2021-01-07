import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";

//link
import { Link } from "react-router-dom";

import { useProfileContext } from "../../Context/profileContext";
import UserImage from "../userImage/userImage";

export default function UserInfo({ user, link, homepageEdit }) {
  const [profile, setProfile] = useProfileContext();

  const {
    username,
    name,
    surname,
    email,
    cohort,
    currentRole,
    currentEmployer,
    social,
  } = user;

  return (
    user && (
      <div>
        {link ? (
          <Link to="/bootcamper">
            <UserImage
              user={user}
              onClick={() => {
                setProfile(user);
              }}
            />
            <h3
              onClick={() => {
                setProfile(user);
              }}
            >
              {username ? username : `${name} ${surname}`}
            </h3>
          </Link>
        ) : (
          <h3>{username ? username : `${name} ${surname}`}</h3>
        )}
        {!homepageEdit && <h4>Cohort {cohort}</h4>}
        <h4 className={style.h4}>{currentRole} at</h4>
        <h4 className={style.h4}>{currentEmployer}</h4>
        {!homepageEdit && <h5>{email}</h5>}
        {!homepageEdit && <SocialMedia social={social} />}
      </div>
    )
  );
}
