//styling
import style from "./userIntro.module.css";
import cn from "classnames";

import UserImage from "../../Components/userImage/userImage";

export default function UserIntro({ user }) {
  const { name, introduction } = user;
  return (
    <div>
      <div name="intro" className={cn(style.container)}>
        <p className={cn(style.labelHeader)}>10 Second Intro...</p>
        <div className={cn("flex")}>
          <div className={cn(style.introImageContainer)}>
            <UserImage width={"125px"} user={user} alt={`${name} profile`} />
          </div>
          <div className={cn(style.introContainer)}>
            <p className={cn(style.introText)}>{introduction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
