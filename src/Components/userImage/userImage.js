//styling
import style from "./userImage.module.css";

export default function UserImage({ user }) {
  const { profileImage, name } = user;
  return (
    <img src={profileImage} alt={`${name} profile`} className={style.profImg} />
  );
}
