import SocialMedia from "../UserSocial/social";

export default function UserInfo({ user }) {
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
        <h4>Cohort {cohort}</h4>
        <h4>{currentRole}</h4>
        <h4>{currentEmployer}</h4>
        <h5>{email}</h5>
        <SocialMedia social={social} />
      </div>
    )
  );
}
