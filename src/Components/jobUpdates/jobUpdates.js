import { useEffect, useState } from "react";

export default function JobUpdates() {
  const [jobUpdates, setJobUpdates] = useState();
  // An array of objects containing user journey information

  useEffect(() => {
    async function getJobUpdates() {
      let res = await fetch(`https://falcon5ives.herokuapp.com/journeys`);
      let data = await res.json();
      console.log(data.payload);
    }
    getJobUpdates();
  }, [jobUpdates]);

  return <div></div>;
}
