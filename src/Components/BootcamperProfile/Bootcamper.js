//Components
import UserInfo from "../UserInfo/userinfo";
import UserSkills from "../UserSkills/userskills";
import UserIntro from "../UserIntro/userintro";
import UserJourney from "../UserJourney/journey";

import { useUserContext } from "../../Context/userContext";

import { useState, useEffect } from "react";

import { Redirect, useParams } from "react-router-dom";

export default function BootcamperProfilePage() {
  const [journey, setJourney] = useState();
  const [userData, setUserData] = useState();
  const [bootcamper, setBootcamper] = useState();

  const { id } = useParams();

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

  useEffect(() => {
    async function getUserJourney() {
      if (userData) {
        let res = await fetch(
          `https://falcon5ives.herokuapp.com/journeys/?id=${id}`
        );
        let data = await res.json();
        setJourney(data.payload);
      }
    }
    getUserJourney();
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const newUser = {
        uid: userData.id,
        username: `${userData.name} ${userData.surname}`,
        email: userData.email,
        profileImage: userData.profileimage,
        admin: userData.admin,
        cohort: userData.cohort,
        currentRole: userData.currentrole,
        currentEmployer: userData.currentemployer,
        skills: userData.skills,
        social: userData.social,
        introduction: userData.introduction,
        journey: journey ? journey : null,
      };
      setBootcamper(newUser);
    }
  }, [userData && journey]);

  return (
    <div>
      {bootcamper && (
        <div>
          <UserInfo user={bootcamper} />
          <UserSkills user={bootcamper} />
          <UserIntro user={bootcamper} />
          <UserJourney user={bootcamper} />
        </div>
      )}
    </div>
  );
}
