import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BootcamperProfilePage from "../../Pages/BootcamperProfile/Bootcamper";

// Components
import UserImage from "../../Components/userImage/userImage";

import { useProfileContext } from "../../Context/profileContext";

// Luxon (Date/Time Module)
import { DateTime } from "luxon";

//styling
import style from "./jobUpdates.module.css";

export default function JobUpdates() {
  const [jobUpdates, setJobUpdates] = useState();
  // An array of objects containing user journey information

  const [profile, setProfile] = useProfileContext();

  useEffect(() => {
    async function getJobUpdates() {
      let res = await fetch(`https://falcon5ives.herokuapp.com/userjourneys`);
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
    <div>
      <h4>Job Updates</h4>
      {jobUpdates &&
        jobUpdates.map((item, index) => {
          // Format start date
          const sdt = DateTime.fromISO(item.startdate);
          const newStartDate = sdt.toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY
          );
          console.log(item);

          return (
            <div key={index}>
              <h5>{newStartDate}</h5>
              <Link to="/bootcamper">
                <UserImage
                  onClick={() => {
                    setProfile(item);
                  }}
                  user={item}
                  alt={`${item.name} profile`}
                />
              </Link>
              <p
                onClick={() => {
                  setProfile(item);
                }}
              >
                🎉 {item.name} {item.surname} started a new job!
              </p>
              <h5>
                {" "}
                {item.jobtitle} at {item.employer}
              </h5>
            </div>
          );
        })}
    </div>
  );
}
