// React
import { useState } from "react";

//Components
import UserInfo from "../../Components/UserInfo/userinfo";
import UserSkills from "../../Components/UserSkills/userskills";
import UserIntro from "../../Components/UserIntro/userintro";
import UserJourney from "../../Components/UserJourney/journey";
import { useUserContext } from "../../Context/userContext";
import EditProfile from "../../Components/EditProfile/editProfile";

//styling
import style from "./profile.module.css";

export default function ProfilePage() {
  const [user] = useUserContext();
  const [edit, setEdit] = useState(false);

  function handleClick() {
    setEdit(!edit);
  }

  if (edit) {
    return (
      <div>
        <button onClick={handleClick}>
          {edit ? "Cancel" : "Edit Profile"}
        </button>
        <EditProfile setEdit={setEdit} />;
      </div>
    );
  }

  return (
    user && (
      <div>
        <button onClick={handleClick}>
          {edit ? "Cancel" : "Edit Profile"}
        </button>
        <UserInfo user={user} />
        <UserSkills user={user} />
        <UserIntro user={user} />
        <UserJourney user={user} />
      </div>
    )
  );
}
