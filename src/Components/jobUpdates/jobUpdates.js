import { useEffect, useState } from "react";

//styling
import style from "./jobUpdates.module.css";

export default function JobUpdates() {
  const [jobUpdates, setJobUpdates] = useState();
  // An array of objects containing user journey information
  console.log(jobUpdates);

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
          return (
            <div key={index}>
              <h5>{item.startdate}</h5>
              <img
                width="50px"
                src={item.profileimage}
                alt={`${item.name} profile`}
              />
              <p>
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
