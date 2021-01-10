import React from "react";
import style from "./userLeftSide.module.css";

// Components
import UserImage from "../../Components/userImage/userImage.js";
import UserInfo from "../../Components/UserInfo/userinfo.js";

//Context
import { useUserContext } from "../../Context/userContext";

export default function UserLeftSide() {
  const [user, setUser] = useUserContext();
  return (
    <section className={style.userSec}>
      <div className={style.column2}>
        <UserImage user={user} width={"100px"} />
        <UserInfo user={user} homepageEdit />
      </div>
    </section>
  );
}
