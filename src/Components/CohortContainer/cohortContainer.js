import UserInfo from "../../Components/UserInfo/userinfo";
import style from "./cohort.module.css";
import cn from "classnames";

export default function CohortContainer({ allAlumni, cohortValue }) {
  return (
    <div className={cn(style.cohortContainer)}>
      <div className={cn(style.modalHeader)}>
        <h3>Cohort {cohortValue}</h3>
      </div>
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
