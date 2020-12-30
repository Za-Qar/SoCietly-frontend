import { useEffect, useState } from "react";

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
    jobUpdates && (
      <div>
        <h4>Job Updates</h4>
        {jobUpdates.map((item, index) => {
          return (
            <div key={index}>
              <h5>{item.startdate}</h5>
              <img
                width="50px"
                src={item.profileimage}
                alt={`${item.name} profile`}
              />
              <p>
                🎉 {item.name} {item.surname} started a new job at{" "}
                {item.employer} as a {item.jobtitle}!
              </p>
            </div>
          );
        })}
      </div>
    )
  );
}
