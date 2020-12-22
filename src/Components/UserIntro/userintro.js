export default function UserIntro({ user }) {
  const { name, introduction, profileImage } = user;
  return (
    <div>
      <h3>10 Second Intro</h3>
      <img src={profileImage} alt={`${name} profile`} />
      <p>{introduction}</p>
    </div>
  );
}
