import { useEffect, useState } from "react";

//Config
import { url } from "../../config";

// Components
import UserImage from "../../Components/userImage/userImage";

// Luxon (Date/Time Module)
import { DateTime } from "luxon";

//styling
import style from "./jobUpdates.module.css";

export default function JobUpdates() {
  const [jobUpdates, setJobUpdates] = useState();
  // An array of objects containing user journey information

  useEffect(() => {
    async function getJobUpdates() {
      let res = await fetch(`${url}/userjourneys`);
      let data = await res.json();
      setJobUpdates(data.payload);
    }

    getJobUpdates();

    setInterval(() => {
      getJobUpdates();
    }, 1800000);
    // fetches job updates every 30 minutes
  }, []);

  return (
    <div className={style.jobSec}>
      <h4 className={style.secTitle}>Job Updates</h4>
      {jobUpdates &&
        jobUpdates.map((item, index) => {
          // Format start date
          const sdt = DateTime.fromISO(item.startdate);
          const newStartDate = sdt.toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY
          );

          return (
            index < 49 && (
              <div key={index} className={style.newJobSec}>
                <div style={{ marginTop: "1rem" }}>
                  <UserImage user={item} alt={`${item.name} profile`} />
                </div>
                <div className={style.textAlignLeft}>
                  <div class={style.hoverme}>
                    <span>🎉</span>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                  <p className={style.name}>
                    {item.name} {item.surname} started a new job!
                  </p>
                  <h5 style={{ margin: "0" }}>
                    {" "}
                    {item.jobtitle} at {item.employer}
                  </h5>
                  <h5 className={style.date}>{newStartDate}</h5>
                </div>
              </div>
            )
          );
        })}
    </div>
  );
}
