//styling
import style from "./userIntro.module.css";
import cn from "classnames";

import UserImage from "../../Components/userImage/userImage";

export default function UserIntro({ user }) {
  const { name, introduction, profileImage } = user;
  return (
    <div>
      <label for="intro" className={cn(style.labelHeader)}>
        10 Second Intro...
      </label>
      <div name="intro" className={cn(style.container)}>
        <UserImage width={"150px"} user={user} alt={`${name} profile`} />

        <p>{introduction}</p>
      </div>
    </div>
  );
}
