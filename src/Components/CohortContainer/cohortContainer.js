import UserInfo from "../../Components/UserInfo/userinfo";
import style from "./cohort.module.css";
import cn from "classnames";

export default function CohortContainer({ allAlumni, cohortValue }) {
  function getCohortStyle(cohort) {
    switch (cohort) {
      case 1:
        return style.cohort1;

      case 2:
        return style.cohort2;

      case 3:
        return style.cohort3;

      case 4:
        return style.cohort4;

      case 5:
        return style.cohort5;

      default:
        return style.defaultCohort;
    }
  }

  return (
    <div className={cn(style.cohortContainer)}>
      <div className={cn(style.modalHeader, getCohortStyle(cohortValue))}>
        <h3>Cohort {cohortValue}</h3>
      </div>
      <div className={style.alumniContainer}>
        {allAlumni &&
          allAlumni.map((item, index) => {
            if (item.cohort === cohortValue) {
              return (
                <div key={item.name}>
                  {/* <UserImage user={item} /> */}
                  <UserInfo
                    link={true}
                    key={index}
                    user={item}
                    alumni
                    centre={false}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
