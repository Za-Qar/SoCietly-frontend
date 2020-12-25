import { useUserContext } from "../../Context/userContext";

function Event() {
  const [user] = useUserContext();
  return (
    <form>
      <button onClick={console.log(user)}>Get User</button>
      <span>
        <p>Event Name:</p>
        <input />
      </span>
      <span>
        <p>Event Type:</p>
        <select id="cars" name="events">
          <option value="education">Education</option>
          <option value="social">Social</option>
          <option value="community">Community</option>
        </select>
      </span>
      <span>
        <p>Date:</p>
        <input type="date" />
      </span>
      <span>
        <p>Time:</p>
        <input type="time" />
      </span>
      <span>
        <p>Description:</p>
        <textarea name="description" rows="10" cols="30"></textarea>
      </span>
      <span>
        <p>Event Name:</p>
        <input />
      </span>
    </form>
  );
}

export default Event;

// {
//     "eventName":"Event 3",
//     "eventType":"Educational",
//     "date":"2000/10/19",
//     "time": "17:50:00",
//     "uid": "2",

//     "description":"Desc 2",
//     "image":"com.jpg",
//     "location":"somewhere",
//     "enableVolunteers":"true",
//     "attendingList":"[{name: Laura, email: none of your bees wax}, {name: Luke, email: something}]",
//     "likes":"927",
//     "volunteerList":"intro stuff comes here"
// }
