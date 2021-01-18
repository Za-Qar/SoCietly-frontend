// React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Config
import { url } from "../../config";

// Context
import { useUserContext } from "../../Context/userContext";

import BootCamperProfile from "../../Components/BootcamperProfile/Bootcamper";
import UserProfilePage from "../../Components/UserProfile/userProfile";

export default function ProfilePage() {
  const [user] = useUserContext();
  //const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState();
  //const [addJourney, setAddJourney] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getUser() {
      if (id) {
        let res = await fetch(`${url}/users/?id=${id}`);
        let data = await res.json();
        const user = data.payload[0];

        setUserData(user);
      }
    }
    getUser();
  }, [id]);

  return userData && user && userData.id === user.uid ? (
    <UserProfilePage />
  ) : (
    <BootCamperProfile />
  );
}
