// React
import { useState } from "react";

//Components
import UserInfo from "../../Components/UserInfo/userinfo";
import UserSkills from "../../Components/UserSkills/userskills";
import UserIntro from "../../Components/UserIntro/userintro";
import UserJourney from "../../Components/UserJourney/journey";
import { useUserContext } from "../../Context/userContext";
import EditProfile from "../../Components/EditProfile/editProfile";
import AddNewJourney from "../../Components/CreateJourney/addNewJourney";

//styling
import style from "./profile.module.css";

export default function ProfilePage() {
  const [user] = useUserContext();
  const [edit, setEdit] = useState(false);
  const [addJourney, setAddJourney] = useState(false);

  function handleJourneyClick() {
    setAddJourney(!addJourney);
  }

  function handleEditClick() {
    setEdit(!edit);
  }

  // if (addJourney) {
  //   return (
  //     <div>
  //       <button onClick={handleJourneyClick}>
  //         {addJourney ? "Cancel" : "Add New Journey"}
  //       </button>
  //       <AddNewJourney setAddJourney={setAddJourney} />
  //     </div>
  //   );
  // }

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
        <UserJourney />
      </div>
    )
  );
}
