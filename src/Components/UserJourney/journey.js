export default function UserJourney({ user }) {
  const { journey } = user;
  return (
    journey && (
      <div>
        {journey.map((item) => {
          return (
            <div>
              <h4>{item.jobTitle}</h4>
              <h5>{item.employer}</h5>
              <h5>{item.startDate}</h5>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    )
  );
}
