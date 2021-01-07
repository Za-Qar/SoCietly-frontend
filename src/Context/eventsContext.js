// //React
// import { useContext, createContext, useState } from "react";

// const EventsContext = createContext(null);

// export function UserProvider({ children }) {
//   const [events, setEvents] = useState(null);

//   const [allEvents, setAllEvents] = useState([]);
//   // set all events

//   /*---------------------events Test---------------------*/

//   useEffect(() => {
//     if (authUser && userData && allEvents) {
//       async function getEvents() {
//         let res = await fetch("https://falcon5ives.herokuapp.com/events");
//         let data = await res.json();
//         setAllEvents(data.payload);
//       }
//       getEvents();
//     }
//   }, [authUser]);

//   useEffect(() => {
//     if (authUser && userData && allEvents) {
//       const gettingAllEvents = {
//         eventName: events.eventName,
//         eventType: events.eventType,
//         date: events.date,
//         time: events.time,
//         uid: events.uid,
//         description: events.description,
//         image: events.image,
//         location: events.location,
//         enableVolunteers: events.enableVolunteers,
//         attendingList: events.attendingList,
//         likes: events.likes,
//         volunteerList: events.volunteerList,
//       };
//       setEvents(gettingAllEvents);
//     }
//   }, [allEvents]);

//   /*---------------------FINISH events Test---------------------*/

//   return (
//     <EventsContext.Provider value={[events, setEvents]}>
//       {children}
//     </EventsContext.Provider>
//   );
// }

// export function useEventsContext() {
//   return useContext(EventsContext);
// }
