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
      <div>
        <button onClick={handleEditClick}>
          {edit ? "Cancel" : "Edit Profile"}
        </button>
        <UserInfo user={user} />
        <UserSkills user={user} />
        <UserIntro user={user} />
        <button onClick={handleJourneyClick}>
          {addJourney ? "Cancel" : "Update My Journey"}
        </button>
        {addJourney && (
          <div>
            <AddNewJourney setAddJourney={setAddJourney} />
          </div>
        )}
        <UserJourney showJourneyEdit={true} user={user} setUser={setUser} />
      </div>
    )
  );
}
