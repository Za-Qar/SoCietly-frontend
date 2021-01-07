import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";

export default function UserInfo({ user }) {
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
        <h3>{username ? username : `${name} ${surname}`}</h3>
        <h4>Cohort {cohort}</h4>
        <h4>{currentRole}</h4>
        <h4>{currentEmployer}</h4>
        <h5>{email}</h5>
        <SocialMedia social={social} />
      </div>
    )
  );
}
