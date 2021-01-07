import UserInfo from "../../Components/UserInfo/userinfo";

export default function CohortContainer({ allAlumni, cohortValue }) {
  return (
    <div>
      <h3>Cohort {cohortValue}</h3>
      {allAlumni &&
        allAlumni.map((item, index) => {
          if (item.cohort === cohortValue) {
            return (
              <div key={item.name}>
                {/* <UserImage user={item} /> */}
                <UserInfo link={item} key={index} user={item} />
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}
