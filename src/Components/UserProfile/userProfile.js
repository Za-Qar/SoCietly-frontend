// React
import { useState } from "react";

//Components
import UserInfo from "../UserInfo/userinfo";
import UserSkills from "../UserSkills/userskills";
import UserIntro from "../UserIntro/userintro";
import UserJourney from "../UserJourney/journey";
import { useUserContext } from "../../Context/userContext";
import EditProfile from "../EditProfile/editProfile";
import AddNewJourney from "../CreateJourney/addNewJourney";

//Style
import style from "./profile.module.css";
import cn from "classnames";

export default function UserProfilePage() {
  const [user, setUser] = useUserContext();
  const [edit, setEdit] = useState(false);
  const [addJourney, setAddJourney] = useState(false);

  function handleJourneyClick() {
    setAddJourney(!addJourney);
  }

  function handleEditClick() {
    setEdit(!edit);
  }

  if (edit) {
    return (
      <div>
        <button onClick={handleEditClick}>
          {edit ? "Cancel" : "Edit Profile"}
        </button>
        <EditProfile setEdit={setEdit} />;
      </div>
    );
  }

  return (
    user && (
      <div className={cn(style.row)}>
        {/* ---column left--- */}
        <div className={cn(style.column, style.left)}>
          <UserInfo user={user} />
          <UserSkills user={user} />
        </div>
        {/* ---column right--- */}
        <div className={cn(style.column, style.right)}>
          <div className={style.buttonRight}>
            <button onClick={handleEditClick} className="button">
              {edit ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          <UserIntro user={user} />
          <div className={style.buttonRight}>
            <button onClick={handleJourneyClick} className="button">
              {addJourney ? "Cancel" : "Update My Journey"}
            </button>
          </div>
          {addJourney && (
            <div>
              <AddNewJourney
                setAddJourney={setAddJourney}
                addJourney={addJourney}
              />
            </div>
          )}
          <UserJourney showJourneyEdit={true} user={user} setUser={setUser} />
        </div>
      </div>
    )
  );
}
