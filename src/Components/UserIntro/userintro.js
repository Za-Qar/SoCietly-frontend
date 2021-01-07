//styling
import style from "./userIntro.module.css";
import UserImage from "../../Components/userImage/userImage";

export default function UserIntro({ user }) {
  const { name, introduction, profileImage } = user;
  return (
    <div>
      <h3>10 Second Intro</h3>
      <UserImage width={"150px"} user={user} alt={`${name} profile`} />

      <p>{introduction}</p>
    </div>
  );
}
