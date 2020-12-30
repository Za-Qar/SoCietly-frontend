export default function UserImage({ user }) {
  const { profileImage, name } = user;
  return (
    <div>
      <img src={profileImage} alt={`${name} profile`} />
    </div>
  );
}
