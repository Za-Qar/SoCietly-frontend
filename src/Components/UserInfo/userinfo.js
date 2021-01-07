import SocialMedia from "../UserSocial/social";

//styling
import style from "./userInfo.module.css";

export default function UserInfo({ user, homepageEdit }) {
  const {
    username,
    email,
    cohort,
    currentRole,
    currentEmployer,
    social,
  } = user;

  return (
    user && (
      <div>
        <h3>{username}</h3>
        {!homepageEdit && <h4>Cohort {cohort}</h4>}
        <h4 className={style.h4}>{currentRole} at</h4>
        <h4 className={style.h4}>{currentEmployer}</h4>
        {!homepageEdit && <h5>{email}</h5>}
        {!homepageEdit && <SocialMedia social={social} />}
      </div>
    )
  );
}
