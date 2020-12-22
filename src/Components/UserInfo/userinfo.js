export default function UserInfo({ user }) {
  const { name, email, cohort, currentRole, currentEmployer } = user;
  return (
    user && (
      <div>
        <h3>{name}</h3>
        <h4>Cohort {cohort}</h4>
        <h4>{currentRole}</h4>
        <h4>{currentEmployer}</h4>

        <h5>{email}</h5>
        {/*Social Media Links*/}
      </div>
    )
  );
}
