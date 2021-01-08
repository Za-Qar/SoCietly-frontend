// React
import { useState } from "react";

//styling
import style from "./journey.module.css";

//Components
import EditJourney from "../EditUserJourney/editUserJourney";

// Luxon (Date/Time Module)
import { DateTime } from "luxon";

// Material UI
import CustomizedTimeline from "../../MaterialUi/Timeline/timeline";
import Timeline from "@material-ui/lab/Timeline";

export default function UserJourney({ showJourneyEdit, user, setUser }) {
  // Edit Journey State
  const [editJourney, setEditJourney] = useState(false);
  const [journeyIndex, setJourneyIndex] = useState(null);

  const { journey } = user;

  function deleteJourney(id) {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      fetch(`https://falcon5ives.herokuapp.com/journeys/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log("this is the user data: ", data))
        .then(() => setUser(null))
        .catch((error) => console.log("user creation error error: ", error));
    }
  }

  return (
    <div>
      <h3>My Journey</h3>
      <Timeline>
        {journey &&
          journey.map((item, index) => {
            // Format start date
            const sdt = DateTime.fromISO(item.startdate);
            const newStartDate = sdt.toISODate();

            // Format end date
            const edt = DateTime.fromISO(item.enddate);
            const newEndDate = edt.toISODate();

            return editJourney && journeyIndex === index ? (
              <div key={index}>
                <EditJourney
                  journeyItem={item}
                  startDate={newStartDate}
                  endDate={newEndDate}
                  setEditJourney={setEditJourney}
                  setJourneyIndex={setJourneyIndex}
                />
                <button onClick={() => setEditJourney(!editJourney)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div key={index}>
                <CustomizedTimeline
                  item={item}
                  startDate={newStartDate}
                  endDate={newEndDate}
                  lastItem={journey.length - 1}
                  index={index}
                />
                {showJourneyEdit && (
                  <div>
                    <button
                      onClick={() => {
                        setJourneyIndex(index);
                        setEditJourney(!editJourney);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteJourney(item.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </Timeline>
    </div>
  );
}
