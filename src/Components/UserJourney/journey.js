// React
import { useState } from "react";

//styling
import style from "./journey.module.css";

//Components
import EditJourney from "../EditUserJourney/editUserJourney";

// Luxon (Date/Time Module)
import { DateTime } from "luxon";

export default function UserJourney({ user }) {
  // Edit Journey State
  const [editJourney, setEditJourney] = useState(false);

  const { journey } = user;

  // if (editJourney) {
  //   return (
  //     <div>
  //       <EditJourney />
  //       <button onClick={() => setEditJourney(!editJourney)}>Cancel</button>
  //     </div>
  //   );
  // }

  // function editUserJourney(id){

  // }

  return (
    <div>
      <h3>My Journey</h3>
      {journey &&
        journey.map((item, index) => {
          // Format start date
          const sdt = DateTime.fromISO(item.startdate);
          const newStartDate = sdt.toISODate();

          // Format end date
          const edt = DateTime.fromISO(item.enddate);
          const newEndDate = edt.toISODate();

          return !editJourney ? (
            <div key={index}>
              <h4>{item.jobtitle}</h4>
              <h5>{item.employer}</h5>
              {newEndDate && <h5>Completed: {newEndDate}</h5>}
              <h5>Started: {newStartDate}</h5>
              <p>{item.description}</p>
              <button onClick={() => setEditJourney(!editJourney)}>Edit</button>
            </div>
          ) : (
            <div>
              <EditJourney
                journeyItem={item}
                startDate={newStartDate}
                endDate={newEndDate}
                setEditJourney={setEditJourney}
              />
              <button onClick={() => setEditJourney(!editJourney)}>
                Cancel
              </button>
            </div>
          );
        })}
    </div>
  );
}
