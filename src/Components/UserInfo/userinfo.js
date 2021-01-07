import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";

//link
import { Link } from "react-router-dom";

import { useProfileContext } from "../../Context/profileContext";
import UserImage from "../userImage/userImage";

export default function UserInfo({ user, link }) {
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
        <h4>Cohort {cohort}</h4>
        <h4>{currentRole}</h4>
        <h4>{currentEmployer}</h4>
        <h5>{email}</h5>
        <SocialMedia social={social} />
      </div>
    )
  );
}
