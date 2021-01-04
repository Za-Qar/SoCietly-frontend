//styling
import style from "./journey.module.css";

export default function UserJourney({ user }) {
  const { journey } = user;
  return (
    <div>
      <h3>My Journey</h3>
      {journey &&
        journey.map((item, index) => {
          return (
            <div key={index}>
              <h4>{item.jobTitle}</h4>
              <h5>{item.employer}</h5>
              <h5>{item.startDate}</h5>
              <p>{item.description}</p>
            </div>
          );
        })}
    </div>
  );
}
