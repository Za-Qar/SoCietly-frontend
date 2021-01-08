// React
import { useState, useEffect } from "react";

import { Redirect, useParams } from "react-router-dom";

// Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./profile.module.css";

import BootCamperProfile from "../../Components/BootcamperProfile/Bootcamper";
import UserProfilePage from "../../Components/UserProfile/userProfile";

export default function ProfilePage() {
  const [user] = useUserContext();
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState();
  const [addJourney, setAddJourney] = useState(false);

  const { id } = useParams();

  console.log(userData);
  console.log(user);

  useEffect(() => {
    async function getUser() {
      if (id) {
        let res = await fetch(
          `https://falcon5ives.herokuapp.com/users/?id=${id}`
        );
        let data = await res.json();
        const user = data.payload[0];
        // console.log(fetchData);

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
