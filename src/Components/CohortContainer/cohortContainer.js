import UserInfo from "../../Components/UserInfo/userinfo";
import style from "./cohort.module.css";

export default function CohortContainer({ allAlumni, cohortValue }) {
  return (
    <div>
      <h3>Cohort {cohortValue}</h3>
      <div className={style.alumniContainer}>
        {allAlumni &&
          allAlumni.map((item, index) => {
            if (item.cohort === cohortValue) {
              return (
                <div key={item.name}>
                  {/* <UserImage user={item} /> */}
                  <UserInfo link={true} key={index} user={item} alumni />
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
